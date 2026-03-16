import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MapPinIcon as MapPinIncon } from '@heroicons/react/24/solid';
import Title from '../components/Title';
import { MapContext } from '../context/MapContext';

export default function MapView() {
	const { mapName } = useParams();
	const navigate = useNavigate();
	const { maps } = useContext(MapContext);
	const decodedMapName = mapName ? decodeURIComponent(mapName) : '';
	const selectedMap = maps[decodedMapName];
	const imageSrc = selectedMap?.image ? new URL(`../assets/${selectedMap.image}`, import.meta.url).href : '';
	const [startPosition, setStartPosition] = useState(null);
	const [destination, setDestination] = useState(null);

	const handleImageClick = (e) => {
		const img = e.currentTarget;
		const rect = img.getBoundingClientRect();
		const clickX = e.clientX - rect.left;
		const clickY = e.clientY - rect.top;
		const scaleX = img.naturalWidth / rect.width;
		const scaleY = img.naturalHeight / rect.height;
		const pixelX = Math.floor(clickX * scaleX);
		const pixelY = Math.floor(clickY * scaleY);
		const percentX = (clickX / rect.width) * 100;
		const percentY = (clickY / rect.height) * 100;

		const canvas = document.createElement('canvas');
		canvas.width = img.naturalWidth;
		canvas.height = img.naturalHeight;
		const ctx = canvas.getContext('2d');

		if (!ctx) {
			return;
		}

		ctx.drawImage(img, 0, 0);
		const pixelData = ctx.getImageData(pixelX, pixelY, 1, 1).data;
		const [r, g, b] = pixelData;
		if (r !== 0 && g !== 0 && b !== 0) {
			if (!startPosition) {
				setStartPosition({ x: pixelX, y: pixelY, percentX, percentY });
			} else if (!destination) {
				setDestination({ x: pixelX, y: pixelY, percentX, percentY });
			}
		}
	};

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
				<p className="text-xl font-bold text-white wrap-break-word">{`${decodedMapName} - ${startPosition ? (destination ? "" : "Select Destination") : "Select Start Position"}`}</p>
				{imageSrc && (
					<div className="relative w-full max-w-md">
						<img
							onClick={handleImageClick}
							src={imageSrc}
							alt={`${decodedMapName} map`}
							className="w-full rounded border-2 border-black cursor-pointer"
						/>
						{startPosition && (
							<div
								className="absolute w-3 h-3 rounded-full bg-blue-500 border border-white pointer-events-none"
								style={{
									left: `${startPosition.percentX}%`,
									top: `${startPosition.percentY}%`,
									transform: 'translate(-50%, -50%)'
								}}
							/>
						)}
						{destination && (
							<MapPinIncon
								className="absolute w-5 h-5 text-red-900 pointer-events-none"
								style={{
									left: `${destination.percentX}%`,
									top: `${destination.percentY}%`,
									transform: 'translate(-50%, -50%)'
								}}
							/>
						)}

					</div>
				)}
			</div>
		</div>
	);
}
