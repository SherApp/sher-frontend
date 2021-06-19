import { BrowserRouter } from 'react-router-dom';
import SecureApp from './SecureApp';
import { UploadsInfoContextProvider } from '../features/upload/UploadsInfoContext';

function App() {
  return (
    <div className="flex min-h-screen min-w-full items-center flex-col">
      <BrowserRouter>
        <UploadsInfoContextProvider>
          <SecureApp />
        </UploadsInfoContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
