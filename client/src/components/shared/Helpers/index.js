import { toast } from 'react-toastify';

export const success = (value, option = {}) => toast.success(value, option);
export const error = (value, option = {}) => toast.error(value, option);
