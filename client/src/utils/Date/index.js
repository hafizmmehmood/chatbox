import dayjs from 'dayjs';
import { DATE_TIME, DATE } from '../Constants';
export const formatDateTime = (date) => {
  return dayjs(date).format(DATE_TIME);
};
export const formatDate = (date) => {
  return dayjs(date).format(DATE);
};
