import React from 'react';

function IconButtonCircle({ onClick, children, className = '' }) {
  return (
    <button
      className={`active:bg-indigo-700 align-bottom bg-indigo-600 border border-transparent cursor-pointer duration-150 flex focus:outline-none  font-medium hover:bg-indigo-600 items-center justify-center leading-5 p-3 rounded-full transition-colors dark:bg-indigo-500 ${className}`}
      onClick={onClick}>
      {children}
    </button>
  );
}

export default IconButtonCircle;
