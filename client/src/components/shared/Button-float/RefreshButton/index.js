import React from 'react';
import { Button, Tooltip } from '@mui/material';
import {
  _LEFT,
  REFRESH,
  _DEPOSIT,
  _FIAT,
  _USER
} from '../../../../utils/Constants';
import { RefreshIcon } from '../../../../icons';

const Refresh = (props) => {
  const { refetch, refreshKycFiat, type, data, setRowData, currencyType } =
    props;
  return (
    <>
      <div className="card-header--actions">
        <Button
          id="deposit-refresh-btn"
          className=" btn-inner-floating ml-1 mr-1 mt-1 mb-1  min-w-fit bg-neutral-primary text-success p-0 w-12 h-12 flex align-center justify-center"
          onClick={() => {
            if (type === _DEPOSIT && currencyType === _FIAT) {
              refreshKycFiat();
              refetch();
            } else if (type === _USER && currencyType === _USER) {
              setRowData(data);
              refetch();
            } else {
              refetch();
            }
          }}>
          <Tooltip
            arrow
            placement={_LEFT}
            classes={{ tooltip: 'mr-3 text-center p-3 tooltip-secondary' }}
            title={REFRESH}>
            {RefreshIcon}
          </Tooltip>
        </Button>
      </div>
    </>
  );
};
export default Refresh;
