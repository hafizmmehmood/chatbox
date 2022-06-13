import { WarningIcon } from './Icons';
import Tooltip from '@mui/material/Tooltip';
import copy from 'copy-to-clipboard';
import { success } from '../components/shared/Helpers';

export const HelperTextErr = ({ val }) => {
  return (
    <Tooltip
      arrow
      placement={'bottom'}
      classes={{ tooltip: 'p-2 tooltip-danger' }}
      title={val}>
      <span className="tooltip-icon">{WarningIcon}</span>
    </Tooltip>
  );
};

export const copyToClipboard = async (value) => {
  await copy(value);
  success('copied!', { autoClose: 2000 });
};
