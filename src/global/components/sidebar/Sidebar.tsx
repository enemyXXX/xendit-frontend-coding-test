import React from 'react';
import { Drawer } from '@mui/material';
import styles from './Sidebar.module.css';
import Logo from '../../../shared/assets/Logo';
import NeedHelp from '../../../shared/components/needHelp/NeedHelp';
import Menu from '../menu/Menu';

const Sidebar: React.FC = () => {
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
        <Menu />
        <NeedHelp />
      </div>
    </Drawer>
  );
};

export default Sidebar;
