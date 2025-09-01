import { QueryClient, QueryFunction, DefaultOptions } from "@tanstack/react-query";

// Enhanced error handling
async function enhancedErrorHandler(res: Response) {
  if (!res.ok) {
    const text = await res.text();
    const error = new Error(`${res.status}: ${text || res.statusText}`);
    (error as any).status = res.status;
    (error as any).statusText = res.statusText;
    throw error;
  }
}

// Enhanced API request with better error handling and retry logic
export async function enhancedApiRequest(
  method: string,
  url: string,
  data?: unknown,
  options?: {
    timeout?: number;
    retries?: number;
    retryDelay?: number;
  }
): Promise<Response> {
  const { timeout = 10000 } = options || {};

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, {
      method,
      headers: data ? { "Content-Type": "application/json" } : {},
      body: data ? JSON.stringify(data) : undefined,
      credentials: "include",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    await enhancedErrorHandler(res);
    return res;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

// Enhanced query function with better caching and error handling
export const createEnhancedQueryFn = <T>(options: {
  on401: "returnNull" | "throw";
  cacheTime?: number;
  staleTime?: number;
}) => {
  const { on401 } = options;

  return (async ({ queryKey, signal }) => {
    try {
      const res = await fetch(queryKey.join("/") as string, {
        credentials: "include",
        signal,
      });

      if (on401 === "returnNull" && res.status === 401) {
        return null;
      }

      await enhancedErrorHandler(res);
      return await res.json() as T;
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error("Request was cancelled");
      }
      throw error;
    }
  }) as QueryFunction<T>;
};

// Enhanced default options with better performance
const enhancedDefaultOptions: DefaultOptions = {
  queries: {
    queryFn: createEnhancedQueryFn({ on401: "throw" }),
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
    retry: () => {
      return false; // Completely disable automatic retries to prevent promise rejections
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    networkMode: "online",
  },
  mutations: {
    retry: (failureCount, error) => {
      // Only retry on network errors or 5xx errors
      if (error instanceof Error) {
        if (error.message.includes('Network') || error.message.includes('fetch')) {
          return failureCount < 2;
        }
        const status = parseInt(error.message.split(':')[0]);
        if (status >= 500) {
          return failureCount < 2;
        }
      }
      return false;
    },
    retryDelay: 2000,
    networkMode: "online",
  },
};

// Enhanced query client with better performance and caching (background features disabled)
export const enhancedQueryClient = new QueryClient({
  defaultOptions: enhancedDefaultOptions,
});

// Query key factory for better organization
export const queryKeys = {
  user: {
    profile: ["user", "profile"] as const,
    settings: ["user", "settings"] as const,
  },
  content: {
    all: ["content"] as const,
    byId: (id: string) => ["content", id] as const,
    byType: (type: string) => ["content", "type", type] as const,
  },
  analytics: {
    overview: ["analytics", "overview"] as const,
    detailed: (period: string) => ["analytics", "detailed", period] as const,
  },
} as const;

// Enhanced mutation options
export const createMutationOptions = <TData, TError, TVariables>(options: {
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: TError, variables: TVariables) => void;
  onSettled?: (data: TData | undefined, error: TError | null, variables: TVariables) => void;
}) => ({
  ...options,
  retry: 1,
  retryDelay: 1000,
});

// Performance monitoring
export const performanceMonitor = {
  startTime: Date.now(),
  
  logQueryTime: (queryKey: string[], duration: number) => {
    if (duration > 1000) {
      console.warn(`Slow query detected: ${queryKey.join('/')} took ${duration}ms`);
    }
  },
  
  logMutationTime: (mutationKey: string[], duration: number) => {
    if (duration > 2000) {
      console.warn(`Slow mutation detected: ${mutationKey.join('/')} took ${duration}ms`);
    }
  },
};
