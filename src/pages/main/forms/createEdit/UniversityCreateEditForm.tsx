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
import { getCountries, getCountriesList } from '../../services/mainSlice';
import { PER_PAGE } from '../../../../global/constants/pagination';
import LazyLoadingSelect from '../../../../shared/components/select/LazyLoadingSelect';

interface UniversityCreateEditFormProps {
  university: UniversityModel;
  handleClose: () => void;
  handleSave: (university: UniversityModel) => void;
}

const UniversityCreateEditForm: React.FC<UniversityCreateEditFormProps> = ({ university, handleClose, handleSave }) => {
  const [universityItem, setUniversityItem] = useState<UniversityModel>(university);
  const isSaveDisable: boolean = useMemo(() => !universityItem.name || !universityItem.country, [universityItem]);
  const handleSaveValidation = () => {
    handleSave(universityItem);
  };
  const dispatch = useAppDispatch();
  const countries: CountriesList = useAppSelector(getCountriesList);

  const handleCountriesLoading = (page: number) => {
    if (page > countries.pagination.current_page) {
      dispatch(
        getCountries({
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
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
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
              value={universityItem.domains[0]}
              onChange={(e) =>
                setUniversityItem((prev) => ({
                  ...prev,
                  domains: [e.target.value as string],
                }))
              }
              label="Domain"
            />
            <TextField
              value={universityItem.web_pages[0]}
              onChange={(e) =>
                setUniversityItem((prev) => ({
                  ...prev,
                  web_pages: [e.target.value as string],
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
