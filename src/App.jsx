import { FavoriteProvider } from './Components/FavoriteContext';
import HomePage from './Components/HomePage';

function App() {
  return (
    <FavoriteProvider>
      <HomePage/>
    </FavoriteProvider>
  );
}

export default App;
