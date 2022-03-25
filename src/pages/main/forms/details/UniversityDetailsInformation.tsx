import { UniversityModel } from '../../../../shared/models/universityModel';
import React from 'react';
import { FormTitle, FormStaticInfoRow } from '../../../../shared/components/form/Form';
import styles from './UniversityDetailsInformation.module.css';
import moment from 'moment';

interface UniversityDetailsInformation {
  university: UniversityModel;
}

const UniversityDetailsInformation: React.FC<UniversityDetailsInformation> = ({ university }) => {
  return (
    <div className={styles.root}>
      <FormTitle title={'Details'} />
      <div className={styles.information}>
        <FormStaticInfoRow label={'ID'} value={university.id} />
        <FormStaticInfoRow label={'Name'} value={university.name} />
        <FormStaticInfoRow label={'Country'} value={university.country} />
        <FormStaticInfoRow label={'Web Pages'} value={university.web_pages.join(', ')} />
        <FormStaticInfoRow label={'Domain'} value={university.domains.join(', ')} />
        <FormStaticInfoRow label={'Created'} value={moment(university.created_at).format('LLL')} />
        <FormStaticInfoRow label={'Updated'} value={moment(university.updated_at).fromNow()} />
      </div>
    </div>
  );
};

export default UniversityDetailsInformation;
