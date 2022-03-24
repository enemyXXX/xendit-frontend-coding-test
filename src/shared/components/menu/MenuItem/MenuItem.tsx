import React from 'react';
import styles from './MenuItem.module.css';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../../enums/routes';
import classNames from 'classnames';

interface MenuItemProps {
  to: ROUTES;
  title: string;
  icon?: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = ({ to, title, icon }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to} className={classNames(styles.root, { [styles.activeItem]: isActive })}>
      {icon}
      {title}
    </Link>
  );
};

export default MenuItem;
