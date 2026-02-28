import Title from '../components/Title';
import ScanButton from '../components/ScanButton';
import ScanCamera from '../components/ScanCamera';
import mallMap from '../assets/mall_map.jpg';

export default function Scan() {
  return (
    <div className="min-h-screen flex flex-col">
      <Title />
      
      <div className="px-6 py-4 bg-primary-bg">
        <h2 className="text-2xl font-semibold text-center">Scan Map:</h2>
      </div>
      
      <div className="flex-1 bg-primary-bg">
        <ScanCamera image={mallMap} />
      </div>
      
      <div className="bg-primary-bg pb-4 flex justify-center">
        <ScanButton />
      </div>
    </div>
  );
}
