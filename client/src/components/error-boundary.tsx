import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  retryCount?: number;
  retryDelay?: number;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  retryAttempts: number;
  isRetrying: boolean;
  lastErrorTime: number;
}

export class ErrorBoundary extends Component<Props, State> {
  private retryTimeout: NodeJS.Timeout | null = null;
  private maxRetries: number;
  private retryDelay: number;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryAttempts: 0,
      isRetrying: false,
      lastErrorTime: 0,
    };
    this.maxRetries = props.retryCount || 3;
    this.retryDelay = props.retryDelay || 2000;
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
      lastErrorTime: Date.now(),
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    
    // Log error for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Report error to monitoring service (if available)
    this.reportError(error, errorInfo);
  }

  private reportError = (error: Error, errorInfo: ErrorInfo) => {
    // In a real application, you would send this to your error monitoring service
    // For now, we'll just log it with additional context
    const errorReport = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      retryAttempts: this.state.retryAttempts,
    };
    
    console.group('Error Report');
    console.error('Error Details:', errorReport);
    console.groupEnd();
  };

  private handleRetry = () => {
    if (this.state.retryAttempts >= this.maxRetries) {
      return;
    }

    this.setState({ isRetrying: true });

    // Clear any existing timeout
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
    }

    // Exponential backoff
    const delay = this.retryDelay * Math.pow(2, this.state.retryAttempts);
    
    this.retryTimeout = setTimeout(() => {
      this.setState(prevState => ({
        hasError: false,
        error: null,
        errorInfo: null,
        retryAttempts: prevState.retryAttempts + 1,
        isRetrying: false,
      }));
    }, delay);
  };

  private handleReset = () => {
    // Clear any existing timeout
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
    }

    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      retryAttempts: 0,
      isRetrying: false,
    });
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  componentWillUnmount() {
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
    }
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const canRetry = this.state.retryAttempts < this.maxRetries;
      // const timeSinceError = Date.now() - this.state.lastErrorTime;

      return (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-4"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center"
            >
              {/* Error Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6"
              >
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </motion.div>

              {/* Error Message */}
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Oops! Something went wrong
              </h2>
              
              <p className="text-gray-600 mb-6">
                {canRetry 
                  ? "We encountered an unexpected error. Don't worry, we can try to fix this automatically."
                  : "We've tried to fix this automatically but couldn't resolve the issue."
                }
              </p>

              {/* Error Details (collapsible) */}
              <details className="mb-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 mb-2">
                  Technical Details
                </summary>
                <div className="bg-gray-50 rounded-lg p-3 text-xs font-mono text-gray-600 max-h-32 overflow-y-auto">
                  <div className="mb-2">
                    <strong>Error:</strong> {this.state.error?.message}
                  </div>
                  {this.state.errorInfo && (
                    <div>
                      <strong>Component Stack:</strong>
                      <pre className="whitespace-pre-wrap mt-1">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>

              {/* Retry Information */}
              {canRetry && (
                <div className="mb-6 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    Retry attempt {this.state.retryAttempts + 1} of {this.maxRetries}
                  </p>
                  {this.state.isRetrying && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="inline-block ml-2"
                    >
                      <RefreshCw className="w-4 h-4 text-blue-600" />
                    </motion.div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                {canRetry && (
                  <Button
                    onClick={this.handleRetry}
                    disabled={this.state.isRetrying}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {this.state.isRetrying ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Retrying...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Try Again
                      </>
                    )}
                  </Button>
                )}

                <Button
                  onClick={this.handleReset}
                  variant="outline"
                  className="w-full"
                >
                  Reset Application
                </Button>

                <Button
                  onClick={this.handleGoHome}
                  variant="ghost"
                  className="w-full"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go to Homepage
                </Button>

                {/* Report Bug Button */}
                <Button
                  onClick={() => {
                    const errorReport = {
                      error: this.state.error?.message,
                      stack: this.state.error?.stack,
                      componentStack: this.state.errorInfo?.componentStack,
                      url: window.location.href,
                      userAgent: navigator.userAgent,
                      timestamp: new Date().toISOString(),
                    };
                    
                    // In a real app, you'd send this to your error reporting service
                    console.log('Error Report:', errorReport);
                    
                    // For now, just show an alert
                    alert('Error report logged to console. In production, this would be sent to our monitoring service.');
                  }}
                  variant="ghost"
                  size="sm"
                  className="w-full text-gray-500 hover:text-gray-700"
                >
                  <Bug className="w-4 h-4 mr-2" />
                  Report Bug
                </Button>
              </div>

              {/* Auto-retry indicator */}
              {canRetry && !this.state.isRetrying && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-4 text-xs text-gray-500"
                >
                  Auto-retry in {Math.ceil((this.retryDelay * Math.pow(2, this.state.retryAttempts)) / 1000)}s
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      );
    }

    return this.props.children;
  }
}

// Hook for functional components to handle errors
export const useErrorHandler = () => {
  const handleError = (error: Error, context?: string) => {
    console.error(`Error in ${context || 'component'}:`, error);
    
    // In a real app, you'd send this to your error monitoring service
    const errorReport = {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
      url: window.location.href,
    };
    
    console.log('Error Report:', errorReport);
  };

  return { handleError };
};

// Higher-order component for error handling
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Partial<Props>
) => {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  return WrappedComponent;
};
