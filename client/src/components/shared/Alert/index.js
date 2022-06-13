import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
const AlertNotification = props => {
  const [open, setOpen] = React.useState(props.visible);
  React.useEffect(() => {
    setOpen(props.visible);
  }, [props.visible, props.message, props.type]);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  if (!open) return null;
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}>
      <Alert
        style={{ marginTop: '-120px' }}
        className="zero-balance-modal"
        onClose={handleClose}
        severity={props.type}
        elevation={6}
        variant="filled">
        {props.message}
      </Alert>
    </Snackbar>
  );
};
export default AlertNotification;
