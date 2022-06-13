import React from 'react';
import { Link } from 'react-router-dom';
import { ForbiddenIcon } from '../icons';

function Page404() {
  return (
    <div className="mt-16 flex flex-col items-center">
      <ForbiddenIcon
        className="w-12 h-12 mt-8 text-blue-300"
        aria-hidden="true"
      />
      <h1 className="text-6xl font-semibold text-gray-700 dark:text-gray-200">
        404
      </h1>
      <p className="text-gray-700 dark:text-gray-300">
        Page not found. Check the address or{' '}
        <Link
          className="text-blue-700 hover:underline dark:text-blue-300"
          to="/">
          go back
        </Link>
        .
      </p>
    </div>
  );
}

export default Page404;
