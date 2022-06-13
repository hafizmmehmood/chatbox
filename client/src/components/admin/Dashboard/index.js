import React from 'react';
import InfoCard from '../../shared/Cards/InfoCard';
import PageTitle from '../../shared/Typography/PageTitle';
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from '../../../icons';
import RoundIcon from '../../shared/RoundIcon';

function Dashboard() {
  return (
    <>
      <PageTitle>Dashboard</PageTitle>
      <div className="mt-4 grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-2">
        <InfoCard title="Latest Jobs" value="0">
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Main Account balance" value="$ 0">
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Latest Accounts" value="0">
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Failed Request" value="0">
          <RoundIcon
            icon={ChatIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>
    </>
  );
}

export default Dashboard;
