import { BrowserRouter } from 'react-router-dom';
import SecureApp from './SecureApp';

function App() {
  return (
    <div className="flex min-h-screen min-w-full items-center flex-col">
      <BrowserRouter>
        <SecureApp />
      </BrowserRouter>
    </div>
  );
}

export default App;
