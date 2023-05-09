import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/tailwind.output.css';
import App from './App';
import { SidebarProvider } from './context/SidebarContext';
import { ThemeProvider } from './context/ThemeContext';
import ThemedSuspense from './components/shared/ThemedSuspense';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { store } from './config/configureStore';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 5 * 1000
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient} >
      <ThemeProvider>
        <SidebarProvider>
          <Suspense fallback={<ThemedSuspense />}>
            <App />
          </Suspense>
        </SidebarProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </Provider>
);

serviceWorker.register();
