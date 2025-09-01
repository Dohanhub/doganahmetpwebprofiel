import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Enhanced React Query Devtools component
export function EnhancedReactQueryDevtools() {
  return (
    <ReactQueryDevtools
      initialIsOpen={false}
      position="bottom"
      buttonPosition="bottom-right"
    />
  );
}
