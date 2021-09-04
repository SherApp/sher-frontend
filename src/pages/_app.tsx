import { Hydrate } from 'react-query/hydration';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';
import { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import clsx from 'clsx';
import { UploadsInfoContextProvider } from '../features/upload/UploadsInfoContext';
import '../components/EllipsisLoading/EllipsisLoading.scss';
import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

const contextClass = {
  success: 'bg-pink',
  error: 'bg-red-500',
  info: 'bg-pink',
  warning: 'bg-yellow-400',
  default: 'bg-pink',
  dark: 'bg-gray-800'
};

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ToastContainer
          toastClassName={(className) =>
            clsx(
              contextClass[className?.type || 'default'],
              'relative shadow-xl flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer'
            )
          }
          bodyClassName={() => 'p-3 text-white'}
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="min-h-screen min-w-full dark:bg-gray-900 dark:text-gray-200 bg-gray-50">
          <UploadsInfoContextProvider>
            <Component {...pageProps} />
          </UploadsInfoContextProvider>
        </div>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default App;
