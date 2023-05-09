
import { useLocation } from 'react-router-dom';

const routes = [
  {
    path: '/dashboard', // the url
    icon: 'HomeIcon', // the component being exported from icons/index.js
    name: 'Dashboard' // name that appear in Sidebar
  },
  {
    path: '/transaction', // the url
    icon: 'HomeIcon', // the component being exported from icons/index.js
    name: 'Transaction' // name that appear in Sidebar
  },
  {
    path: '/admins',
    icon: 'OutlinePersonIcon',
    name: 'Admins'
  },
  {
    path: '/abc',
    icon: 'OutlinePersonIcon',
    name: 'Abc'
  }
];

export const GetActiveTabHeading = () => {
  const location = useLocation();
  const activeTab = routes.filter((item) =>
    item.path.includes(location.pathname)
  );
  return activeTab && activeTab[0]
    ? [activeTab[0].name, activeTab[0].subName]
    : [];
};

export default routes;
