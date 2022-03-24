import React from 'react';
import styles from './Menu.module.css';
import MenuChapter from '../../../shared/components/menu/MenuTopic/MenuChapter';
import MenuItem from '../../../shared/components/menu/MenuItem/MenuItem';
import { PictureInPicture } from '@mui/icons-material';
import { ROUTES } from '../../../shared/enums/routes';

const Menu: React.FC = () => {
  return (
    <div className={styles.root}>
      <MenuChapter title={'GENERAL'}>
        <MenuItem to={ROUTES.HOME} icon={<PictureInPicture />} title={'Main'} />
        <MenuItem to={ROUTES.INSTRUCTION} icon={<PictureInPicture />} title={'Instructions'} />
      </MenuChapter>
      <MenuChapter title={'Another'}>
        <MenuItem to={ROUTES.ANOTHER} icon={<PictureInPicture />} title={'some page'} />
        <MenuItem to={ROUTES.ANOTHER} icon={<PictureInPicture />} title={'another page'} />
      </MenuChapter>
    </div>
  );
};

export default Menu;
