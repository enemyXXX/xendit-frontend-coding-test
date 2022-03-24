import React from 'react';
import styles from './MenuChapter.module.css';

interface MenuChapterProps {
  title: string;
  children: React.ReactNode;
}

const MenuChapter: React.FC<MenuChapterProps> = ({ title, children }) => {
  return (
    <div className={styles.root}>
      <span className={styles.title}>{title}</span>
      <div className={styles.itemsWrapper}>{children}</div>
    </div>
  );
};

export default MenuChapter;
