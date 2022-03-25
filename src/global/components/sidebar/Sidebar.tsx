import React from 'react';
import { Drawer } from '@mui/material';
import styles from './Sidebar.module.css';
import Logo from '../../../shared/assets/Logo';
import NeedHelp from '../../../shared/components/needHelp/NeedHelp';
import Menu from '../menu/Menu';
import { SIDE_NAVBAR_WIDTH } from '../../constants/content';

const Sidebar: React.FC = () => {
  return (
    <Drawer
      classes={{
        root: styles.wrapper,
        paper: styles.root,
      }}
      sx={{
        width: SIDE_NAVBAR_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: SIDE_NAVBAR_WIDTH,
          boxSizing: 'border-box',
        },
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
