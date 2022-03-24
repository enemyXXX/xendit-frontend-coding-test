import React from 'react';
import { Alert, AlertTitle, IconButton } from '@mui/material';
import { AlertColor } from '@mui/material/Alert/Alert';
import { Close } from '@mui/icons-material';
import styles from './Alert.module.css';
import classNames from 'classnames';

interface AlertProps {
  title: string;
  severity?: AlertColor;
  description?: React.ReactNode | string;
  actionExistence?: boolean;
  handleAction?: () => void;
}

const AlertItem: React.FC<AlertProps> = ({ title, severity, description, actionExistence, handleAction }) => {
  const getSeverityClassname = (severity?: AlertColor) => {
    switch (severity) {
      case 'success':
      default:
        return styles.successAlert;
      case 'error':
        return styles.errorAlert;
      case 'warning':
        return styles.warningAlert;
      case 'info':
        return styles.infoAlert;
    }
  };

  return (
    <Alert
      classes={{
        message: styles.alertMessage,
      }}
      variant={'standard'}
      className={classNames(styles.alert, getSeverityClassname(severity))}
      severity={severity}
      action={
        actionExistence && (
          <div className={styles.actionsContainer}>
            Action
            <IconButton
              onClick={handleAction}
              className={getSeverityClassname(severity)}
              aria-label="upload picture"
              component="span"
            >
              <Close />
            </IconButton>
          </div>
        )
      }
    >
      <AlertTitle className={styles.title}>{title}</AlertTitle>
      {!!description && <div className={styles.alertDescription}>{description}</div>}
    </Alert>
  );
};

export default AlertItem;
