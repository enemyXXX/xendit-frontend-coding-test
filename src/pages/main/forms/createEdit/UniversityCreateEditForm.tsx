import { FormTitle } from '../../../../shared/components/form/Form';
import { UniversityModel } from '../../../../shared/models/universityModel';
import React, { useMemo, useState } from 'react';
import styles from './UniversityCreateEditForm.module.css';
import { ModalActions } from '../../../../shared/components/modal/Modal';
import ButtonItem from '../../../../shared/components/button/Button';
import { Box, TextField } from '@mui/material';
import { useAppDispatch } from '../../../../shared/hooks/useAppDispatch';
import { CountriesList } from '../../../../shared/models/countryModel';
import { useAppSelector } from '../../../../shared/hooks/useAppSelector';
import { getCountriesAsync, getCreateEditCountries } from '../../services/mainSlice';
import { PER_PAGE } from '../../../../global/constants/pagination';
import LazyLoadingSelect from '../../../../shared/components/select/LazyLoadingSelect';

interface UniversityCreateEditFormProps {
  university: UniversityModel;
  handleClose: () => void;
  handleSave: (university: UniversityModel, callback: (success: boolean) => void) => void;
}

const UniversityCreateEditForm: React.FC<UniversityCreateEditFormProps> = ({ university, handleClose, handleSave }) => {
  const [universityItem, setUniversityItem] = useState<UniversityModel>(university);
  const [isActiveUniversityProcess, setIsActiveUniversityProcess] = useState<boolean>(false);
  const isSaveDisable: boolean = useMemo(() => !universityItem.name || !universityItem.country, [universityItem]);

  const handleSaveValidation = () => {
    setIsActiveUniversityProcess(true);
    handleSave(universityItem, (success: boolean) => {
      success && handleClose();
      setIsActiveUniversityProcess(false);
    });
  };

  const dispatch = useAppDispatch();
  const countries: CountriesList = useAppSelector(getCreateEditCountries);

  const handleCountriesLoading = (page: number) => {
    if (page > countries.pagination.current_page) {
      dispatch(
        getCountriesAsync({
          editMode: true,
          page,
          pageSize: PER_PAGE,
        })
      );
    }
  };

  return (
    <>
      <div className={styles.root}>
        <FormTitle title={university.id ? 'Edit' : 'Create new university'} />
        <Box component="form" noValidate autoComplete="off">
          <div className={styles.fields}>
            <TextField
              value={universityItem.name}
              onChange={(e) =>
                setUniversityItem((prev) => ({
                  ...prev,
                  name: e.target.value as string,
                }))
              }
              required
              label="Name"
            />
            <LazyLoadingSelect
              label={'Country *'}
              required
              name={'countries'}
              value={universityItem.country}
              handleLazyLoading={handleCountriesLoading}
              pagination={countries.pagination}
              handleValueSelection={(value) =>
                setUniversityItem({
                  ...universityItem,
                  country: value,
                })
              }
              items={countries.data}
              fieldLabel={'name'}
              fieldValue={'name'}
            />
            <TextField
              value={universityItem.domains.join(',')}
              onChange={(e) =>
                setUniversityItem((prev) => ({
                  ...prev,
                  domains: (e.target.value as string).split(','),
                }))
              }
              label="Domain"
            />
            <TextField
              value={universityItem.web_pages.join(',')}
              onChange={(e) =>
                setUniversityItem((prev) => ({
                  ...prev,
                  web_pages: (e.target.value as string).split(','),
                }))
              }
              label="Web Pages"
            />
          </div>
        </Box>
      </div>
      <ModalActions>
        <ButtonItem
          disabled={isSaveDisable}
          loading={isActiveUniversityProcess}
          handleClick={handleSaveValidation}
          variant={'contained'}
          size={'small'}
          color={'primary'}
        >
          {universityItem.id ? 'Save changes' : 'Create'}
        </ButtonItem>
        <ButtonItem handleClick={handleClose} variant={'outlined'} size={'small'} color={'primary'}>
          Cancel
        </ButtonItem>
      </ModalActions>
    </>
  );
};

export default React.memo(UniversityCreateEditForm);
