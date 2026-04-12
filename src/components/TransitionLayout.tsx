import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TransitionLayoutProps {
  children: ReactNode;
}

const variants = {
  hidden: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function TransitionLayout({ children }: TransitionLayoutProps) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', flex: 1 }}
    >
      {children}
    </motion.div>
  );
}
