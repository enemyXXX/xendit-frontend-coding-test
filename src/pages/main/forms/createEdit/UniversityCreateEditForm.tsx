import { FormTitle } from '../../../../shared/components/form/Form';
import { UniversityModel } from '../../../../shared/models/universityModel';
import React, { useMemo, useState } from 'react';
import styles from './UniversityCreateEditForm.module.css';
import { ModalActions } from '../../../../shared/components/modal/Modal';
import ButtonItem from '../../../../shared/components/button/Button';
import { Box, TextField } from '@mui/material';
import { useAppDispatch } from '../../../../shared/hooks/useAppDispatch';
import { CountriesList, CountryModel } from '../../../../shared/models/countryModel';
import { useAppSelector } from '../../../../shared/hooks/useAppSelector';
import { getCountriesAsync, getCreateEditCountries } from '../../services/mainSlice';
import { PER_PAGE } from '../../../../global/constants/pagination';
import LazyLoadingSelect from '../../../../shared/components/select/LazyLoadingSelect';
import { GlobalUtils } from '../../../../shared/utils/globalUtils';

interface UniversityCreateEditFormProps {
  university: UniversityModel;
  handleClose: () => void;
  handleSave: (university: UniversityModel, callback: (success: boolean) => void) => void;
}

const UniversityCreateEditForm: React.FC<UniversityCreateEditFormProps> = ({ university, handleClose, handleSave }) => {
  const dispatch = useAppDispatch();
  const [universityItem, setUniversityItem] = useState<UniversityModel>(university);
  const [isActiveUniversityProcess, setIsActiveUniversityProcess] = useState<boolean>(false);
  const isSaveDisable: boolean = useMemo(() => !universityItem.name || !universityItem.country, [universityItem]);
  const countries: CountriesList = useAppSelector(getCreateEditCountries);

  const countriesList = useMemo(
    () =>
      GlobalUtils.removeDuplicateArrayRecords(
        [
          {
            id: 1,
            name: universityItem.country,
          },
          ...countries.data,
        ],
        'name'
      ),
    [countries.data]
  );

  const handleSaveValidation = () => {
    setIsActiveUniversityProcess(true);
    handleSave(universityItem, (success: boolean) => {
      success && handleClose();
      setIsActiveUniversityProcess(false);
    });
  };

  const handleCountriesLoading = (page: number) => {
    if (page > countries.pagination.current_page) {
      dispatch(
        getCountriesAsync({
          editMode: true,
          page,
          limit: PER_PAGE,
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
                  name: String(e.target.value),
                }))
              }
              required
              label="Name"
            />
            <LazyLoadingSelect<CountryModel>
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
              items={countriesList}
              fieldLabel={'name'}
              fieldValue={'name'}
            />
            <TextField
              value={GlobalUtils.joinArray<string>(universityItem.domains)}
              onChange={(e) =>
                setUniversityItem((prev) => ({
                  ...prev,
                  domains: GlobalUtils.splitString(String(e.target.value)),
                }))
              }
              label="Domain"
            />
            <TextField
              value={GlobalUtils.joinArray<string>(universityItem.web_pages)}
              onChange={(e) =>
                setUniversityItem((prev) => ({
                  ...prev,
                  web_pages: GlobalUtils.splitString(String(e.target.value)),
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
