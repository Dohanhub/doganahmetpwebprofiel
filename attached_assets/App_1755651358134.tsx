import React from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorBoundary } from "@/components/error-boundary";
import { ThemeProvider } from "@/components/ThemeProvider";
import { EliteToaster } from "@/components/elite-toaster";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import "./index.css";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <TooltipProvider>
            <div className="relative min-h-screen">
              {/* Elite Background Layer */}
              <div className="fixed inset-0 executive-gradient" />

              {/* Elite Ambient Effects */}
              <div className="fixed inset-0 pointer-events-none">
                {/* Animated background gradients */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[var(--executive-gold)]/10 to-transparent rounded-full blur-3xl animate-float" />
                <div
                  className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[var(--executive-platinum)]/10 to-transparent rounded-full blur-3xl animate-float"
                  style={{ animationDelay: "2s" }}
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[var(--executive-diamond)]/5 to-transparent rounded-full blur-3xl animate-pulse" />
              </div>

              {/* Main Application Content */}
              <div className="relative z-10">
                <Router />
              </div>

              {/* Elite Notification Systems */}
              <Toaster />
              <EliteToaster />

              {/* Elite Performance Overlay */}
              <div className="fixed bottom-4 right-4 z-[9998] pointer-events-none">
                <div className="glass-morphism px-3 py-2 rounded-lg">
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-[var(--executive-platinum)]">
                      Elite Experience Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
