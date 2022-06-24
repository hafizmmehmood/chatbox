import React from 'react';
import { Grid, TextField, InputAdornment, Card, List } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Autocomplete from '@mui/material/Autocomplete';
import { FaSearch } from "react-icons/fa";
import TabListItem from './TabListItem';

const ComponentHeader = ({
  data,
  rowsPerPage,
  page,
  setPage,
  count,
  getCount,
  setData,
  onSearch,
  setFieldValue,
  tabsList,
  activeTab,
  toggle,
  pendingStatus
}) => {
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card className="border-radius-0 border-light flex align-center justify-between box-shadow-none px-4">
      {tabsList && tabsList.length > 0 ? (
        <div className="min-w-fit pr-2">
          <List
            component="div"
            className="asset-tabs nav-tabs-primary nav-line flex justify-center p-0">
            {tabsList.map((tab, i) => {
              return (
                <TabListItem
                  key={'transactions-details-tab-' + i}
                  type={tab.name}
                  title={tab.title}
                  activeTab={activeTab}
                  toggle={toggle}
                  pendingStatus={pendingStatus}
                  id={'asset-details-tab-' + i}
                />
              );
            })}
          </List>
        </div>
      ) : null}
      <div className="w-full">
        <Grid container className="py-3 mb-0 mt-0">
          <Grid item md={2} sm={6} xs={12} spacing={2}>
            <div className="pr-3 w-full">
              <Autocomplete
                id="group-by"
                className="w-full group-by-auto-complete"
                options={[]}
                getOptionLabel={(option) => option.name}
                renderOption={(option) => (
                  <div className="w-full flex overflow-hidden">
                    <div className="overflow-hidden my-auto">{option.name}</div>
                  </div>
                )}
                // value={values.group}
                // defaultValue={conditionOptions[0]}
                onChange={(event, value) => {
                  setFieldValue('group', value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    size="small"
                    fullWidth
                    label="Group by"
                    id="group"
                    name="group"
                    type="text"
                    // value={values.group}
                  />
                )}
              />
            </div>
          </Grid>
          <Grid item md={2} sm={6} xs={12} spacing={2}>
            <div className="pr-3">
              <Autocomplete
                id="filter-by"
                className="w-full group-by-auto-complete"
                options={[]}
                getOptionLabel={(option) => option.name}
                renderOption={(option) => (
                  <div className="w-full flex overflow-hidden">
                    <div className="overflow-hidden my-auto">{option.name}</div>
                  </div>
                )}
                // value={values.filter}
                // defaultValue={conditionOptions[0]}
                onChange={(event, value) => {
                  setFieldValue('filter', value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    style={{ borderRadius: '10px !important' }}
                    variant="outlined"
                    size="small"
                    fullWidth
                    label="Filter by"
                    id="filter"
                    name="filter"
                    type="text"
                    // value={values.filter}
                  />
                )}
              />
            </div>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <div className="p-0">
              <TextField
                fullWidth
                className="search-by m-0"
                id="margin-normal"
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaSearch className='text-md' />
                    </InputAdornment>
                  ),
                  endAdornment: <button className="cbtn-search">Enter</button>
                }}
                onChange={(e) => onSearch(e.target.value, data, setData)}
                placeholder="Search for something...."
                //    value={filters.orderNumber}
                // name="orderNumber"
                variant="outlined"
              />
            </div>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <div className="flex align-center justify-end w-full h-full">
              <Pagination
                className="pagination"
                count={count || (getCount && getCount(data.length || 0, rowsPerPage))}
                page={page}
                onChange={handlePageChange}
                siblingCount={0}
                boundaryCount={1}
                variant="outlined"
                shape="rounded"
                id="margin-normal"
                margin="normal"
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </Card>
  );
};
export default ComponentHeader;
