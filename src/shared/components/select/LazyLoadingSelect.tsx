import React from 'react';
import { FormControl, InputLabel, MenuItem } from '@mui/material';
import { Select } from '@material-ui/core';
import styles from './LazyLoadingSelect.module.css';
import ButtonItem from '../button/Button';
import { PaginationModel } from '../../models/paginationModel';

interface LazyLoadingSelectProps {
  name: string;
  value: string;
  handleLazyLoading: (page: number) => void;
  pagination: PaginationModel;
  handleValueSelection: (value: string) => void;
  items: any[];
  fieldLabel: string;
  fieldValue: string;
  required?: boolean;
}

const LazyLoadingSelect: React.FC<LazyLoadingSelectProps> = ({
  name,
  value,
  handleLazyLoading,
  pagination,
  handleValueSelection,
  items,
  fieldLabel,
  fieldValue,
  required,
}) => {
  return (
    <FormControl>
      {!value && <InputLabel id={`${name}-select-label`}>Country</InputLabel>}
      <Select
        required={required}
        className={styles.select}
        MenuProps={{
          PaperProps: {
            style: {
              width: 250,
            },
          },
        }}
        variant={'outlined'}
        labelId="country-select-label"
        id="country-select"
        value={value}
        onOpen={() => handleLazyLoading(1)}
        onChange={(event) => {
          handleValueSelection(event.target.value as string);
        }}
      >
        <MenuItem value="">None</MenuItem>
        {items.map((element) => (
          <MenuItem key={element[fieldValue]} value={element[fieldLabel]}>
            {element[fieldValue]}
          </MenuItem>
        ))}
        <div className={styles.loadMoreBtn}>
          <ButtonItem
            handleClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleLazyLoading(pagination.current_page + 1);
            }}
            fullWidth
            variant={'contained'}
            size={'medium'}
            disabled={pagination.current_page === pagination.last_page}
          >
            Load more
          </ButtonItem>
        </div>
      </Select>
    </FormControl>
  );
};

export default LazyLoadingSelect;
