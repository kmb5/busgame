import { CardDeck } from './components/CardDeck';
import { Card } from './components/Card';
import { CardStack } from './components/CardStack';

function App() {
  return (
    <div className="h-screen w-screen">
      <div className="flex gap-4 p-4">
        <CardDeck />
      </div>
    </div>
  );
}

export default App;
