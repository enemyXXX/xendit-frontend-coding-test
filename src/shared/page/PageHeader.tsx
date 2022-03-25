import React from 'react';
import styles from './PageHeader.module.css';
import { Typography } from '@mui/material';

interface PageHeaderProps {
  title: string;
  actions?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, actions }) => {
  return (
    <div className={styles.root}>
      <Typography className={styles.title} variant={'h4'}>
        {title}
      </Typography>
      {actions}
    </div>
  );
};

export default PageHeader;
