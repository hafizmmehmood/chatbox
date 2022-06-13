import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/tailwind.output.css';
import App from './App';
import { SidebarProvider } from './context/SidebarContext';
import { ThemeProvider } from './context/ThemeContext';
import ThemedSuspense from './components/shared/ThemedSuspense';
import * as serviceWorker from './serviceWorker';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ThemeProvider>
    <SidebarProvider>
      <Suspense fallback={<ThemedSuspense />}>
        <App />
      </Suspense>
    </SidebarProvider>
  </ThemeProvider>
);

serviceWorker.register();
