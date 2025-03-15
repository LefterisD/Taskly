import { forwardRef, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimateXProps {
  children: ReactNode;
}

const AnimateX = forwardRef<HTMLDivElement, AnimateXProps>(
  ({ children }, ref) => {
    return (
      <motion.div
        ref={ref}
        key="actions"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.1 }}
      >
        {children}
      </motion.div>
    );
  }
);

export default AnimateX;
