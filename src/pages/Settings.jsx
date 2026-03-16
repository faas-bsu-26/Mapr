import TitleWithBack from '../components/TitleWithBack';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { MapContext } from '../context/MapContext';

export default function Settings() {
	const { mapName } = useParams();
	const { showCompass, setShowCompass } = useContext(MapContext);
	const decodedMapName = mapName ? decodeURIComponent(mapName) : '';
	const backTo = decodedMapName ? `/map/${encodeURIComponent(decodedMapName)}` : '/maplist';

	const settingsDictionary = {
		showCompass: {
			text: 'Show Compass',
			value: showCompass,
			setCommand: setShowCompass
		}
	};

	const rows = Object.entries(settingsDictionary).map(([key, config]) => ({
		id: key,
		title: config.text,
		value: config.value,
		setCommand: config.setCommand
	}));

	return (
		<div className="flex flex-col min-h-screen bg-primary-bg">
			<div className="w-full">
				<TitleWithBack backTo={backTo} />
			</div>
			<div className="flex-1 px-6 py-6">
				<div className="w-full max-w-md mx-auto flex flex-col gap-3">
					{rows.map((row) => (
						<div key={row.id} className="bg-white border-2 border-black rounded px-4 py-3 flex items-center justify-between">
							<p className="text-black font-semibold">{row.title}</p>
							<button
								type="button"
								onClick={() => row.setCommand(!row.value)}
								className="w-7 h-7 rounded-full border-2 border-black flex items-center justify-center"
								aria-label={`Toggle ${row.title}`}
							>
								<span className={`w-4 h-4 rounded-full transition ${row.value ? 'bg-blue-500' : 'bg-transparent'}`} />
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
