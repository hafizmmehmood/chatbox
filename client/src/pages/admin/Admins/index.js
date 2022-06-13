import React, { useEffect } from 'react';
import Admins from '../../../components/admin/Admins';

function AdminsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <Admins />;
}

export default AdminsPage;
