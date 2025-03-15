import { forwardRef, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimateXProps {
  children: ReactNode;
}

const AnimateYBottom = forwardRef<HTMLDivElement, AnimateXProps>(
  ({ children }, ref) => {
    return (
      <motion.div
        ref={ref}
        key="actions"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    );
  }
);

export default AnimateYBottom;
