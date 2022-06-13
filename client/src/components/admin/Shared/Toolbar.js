import React from 'react';
import { MdRefresh, MdSearch } from 'react-icons/md';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButtonCircle from '../../shared/Buttons/IconButtonCircle';
import Autocomplete from '@mui/material/Autocomplete';
import { chainsList } from './Helper';

const Toolbar = ({
  onClickRefresh,
  onSearch,
  filter,
  isAmm,
  isFarm,
  ammArr,
  farmArr,
  chainHandleChange,
  ammHandleChange,
  farmHandleChange
}) => {
  return (
    <div
      className="bg-header p-4 flex items-center justify-between dark:bg-slate-800 dark:border-b-gray-400 rounded-t-md"
      style={{
        borderBottom: '1px solid lightgray'
      }}>
      <div className="flex items-center justify-between">
        <div className="w-52 pr-2">
          <TextField
            label="Search"
            size="small"
            type="search"
            className="custom-text-field dark:custom-text-field-dark"
            onChange={(e) => onSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdSearch className="text-blue-700 dark:text-blue-300 text-xl" />
                </InputAdornment>
              )
            }}
          />
        </div>
        {filter && filter.chain && (
          <div className="w-52 pr-2">
            <Autocomplete
              fullWidth
              id="chain-auto-complete"
              options={chainsList || []}
              getOptionLabel={(option) => option?.name}
              onChange={chainHandleChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  className="custom-text-field dark:custom-text-field-dark"
                  label={'Chain Type'}
                  placeholder={'Select Chain Type'}
                  size={'small'}
                  name={'chain'}
                />
              )}
            />
          </div>
        )}
      </div>

      <div>
        <IconButtonCircle onClick={() => onClickRefresh()}>
          <MdRefresh className="text-white text-lg" />
        </IconButtonCircle>
      </div>
    </div>
  );
};

export default Toolbar;
