import { BrowserRouter } from 'react-router-dom';
import SecureApp from './SecureApp';

function App() {
  return (
    <div className="flex min-h-screen min-w-full">
      <div className="flex flex-grow flex-col justify-center items-center">
        <BrowserRouter>
          <SecureApp />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
