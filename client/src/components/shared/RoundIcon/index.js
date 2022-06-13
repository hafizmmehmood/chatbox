import React from 'react';
import clsx from 'clsx';

function RoundIcon({
  icon: Icon,
  iconColorClass = 'text-blue-700 dark:text-blue-300',
  bgColorClass = 'text-blue-300 dark:bg-blue-700',
  className
}) {
  const baseStyle = 'p-3 rounded-full';

  const cls = clsx(baseStyle, iconColorClass, bgColorClass, className);
  return (
    <div className={cls}>
      <Icon className="w-5 h-5" />
    </div>
  );
}

export default RoundIcon;
