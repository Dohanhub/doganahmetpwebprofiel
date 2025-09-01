import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  stagger?: number;
  whileHover?: boolean;
  whileTap?: boolean;
  layout?: boolean;
  exit?: boolean;
}

const variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const directionVariants = {
  up: { hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1 } },
  down: { hidden: { y: -30, opacity: 0 }, visible: { y: 0, opacity: 1 } },
  left: { hidden: { x: 30, opacity: 0 }, visible: { x: 0, opacity: 1 } },
  right: { hidden: { x: -30, opacity: 0 }, visible: { x: 0, opacity: 1 } },
  none: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
};

// hoverVariants is defined but not used - keeping for future use
// const hoverVariants = {
//   hover: {
//     y: -8,
//     scale: 1.02,
//     transition: {
//       duration: 0.3,
//       ease: [0.4, 0, 0.2, 1],
//     },
//   },
//   tap: {
//     scale: 0.98,
//     transition: {
//       duration: 0.1,
//     },
//   },
// };

export function AnimatedContainer({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  direction = "up",
  stagger = 0.1,
  whileHover = false,
  whileTap = false,
  layout = false,
  exit = false,
}: AnimatedContainerProps) {
  const customVariants = {
    ...variants,
    visible: {
      ...variants.visible,
      ...directionVariants[direction].visible,
      transition: {
        ...variants.visible.transition,
        delay,
        duration,
        staggerChildren: stagger,
      },
    },
    hidden: {
      ...variants.hidden,
      ...directionVariants[direction].hidden,
    },
  };

  const MotionComponent = exit ? motion.div : motion.div;

  return (
    <AnimatePresence mode="wait">
      <MotionComponent
        className={className}
        initial="hidden"
        animate="visible"
        exit={exit ? "exit" : undefined}
        variants={customVariants}
        whileHover={whileHover ? "hover" : undefined}
        whileTap={whileTap ? "tap" : undefined}
        layout={layout}
        transition={{
          duration,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        {children}
      </MotionComponent>
    </AnimatePresence>
  );
}

export function StaggeredContainer({
  children,
  className = "",
  staggerDelay = 0.1,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  direction?: "up" | "down" | "left" | "right";
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: directionVariants[direction].hidden,
              visible: {
                ...directionVariants[direction].visible,
                transition: {
                  duration: 0.6,
                  ease: [0.4, 0, 0.2, 1],
                },
              },
            }}
          >
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div
          variants={{
            hidden: directionVariants[direction].hidden,
            visible: {
              ...directionVariants[direction].visible,
              transition: {
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1],
              },
            },
          }}
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  );
}
