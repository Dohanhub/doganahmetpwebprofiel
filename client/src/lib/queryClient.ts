import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

const API_BASE = (import.meta as any).env?.VITE_API_BASE_URL || '';

function withBase(url: string) {
  if (!url) return url;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  const base = API_BASE?.toString().trim();
  if (!base) return url; // relative in same origin
  if (url.startsWith('/')) return base.replace(/\/$/, '') + url;
  return base.replace(/\/$/, '') + '/' + url;
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(withBase(url), {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(withBase(queryKey.join("/") as string), {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors except 408, 429
        if (error instanceof Error && error.message.includes('4')) {
          const status = parseInt(error.message.split(':')[0]);
          if (status >= 400 && status < 500 && status !== 408 && status !== 429) {
            return false;
          }
        }
        return failureCount < 2;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: (failureCount, error) => {
        // Only retry on network errors or 5xx errors
        if (error instanceof Error) {
          if (error.message.includes('Network') || error.message.includes('fetch')) {
            return failureCount < 1;
          }
          const status = parseInt(error.message.split(':')[0]);
          if (status >= 500) {
            return failureCount < 1;
          }
        }
        return false;
      },
      retryDelay: 2000,
    },
  },
});
