import React, { ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import styles from './PageTitle.module.css';

interface PageTitleProps extends HTMLMotionProps<'h1'> {
  title?: string;
  children?: ReactNode;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, children, className = '', ...props }) => {
  return (
    <motion.h1
      className={`${styles.title} ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      {...props}
    >
      {title || children}
    </motion.h1>
  );
};

export default PageTitle;
