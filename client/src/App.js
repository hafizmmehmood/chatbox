import React, { lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer';
const Layout = lazy(() => import('./containers/Layout'));
const AuthRoutes = lazy(() => import('./routes/AuthRoutes'));
const Confirmation = lazy(() => import('./pages/auth/Confirmation'));

// get the authentication token from local storage if it exists
const token = localStorage.getItem('token');

function App() {
  return (
    <Router>
      <AccessibleNavigationAnnouncer />
      <Switch>
        <Route path="/confirmation" component={Confirmation} />
        <Route path="/" component={token ? Layout : AuthRoutes} />
      </Switch>
    </Router>
  );
}

export default App;
