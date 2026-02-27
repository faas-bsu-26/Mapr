import Title from '../components/Title';
import ScanButton from '../components/ScanButton';

export default function Scan() {
  return (
    <div className="min-h-screen flex flex-col">
      <Title />
      
      <div className="px-6 py-4 bg-scan-bg">
        <h2 className="text-2xl font-semibold text-center">Scan Map:</h2>
      </div>
      
      <div className="flex-1 bg-scan-bg"></div>
      
      <div className="bg-scan-bg pb-4 flex justify-center">
        <ScanButton />
      </div>
    </div>
  );
}
