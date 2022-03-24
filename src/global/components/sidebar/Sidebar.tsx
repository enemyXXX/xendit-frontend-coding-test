import React from 'react';
import { Drawer } from '@mui/material';
import styles from './Sidebar.module.css';
import Logo from '../../../shared/assets/Logo';

interface SideBarProps {}

const Sidebar: React.FC<SideBarProps> = ({}) => {
  return (
    <Drawer
      classes={{
        root: styles.wrapper,
        paper: styles.root,
      }}
      variant="permanent"
      anchor="left"
    >
      <div className={styles.logoContainer}>
        <Logo />
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.menuContainer}>123</div>
        <div className={styles.needHelpContainer}>456</div>
      </div>
    </Drawer>
  );
};

export default Sidebar;
