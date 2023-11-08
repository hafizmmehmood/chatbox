import React from 'react';
import { Button, Tooltip } from  '@mui/material';
import {FaPlus} from "react-icons/fa";
import { _DEPOSIT, _LEFT, _WITHDRAW, _BANK } from '../../../../utils/Constants';
import { titlesAddButton } from '../helper';

const AddButton = (props) => {
  const { type, kycValue, kycToggle, handleModalOpen } = props;
  return (
    <>
      <div className="card-header--actions mt-1">
        <Button
          id="deposit-balance-btn"
          className="btn-inner-floating ml-1 mr-1 min-w-fit bg-neutral-success text-success p-0 w-12 h-12 flex align-center justify-center"
          onClick={() => {
            if (type && type === _DEPOSIT && kycValue !== 3) {
              kycToggle();
            } else {
              handleModalOpen();
            }
          }}>
          <span>
            <Tooltip
              arrow
              placement={_LEFT}
              classes={{ tooltip: 'mr-3 text-center p-3 tooltip-secondary' }}
              title={type && titlesAddButton[type]}>
              {type && type === _WITHDRAW ? (
                <img
                  height="22px"
                  width="22px"
                  alt=""
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDEyNCAxMjQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPHBhdGggZD0iTTExMiw1MEgxMkM1LjQsNTAsMCw1NS40LDAsNjJjMCw2LjYsNS40LDEyLDEyLDEyaDEwMGM2LjYsMCwxMi01LjQsMTItMTJDMTI0LDU1LjQsMTE4LjYsNTAsMTEyLDUweiIgZmlsbD0iIzU2YWY1MCIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjwvZz48L3N2Zz4="
                />
              ) : type && type === _DEPOSIT ? (
                <FaPlus className="text-8 text-success" />
              ) : (
                <img
                  height="25px"
                  width="25px"
                  alt=""
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDQ2OS4zMzMzMyA0NjkuMzMzMzMiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbD0iIzRjYWY1MCI+PHBhdGggZD0ibTQzNy4zMzIwMzEgMTkyaC00MDUuMzMyMDMxYy0xNy42NjQwNjIgMC0zMiAxNC4zMzU5MzgtMzIgMzJ2MjEuMzMyMDMxYzAgMTcuNjY0MDYzIDE0LjMzNTkzOCAzMiAzMiAzMmg0MDUuMzMyMDMxYzE3LjY2NDA2MyAwIDMyLTE0LjMzNTkzNyAzMi0zMnYtMjEuMzMyMDMxYzAtMTcuNjY0MDYyLTE0LjMzNTkzNy0zMi0zMi0zMnptMCAwIiBmaWxsPSIjNGNhZjUwIiBkYXRhLW9yaWdpbmFsPSIjNGNhZjUwIiBzdHlsZT0iIj48L3BhdGg+PHBhdGggZD0ibTE5MiAzMnY0MDUuMzMyMDMxYzAgMTcuNjY0MDYzIDE0LjMzNTkzOCAzMiAzMiAzMmgyMS4zMzIwMzFjMTcuNjY0MDYzIDAgMzItMTQuMzM1OTM3IDMyLTMydi00MDUuMzMyMDMxYzAtMTcuNjY0MDYyLTE0LjMzNTkzNy0zMi0zMi0zMmgtMjEuMzMyMDMxYy0xNy42NjQwNjIgMC0zMiAxNC4zMzU5MzgtMzIgMzJ6bTAgMCIgZmlsbD0iIzRjYWY1MCIgZGF0YS1vcmlnaW5hbD0iIzRjYWY1MCIgc3R5bGU9IiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+"
                />
              )}
            </Tooltip>
          </span>
        </Button>
      </div>
    </>
  );
};
export default AddButton;
