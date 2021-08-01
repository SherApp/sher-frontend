import { BrowserRouter } from 'react-router-dom';
import SecureApp from './SecureApp';
import { UploadsInfoContextProvider } from '../features/upload/UploadsInfoContext';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
