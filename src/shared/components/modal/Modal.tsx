import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from './Modal.module.css';

interface CustomModalProps {
  title: string;
  handleClose: () => void;
  content?: React.ReactNode;
  actions?: React.ReactNode;
  revert?: boolean;
}

export interface ModalTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const ModalTitle = (props: ModalTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle className={styles.title} sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: 'white',
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export const ModalActions: React.FC = ({ children }) => (
  <DialogActions className={styles.actions}>
    Actions
    <div className={styles.actionButtons}>{children}</div>
  </DialogActions>
);

const CustomModal: React.FC<CustomModalProps> = ({ content, revert, title, handleClose, actions }) => {
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(4, 3),
      display: 'flex',
      flexDirection: revert ? 'column-reverse' : 'column',
      gap: '1rem',
    },
    '& .MuiDialogActions-root': {
      justifyContent: 'space-between',
      padding: theme.spacing(1.5, 2, 1.5, 2),
    },
    '& .MuiDialog-paper': {
      borderRadius: 0,
      width: 600,
    },
    '& .MuiDialogTitle-root': {
      padding: theme.spacing(3, 3, 3, 3),
    },
  }));

  return (
    <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={true}>
      <ModalTitle id="dialog-title" onClose={handleClose}>
        {title}
      </ModalTitle>
      <DialogContent className={styles.contentContainer}>
        {content}
        {actions}
      </DialogContent>
    </BootstrapDialog>
  );
};

export default CustomModal;
