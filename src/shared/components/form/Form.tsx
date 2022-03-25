import React from 'react';
import { Typography } from '@mui/material';
import styles from './Form.module.css';

interface FormTitleProps {
  title: string;
}

export const FormTitle: React.FC<FormTitleProps> = ({ title }) => {
  return <Typography variant={'h6'}>{title}</Typography>;
};

interface FormStaticInfoRowProps {
  label: string;
  value: string | number;
}

export const FormStaticInfoRow: React.FC<FormStaticInfoRowProps> = ({ label, value }) => {
  return (
    <div className={styles.infoRow}>
      <span className={styles.rowLabel}>{label}</span>
      <span className={styles.rowValue}>{value}</span>
    </div>
  );
};
