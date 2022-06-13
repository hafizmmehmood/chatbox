import React, { useEffect } from 'react';
import Dashboard from '../../../components/admin/Dashboard';

function DashboardPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Dashboard />
    </>
  );
}

export default DashboardPage;
