import React from 'react';
import styles from './Button.module.css';
import { OverridableStringUnion } from '@mui/types';
import {
  ButtonPropsColorOverrides,
  ButtonPropsSizeOverrides,
  ButtonPropsVariantOverrides,
} from '@mui/material/Button/Button';
import { Button } from '@mui/material';
import { Position } from '../../types/position';
import { POSITION } from '../../enums/global';
import classNames from 'classnames';

interface ButtonProps {
  variant?: OverridableStringUnion<'text' | 'outlined' | 'contained', ButtonPropsVariantOverrides>;
  color?: OverridableStringUnion<
    'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
    ButtonPropsColorOverrides
  >;
  size?: OverridableStringUnion<'small' | 'medium' | 'large', ButtonPropsSizeOverrides>;
  disabled?: boolean;
  handleClick?: (e) => void;
  icon?: React.ReactNode;
  iconPosition?: Position;
  children?: React.ReactNode;
  fullWidth?: boolean;
  stylesWrapper?: string;
}

const ButtonItem: React.FC<ButtonProps> = ({
  icon,
  iconPosition,
  variant = 'contained',
  size = 'medium',
  disabled,
  color = 'primary',
  children,
  handleClick,
  fullWidth,
  stylesWrapper,
}) => {
  return (
    <Button
      fullWidth={fullWidth}
      classes={{
        containedPrimary: styles.containedPrimary,
        containedSecondary: styles.containedSecondary,
        outlinedPrimary: styles.outlinedPrimary,
        outlinedSecondary: styles.outlinedSecondary,
        textPrimary: styles.textPrimary,
        textSecondary: styles.textSecondary,
        sizeLarge: styles.large,
        sizeMedium: styles.medium,
        sizeSmall: styles.small,
      }}
      onClick={handleClick}
      className={classNames(styles.root, stylesWrapper)}
      color={color}
      variant={variant}
      size={size}
      startIcon={iconPosition !== POSITION.RIGHT && icon}
      endIcon={iconPosition === POSITION.RIGHT && icon}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default ButtonItem;
