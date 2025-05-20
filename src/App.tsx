import { devices } from './assets/data';
import { DeviceMap } from './components/DeviceMap';

function App() {
  return (
    <main>
      <DeviceMap devices={devices} />
    </main>
  );
}

export default App;
