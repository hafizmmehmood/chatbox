import React, { useState, useCallback } from 'react';
import { Button } from '@mui/material';
import ButtonDrawer from './Button-Drawer';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';

const FloatingButton = (props) => {
  const [drawerToggle, setDrawerToggle] = useState(true);
  const toggleDrawerHandler = useCallback(() => {
    setDrawerToggle(!drawerToggle);
  }, [drawerToggle]);

  return (
    <>
      <div className="float-button">
        <div className="card-header--actions">
          <Button
            size="small"
            className="btn-purple-right-arrow cursor-pointer w-14 h-10"
            onClick={toggleDrawerHandler}>
            {drawerToggle ? (
              <span className="text-xl text-white">
                <FaAngleRight  />
              </span>
            ) : (
              <span className="text-xl text-white">
                <FaAngleLeft />
              </span>
            )}
          </Button>
        </div>
      </div>

      {drawerToggle && (
        <ButtonDrawer
          drawerToggle={drawerToggle}
          toggleDrawerHandler={toggleDrawerHandler}
          handleDashBoardExport={props.handleDashBoardExport}
          {...props}
        />
      )}
    </>
  );
};

export default FloatingButton;
