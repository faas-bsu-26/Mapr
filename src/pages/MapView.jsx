import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Title from '../components/Title';
import { MapContext } from '../context/MapContext';

export default function MapView() {
	const { mapName } = useParams();
	const navigate = useNavigate();
	const { maps } = useContext(MapContext);
	const decodedMapName = mapName ? decodeURIComponent(mapName) : '';

	useEffect(() => {
		if (!decodedMapName || !Object.prototype.hasOwnProperty.call(maps, decodedMapName)) {
			navigate('/maplist');
		}
	}, [decodedMapName, maps, navigate]);

	return (
		<div className="flex flex-col min-h-screen bg-primary-bg">
			<div className="w-full">
				<Title />
			</div>
			<div className="flex flex-col items-center justify-center flex-1 px-6 text-center">
				<h2 className="text-xl font-semibold text-white mb-3">Map Name</h2>
				<p className="text-2xl font-bold text-white wrap-break-word">{decodedMapName}</p>
			</div>
		</div>
	);
}
