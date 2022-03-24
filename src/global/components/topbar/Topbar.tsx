import React from 'react';
import { AppBar, IconButton } from '@mui/material';
import styles from './Topbar.module.css';
import AvatarItem from '../../../shared/components/avatar/AvatarItem';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SearchIcon from '@mui/icons-material/Search';
import BadgeItem from '../../../shared/components/badge/Badge';

interface TopBarProps {}

const TopBar: React.FC<TopBarProps> = ({}) => {
  return (
    <AppBar
      classes={{
        root: styles.root,
      }}
      className={styles.wrapper}
      position={'fixed'}
    >
      <IconButton color="default" aria-label="search">
        <SearchIcon />
      </IconButton>
      <IconButton color="default" aria-label="users">
        <PeopleAltIcon />
      </IconButton>
      <BadgeItem color={'primary'} content={10}>
        <IconButton color="default" aria-label="notifications">
          <NotificationsIcon />
        </IconButton>
      </BadgeItem>
      <IconButton color="default" aria-label="settings">
        <SettingsIcon />
      </IconButton>
      <AvatarItem variant={'circular'} />
    </AppBar>
  );
};

export default TopBar;
