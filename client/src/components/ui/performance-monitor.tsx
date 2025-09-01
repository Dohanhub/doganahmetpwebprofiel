import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePerformanceMonitor } from "@/hooks/use-performance";
import { Activity, Zap, Cpu, Wifi } from "lucide-react";

interface PerformanceMonitorProps {
  show?: boolean;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}

export function PerformanceMonitor({ 
  show = process.env.NODE_ENV === 'development',
  position = "bottom-right" 
}: PerformanceMonitorProps) {
  const metrics = usePerformanceMonitor();
  const [isVisible] = useState(show);
  const [isExpanded, setIsExpanded] = useState(false);

  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4"
  };

  const getPerformanceColor = (value: number, thresholds: { good: number; warning: number }) => {
    if (value <= thresholds.good) return "text-green-500";
    if (value <= thresholds.warning) return "text-yellow-500";
    return "text-red-500";
  };

  const getPerformanceStatus = (fps: number) => {
    if (fps >= 55) return "Excellent";
    if (fps >= 45) return "Good";
    if (fps >= 30) return "Fair";
    return "Poor";
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed ${positionClasses[position]} z-50`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4" />
                <span className="text-sm font-medium">Performance Monitor</span>
              </div>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ▼
                </motion.div>
              </button>
            </div>

            {/* Metrics */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-3 space-y-3"
                >
                  {/* FPS */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">FPS</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-mono ${getPerformanceColor(metrics.fps, { good: 55, warning: 45 })}`}>
                        {metrics.fps}
                      </span>
                      <span className="text-xs text-gray-500">
                        {getPerformanceStatus(metrics.fps)}
                      </span>
                    </div>
                  </div>

                  {/* Memory */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Cpu className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">Memory</span>
                    </div>
                    <span className={`text-sm font-mono ${getPerformanceColor(metrics.memory, { good: 50, warning: 100 })}`}>
                      {metrics.memory}MB
                    </span>
                  </div>

                  {/* Load Time */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Wifi className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">Load Time</span>
                    </div>
                    <span className={`text-sm font-mono ${getPerformanceColor(metrics.loadTime, { good: 1000, warning: 2000 })}`}>
                      {metrics.loadTime}ms
                    </span>
                  </div>

                  {/* Performance Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Performance</span>
                      <span>{Math.round((metrics.fps / 60) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((metrics.fps / 60) * 100, 100)}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>

                  {/* Data Flow Indicator */}
                  <div className="relative h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Collapsed View */}
            {!isExpanded && (
              <div className="p-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">FPS</span>
                  <span className={`text-xs font-mono ${getPerformanceColor(metrics.fps, { good: 55, warning: 45 })}`}>
                    {metrics.fps}
                  </span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function DataFlowIndicator() {
  return (
    <div className="fixed bottom-4 left-4 z-40">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs text-gray-600 dark:text-gray-300">Data Flow Active</span>
        </div>
        <div className="mt-2 w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-green-500 to-blue-500"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
    </div>
  );
}
