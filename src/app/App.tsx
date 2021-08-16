import { BrowserRouter } from 'react-router-dom';
import SecureApp from './SecureApp';
import { UploadsInfoContextProvider } from '../features/upload/UploadsInfoContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import clsx from 'clsx';

const queryClient = new QueryClient();

const contextClass = {
  success: 'bg-pink',
  error: 'bg-red-500',
  info: 'bg-pink',
  warning: 'bg-yellow-400',
  default: 'bg-pink',
  dark: 'bg-gray-800'
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
      <div className="flex min-h-screen min-w-full items-center flex-col">
        <BrowserRouter>
          <UploadsInfoContextProvider>
            <SecureApp />
          </UploadsInfoContextProvider>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;
