import React from 'react';
import RefreshButton from '../RefreshButton';
import AddButton from '../AddButton';
import useStyles from './Styles';
import {
  addButtonAllowAdmin,
  filterButtonAllowAdmin,
  addButtonAllowUser,
  exportButtonAllowAdmin
} from '../helper';
// import { IsCustomer, IsAdmin } from '../../../utils/Roles';

const ButtonBox = (props) => {
  const {
    type,
    filter,
    resetFilter,
    role,
    handleModalOpen,
    handleFilterModalOpen,
    dataLength,
    filterLength,
    filterForm,
    Pdfcolumns,
    TableName,
    rows,
    handleExportPdf,
    handleDashBoardExport,
    helper,
    kycValue,
    kycToggle,
    setAlert
  } = props;

  const classes = useStyles();
  return (
    <>
      <div className={classes.promoSectionButtons}>
        {/* {filter ? <ResetButton resetFilter={resetFilter} /> : null}
        {IsCustomer(role) ? (
          <>
            {addButtonAllowUser.includes(type) && helper === _ADD ? (
              <AddButton
                type={type}
                kycValue={kycValue}
                kycToggle={kycToggle}
                handleModalOpen={handleModalOpen}
              />
            ) : null}
            {props.cancelShow ? (
              <CancelButtonAll
                type={type}
                setAlert={setAlert}
                refetch={props.refetch}
                currencyType={props.currencyType}
                refreshKycFiat={props.refreshKycFiat}
                setCancelShow={props.setCancelShow}
              />
            ) : null}
          </>
        ) : ( */}
          <>
            { addButtonAllowAdmin.includes(type) ? (
              <AddButton type={type} handleModalOpen={handleModalOpen} />
            ) : null}

            {/* {(dataLength > 0 || filterLength > 0) &&
            filterButtonAllowAdmin.includes(type) ? (
              <FilterButton
                handleFilterModalOpen={handleFilterModalOpen}
                filterLength={filterLength}
                filterForm={filterForm}
              />
            ) : null}
            {(dataLength > 0 || (rows && rows.length > 0)) &&
            !exportButtonAllowAdmin.includes(type) ? (
              <ExportButton
                type={type}
                rows={rows}
                Pdfcolumns={Pdfcolumns}
                TableName={TableName}
                handleExportPdf={handleExportPdf}
                handleDashBoardExport={handleDashBoardExport}
              />
            ) : null} */}
          </>
        {/* )} */}
        {/* {!(!IsAdmin(role) && (type === _ROLLING || type === _RESERVE)) && (
        )} */}
          <RefreshButton {...props} />

      </div>
    </>
  );
};

export default ButtonBox;
