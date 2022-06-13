import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function InfoCard({ title, value, children: icon }) {
  return (
    <Card className='bg-card-container dark:bg-slate-600 dark:shadow-sm'>
      <div className="bg-card-header p-6 dark:bg-gray-800">
        <p className="m-0 mx-2 text-sm font-medium text-gray-600 dark:text-gray-200">
          {title}
        </p>
      </div>
      <CardContent className="flex items-center p-6 m-2">
        {icon}
        <div>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            {value}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default InfoCard;
