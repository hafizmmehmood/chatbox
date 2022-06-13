import React from 'react';
import Spinner from '../Spinner';

function ThemedSuspense() {
  return (
    <div className="w-full h-screen p-6 flex items-center flex-column justify-center text-lg font-medium text-gray-600 dark:text-gray-400 dark:bg-gray-900">
      <Spinner />
    </div>
  );
}

export default ThemedSuspense;
