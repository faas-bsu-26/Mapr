import { Routes, Route } from 'react-router-dom';
import Scan from './pages/Scan';
import Save from './pages/Save';

function App() {
  return (
    <div className="min-h-screen flex justify-center bg-neutral-200">
      <div className="w-full max-w-107.5 bg-white shadow-2xl">
        <Routes>
          <Route path="/" element={<Scan />} />
          <Route path="/save" element={<Save />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
