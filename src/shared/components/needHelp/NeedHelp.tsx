import React from 'react';
import ButtonItem from '../button/Button';
import styles from './NeedHelp.module.css';

const NeedHelp: React.FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.infoWrapper}>
        <span className={styles.title}>Need help?</span>
        <span className={styles.description}>Check our docs</span>
      </div>

      <ButtonItem variant={'contained'} size={'medium'} color={'secondary'}>
        Documentation
      </ButtonItem>
    </div>
  );
};

export default NeedHelp;
