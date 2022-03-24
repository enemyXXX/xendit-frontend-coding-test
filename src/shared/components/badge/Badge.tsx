import { Badge } from '@mui/material';
import React from 'react';
import { OverridableStringUnion } from '@mui/types';
import { BadgePropsColorOverrides } from '@mui/material/Badge/Badge';
import styles from './Badge.module.css';
import { BadgeOrigin } from '@mui/base/BadgeUnstyled/BadgeUnstyledProps';

interface BadgeProps {
  color?: OverridableStringUnion<
    'primary' | 'secondary' | 'default' | 'error' | 'info' | 'success' | 'warning',
    BadgePropsColorOverrides
  >;
  children?: React.ReactNode;
  content?: React.ReactNode;
  anchor?: BadgeOrigin;
}

const BadgeItem: React.FC<BadgeProps> = ({ children, anchor, color = 'primary', content }) => {
  return (
    <Badge
      className={styles.root}
      classes={{
        colorPrimary: styles.primary,
        colorSecondary: styles.secondary,
        colorError: styles.error,
        standard: styles.badge,
        dot: styles.dot,
      }}
      badgeContent={content}
      color={color}
      variant={content ? 'standard' : 'dot'}
      anchorOrigin={anchor}
    >
      {children}
    </Badge>
  );
};

export default BadgeItem;
