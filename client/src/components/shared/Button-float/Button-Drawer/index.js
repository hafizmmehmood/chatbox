import React, { useState, useEffect } from 'react';
import { Drawer } from '@mui/material';
import ButtonBox from './ButtonBox';
import useStyles from './Styles';
import { _RESIZE, _RIGHT, _PERMANENT, _TRUE } from '../../../../utils/Constants';

const ButtonDrawer = (props) => {
  const { drawerToggle, toggleDrawerHandler, handleDashBoardExport } = props;
  const classes = useStyles();
  const [viewWidth, setViewWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setViewWidth(window.innerWidth);
    };
    window.addEventListener(_RESIZE, handleResize);
    return () => window.removeEventListener(_RESIZE, handleResize);
  }, []);
  return (
    <div>
      <Drawer
        disableenforcefocus={_TRUE}
        classes={{ paper: classes.buttonDrawerPaper }}
        anchor={_RIGHT}
        open={drawerToggle}
        variant={_PERMANENT}
        hidebackdrop={_TRUE}
        onClose={toggleDrawerHandler}>
        <ButtonBox
          viewWidth={viewWidth}
          toggleDrawerHandler={toggleDrawerHandler}
          handleDashBoardExport={handleDashBoardExport}
          {...props}
        />
      </Drawer>
    </div>
  );
};

export default ButtonDrawer;
