import { BrowserRouter } from 'react-router-dom';
import { useRoutes } from './routes';

function App() {
  const routes = useRoutes()
  return (
    <>
      <div className="App flex items-center justify-center">
        <BrowserRouter>
          {routes}
        </BrowserRouter>
      </div>
      </>
    
  );
}

export default App;
