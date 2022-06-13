import { FaTimes, FaExclamationTriangle } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { RiImageAddFill } from 'react-icons/ri';
import { BsFillCameraFill } from 'react-icons/bs';

export const CrossIcon = <FaTimes className="font-sm" />;
export const EmailIcon = <FiMail className="font-sm" />;
export const AddImageIcon = <RiImageAddFill className="w-full" />;
export const AddPhotoIcon = <BsFillCameraFill className="font-md" />;

export const WarningIcon = (
  <FaExclamationTriangle className="text-red-400 text-2xl cursor-pointer dark:text-red-400" />
);
