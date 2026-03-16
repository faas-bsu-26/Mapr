import { Routes, Route } from 'react-router-dom';
import Scan from './pages/Scan';
import Save from './pages/Save';
import MapList from './pages/MapList';
import MapView from './pages/MapView';
import Settings from './pages/Settings';
import { MapProvider } from './context/MapContext';

function App() {
  return (
    <MapProvider>
      <div className="min-h-screen flex justify-center bg-neutral-200">
        <div className="w-full max-w-107.5 bg-white shadow-2xl">
          <Routes>
            <Route path="/" element={<Scan />} />
            <Route path="/save" element={<Save />} />
            <Route path="/maplist" element={<MapList />} />
            <Route path="/map/:mapName" element={<MapView />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/settings/:mapName" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </MapProvider>
  );
}

export default App;
