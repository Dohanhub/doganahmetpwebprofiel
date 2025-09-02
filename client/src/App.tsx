import React from "react";
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { SmoothPageTransition } from "@/components/ui/page-transition";
import { enhancedQueryClient } from "./lib/enhanced-queryClient";
// Temporarily disabled to prevent background requests
// import { EnhancedReactQueryDevtools } from "./lib/react-query-devtools";
// import { PerformanceMonitor, DataFlowIndicator } from "@/components/ui/performance-monitor";
import { ErrorBoundary } from "@/components/error-boundary";
import ChatAgent from "@/components/chat-agent";

// Hide Vercel toolbar for production visitors
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  const hideVercelToolbar = () => {
    const vercelToolbar = document.querySelector('[data-vercel-toolbar]');
    if (vercelToolbar instanceof HTMLElement) {
      vercelToolbar.style.display = 'none';
    }
    
    // Also hide any elements with vercel-related classes
    const vercelElements = document.querySelectorAll('[class*="vercel"], [class*="Vercel"]');
    vercelElements.forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.display = 'none';
      }
    });
  };
  
  // Run immediately and also on DOM changes
  hideVercelToolbar();
  const observer = new MutationObserver(hideVercelToolbar);
  observer.observe(document.body, { childList: true, subtree: true });
}
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import About from "@/pages/about";
import Experience from "@/pages/experience";
import Organizations from "@/pages/organizations";
import Certifications from "@/pages/certifications";
import Contact from "@/pages/contact";

function AppRouter() {
  return (
    <SmoothPageTransition>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/experience" component={Experience} />
        <Route path="/certifications" component={Certifications} />
        <Route path="/organizations" component={Organizations} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </SmoothPageTransition>
  );
}

function App() {
  // Enhanced error handling to completely suppress all promise rejections
  React.useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      // Completely prevent all unhandled rejections to stop console spam
      event.preventDefault();
      event.stopImmediatePropagation();
      return false;
    };

    const handleError = (event: ErrorEvent) => {
      // Prevent error events that might cause issues
      if (event.error?.name === 'AbortError' || event.message?.includes('fetch')) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return false;
      }
    };

    // Override console methods to filter out Vite-related promise rejection messages
    const originalError = console.error;
    console.error = (...args: any[]) => {
      const message = args.join(' ');
      if (message.includes('Unhandled promise rejection') || 
          message.includes('vite') || 
          message.includes('AbortError')) {
        return; // Suppress these specific error messages
      }
      originalError.apply(console, args);
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleError);
      console.error = originalError; // Restore original console.error
    };
  }, []);

  return (
    <ErrorBoundary 
      retryCount={3} 
      retryDelay={2000}
      onError={(error, errorInfo) => {
        console.error('App Error:', error, errorInfo);
        // In production, you'd send this to your error monitoring service
      }}
    >
      <ThemeProvider defaultTheme="light" storageKey="dogan-theme" defaultBrand="modern">
        <QueryClientProvider client={enhancedQueryClient}>
          <TooltipProvider>
            <div className="min-h-screen bg-background text-foreground transition-all duration-300 ease-in-out">
              <Toaster />
              <AppRouter />
              <ChatAgent />
            </div>
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

