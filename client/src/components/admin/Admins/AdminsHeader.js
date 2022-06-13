import React from 'react';
import { FaPlus } from 'react-icons/fa';
import IconButtonCircle from '../../shared/Buttons/IconButtonCircle';

function AdminsHeader({ onClick }) {
  return (
    <div className="flex items-center justify-between mt-6 mb-4">
      <span className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Admins
      </span>
      <IconButtonCircle onClick={onClick}>
        <FaPlus className="text-white text-md" />
      </IconButtonCircle>
    </div>
  );
}

export default AdminsHeader;
