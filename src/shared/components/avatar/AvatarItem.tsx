import React, { useMemo } from 'react';
import { Avatar } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';
import { AvatarPropsVariantOverrides } from '@mui/material/Avatar/Avatar';
import styles from './Avatar.module.css';
interface AvatarProps {
  variant?: OverridableStringUnion<'circular' | 'rounded' | 'square', AvatarPropsVariantOverrides>;
  src?: string;
  alt?: string;
  userName?: string;
  size?: number;
}
const AvatarItem: React.FC<AvatarProps> = ({ variant = 'square', src, alt, userName, size }) => {
  const initials = useMemo(() => userName?.split(' ').map((word) => word[0].toUpperCase()), [userName]);
  return (
    <>
      <Avatar
        classes={{
          root: styles.root,
        }}
        src={src}
        sx={{ width: size || 40, height: size || 40 }}
        alt={alt}
        variant={variant}
      >
        {initials}
      </Avatar>
    </>
  );
};

export default AvatarItem;
