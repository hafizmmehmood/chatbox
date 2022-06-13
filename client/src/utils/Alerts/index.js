
export const PopUpMessage = (setAlert, type = 'error', message) => {
  setAlert({
    visible: true,
    key: Math.random().toString(36).substring(7),
    type: type,
    message: message
  });
};

export const DialogMessage = (
  setDialog,
  id = '',
  header = '',
  message = '',
  handler = () => {}
) => {
  setDialog({
    id: id,
    visible: true,
    header: header,
    message: message,
    key: Math.random().toString(36).substring(6),
    ok: handler
  });
};
