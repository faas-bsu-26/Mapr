import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Title from '../components/Title';
import { MapContext } from '../context/MapContext';

export default function MapView() {
	const { mapName } = useParams();
	const navigate = useNavigate();
	const { maps } = useContext(MapContext);
	const decodedMapName = mapName ? decodeURIComponent(mapName) : '';
	const selectedMap = maps[decodedMapName];
	const imageSrc = selectedMap?.image ? new URL(`../assets/${selectedMap.image}`, import.meta.url).href : '';

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
			<div className="flex flex-col items-center justify-start flex-1 px-6 py-3 text-center gap-4">
				<p className="text-2xl font-bold text-white wrap-break-word">{decodedMapName}</p>
				{imageSrc && (
					<img
						src={imageSrc}
						alt={`${decodedMapName} map`}
						className="w-full max-w-md rounded border-2 border-black"
					/>
				)}
			</div>
		</div>
	);
}
