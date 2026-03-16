import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MapPinIcon } from '@heroicons/react/24/solid';
import { Cog6ToothIcon } from '@heroicons/react/16/solid';
import Title from '../components/Title';
import { MapContext } from '../context/MapContext';

const GRID_STEP = 4;
const BLACK_THRESHOLD = 20;
const MIN_SEGMENT_PX = 8;

function segmentDirection(dx, dy) {
	return Math.abs(dx) >= Math.abs(dy) ? (dx >= 0 ? 'E' : 'W') : (dy >= 0 ? 'S' : 'N');
}

function clamp(value, min, max) {
	return Math.max(min, Math.min(max, value));
}

function buildWalkableGrid(imageData, width, height, step) {
	const gridWidth = Math.ceil(width / step);
	const gridHeight = Math.ceil(height / step);
	const grid = new Uint8Array(gridWidth * gridHeight);

	for (let gy = 0; gy < gridHeight; gy += 1) {
		for (let gx = 0; gx < gridWidth; gx += 1) {
			const sampleX = clamp(Math.floor((gx + 0.5) * step), 0, width - 1);
			const sampleY = clamp(Math.floor((gy + 0.5) * step), 0, height - 1);
			const idx = (sampleY * width + sampleX) * 4;
			const r = imageData[idx];
			const g = imageData[idx + 1];
			const b = imageData[idx + 2];
			const isBlack = r <= BLACK_THRESHOLD && g <= BLACK_THRESHOLD && b <= BLACK_THRESHOLD;
			grid[gy * gridWidth + gx] = isBlack ? 0 : 1;
		}
	}

	return { grid, gridWidth, gridHeight };
}

function findNearestWalkable(grid, gridWidth, gridHeight, startX, startY) {
	const inBounds = (x, y) => x >= 0 && y >= 0 && x < gridWidth && y < gridHeight;
	const startIndex = startY * gridWidth + startX;
	if (grid[startIndex] === 1) {
		return { x: startX, y: startY };
	}

	const visited = new Uint8Array(gridWidth * gridHeight);
	const queue = [{ x: startX, y: startY }];
	visited[startIndex] = 1;
	const directions = [
		[1, 0],
		[-1, 0],
		[0, 1],
		[0, -1]
	];

	for (let i = 0; i < queue.length; i += 1) {
		const current = queue[i];
		for (const [dx, dy] of directions) {
			const nx = current.x + dx;
			const ny = current.y + dy;
			if (!inBounds(nx, ny)) {
				continue;
			}
			const index = ny * gridWidth + nx;
			if (visited[index] === 1) {
				continue;
			}
			visited[index] = 1;
			if (grid[index] === 1) {
				return { x: nx, y: ny };
			}
			queue.push({ x: nx, y: ny });
		}
	}

	return null;
}

function bfsPath(grid, gridWidth, gridHeight, start, goal) {
	const inBounds = (x, y) => x >= 0 && y >= 0 && x < gridWidth && y < gridHeight;
	const toIndex = (x, y) => y * gridWidth + x;
	const fromIndex = (index) => ({ x: index % gridWidth, y: Math.floor(index / gridWidth) });
	const directions = [
		[1, 0],
		[-1, 0],
		[0, 1],
		[0, -1]
	];

	const startIndex = toIndex(start.x, start.y);
	const goalIndex = toIndex(goal.x, goal.y);
	const visited = new Uint8Array(gridWidth * gridHeight);
	const parent = new Int32Array(gridWidth * gridHeight);
	parent.fill(-1);
	const queue = [startIndex];
	visited[startIndex] = 1;

	for (let i = 0; i < queue.length; i += 1) {
		const currentIndex = queue[i];
		if (currentIndex === goalIndex) {
			break;
		}
		const current = fromIndex(currentIndex);
		for (const [dx, dy] of directions) {
			const nx = current.x + dx;
			const ny = current.y + dy;
			if (!inBounds(nx, ny)) {
				continue;
			}
			const nextIndex = toIndex(nx, ny);
			if (visited[nextIndex] === 1 || grid[nextIndex] === 0) {
				continue;
			}
			visited[nextIndex] = 1;
			parent[nextIndex] = currentIndex;
			queue.push(nextIndex);
		}
	}

	if (visited[goalIndex] !== 1) {
		return null;
	}

	const path = [];
	let cursor = goalIndex;
	while (cursor !== -1) {
		path.push(fromIndex(cursor));
		cursor = parent[cursor];
	}

	path.reverse();
	return path;
}

export default function MapView() {
	const { mapName } = useParams();
	const navigate = useNavigate();
	const { maps, showCompass } = useContext(MapContext);
	const decodedMapName = mapName ? decodeURIComponent(mapName) : '';
	const selectedMap = maps[decodedMapName];
	const imageSrc = selectedMap?.image ? new URL(`../assets/${selectedMap.image}`, import.meta.url).href : '';
	const [startPosition, setStartPosition] = useState(null);
	const [destination, setDestination] = useState(null);
	const [routePoints, setRoutePoints] = useState([]);

	const routeString = (() => {
		if (routePoints.length <= 1) {
			return null;
		}

		let firstIndex = -1;
		let fallbackIndex = -1;
		let fallbackLength = 0;

		for (let i = 1; i < routePoints.length; i += 1) {
			const from = routePoints[i - 1];
			const to = routePoints[i];
			if (from?.xPx === undefined || to?.xPx === undefined) {
				continue;
			}

			const dx = to.xPx - from.xPx;
			const dy = to.yPx - from.yPx;
			const segmentLengthPx = Math.hypot(dx, dy);

			if (segmentLengthPx > fallbackLength) {
				fallbackLength = segmentLengthPx;
				fallbackIndex = i;
			}

			if (segmentLengthPx >= MIN_SEGMENT_PX) {
				firstIndex = i;
				break;
			}
		}

		if (firstIndex === -1) {
			firstIndex = fallbackIndex;
		}

		if (firstIndex === -1) {
			return null;
		}

		const firstFrom = routePoints[firstIndex - 1];
		const firstTo = routePoints[firstIndex];
		if (firstFrom?.xPx === undefined || firstTo?.xPx === undefined) {
			return null;
		}

		const firstDx = firstTo.xPx - firstFrom.xPx;
		const firstDy = firstTo.yPx - firstFrom.yPx;
		const firstDirection = segmentDirection(firstDx, firstDy);
		let runLengthPx = Math.hypot(firstDx, firstDy);

		for (let i = firstIndex + 1; i < routePoints.length; i += 1) {
			const from = routePoints[i - 1];
			const to = routePoints[i];
			if (from?.xPx === undefined || to?.xPx === undefined) {
				continue;
			}

			const dx = to.xPx - from.xPx;
			const dy = to.yPx - from.yPx;
			const segmentLengthPx = Math.hypot(dx, dy);
			if (segmentLengthPx === 0) {
				continue;
			}

			const direction = segmentDirection(dx, dy);
			if (direction !== firstDirection) {
				break;
			}

			runLengthPx += segmentLengthPx;
		}

		if (runLengthPx === 0) {
				return null;
		}

		const length = (runLengthPx / 10).toFixed(0);

		return `Forward (${firstDirection}) ${length} m`;
	})();

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

	useEffect(() => {
		if (!startPosition || !destination || !imageSrc) {
			setRoutePoints([]);
			return;
		}

		let cancelled = false;
		const img = new Image();
		img.onload = () => {
			if (cancelled) {
				return;
			}

			const width = img.naturalWidth;
			const height = img.naturalHeight;
			const canvas = document.createElement('canvas');
			canvas.width = width;
			canvas.height = height;
			const ctx = canvas.getContext('2d');
			if (!ctx) {
				setRoutePoints([]);
				return;
			}

			ctx.drawImage(img, 0, 0);
			const imageData = ctx.getImageData(0, 0, width, height).data;
			const { grid, gridWidth, gridHeight } = buildWalkableGrid(imageData, width, height, GRID_STEP);

			const startCell = {
				x: clamp(Math.floor(startPosition.x / GRID_STEP), 0, gridWidth - 1),
				y: clamp(Math.floor(startPosition.y / GRID_STEP), 0, gridHeight - 1)
			};
			const destinationCell = {
				x: clamp(Math.floor(destination.x / GRID_STEP), 0, gridWidth - 1),
				y: clamp(Math.floor(destination.y / GRID_STEP), 0, gridHeight - 1)
			};

			const walkableStart = findNearestWalkable(grid, gridWidth, gridHeight, startCell.x, startCell.y);
			const walkableDestination = findNearestWalkable(grid, gridWidth, gridHeight, destinationCell.x, destinationCell.y);
			if (!walkableStart || !walkableDestination) {
				setRoutePoints([]);
				return;
			}

			const pathCells = bfsPath(grid, gridWidth, gridHeight, walkableStart, walkableDestination);
			if (!pathCells) {
				setRoutePoints([]);
				return;
			}

			const pathPoints = pathCells.map((cell) => {
				const x = clamp((cell.x + 0.5) * GRID_STEP, 0, width - 1);
				const y = clamp((cell.y + 0.5) * GRID_STEP, 0, height - 1);
				return {
					x: (x / width) * 100,
					y: (y / height) * 100,
					xPx: x,
					yPx: y
				};
			});

			setRoutePoints([
				{ x: startPosition.percentX, y: startPosition.percentY, xPx: startPosition.x, yPx: startPosition.y },
				...pathPoints,
				{ x: destination.percentX, y: destination.percentY, xPx: destination.x, yPx: destination.y }
			]);
		};
		img.onerror = () => {
			if (!cancelled) {
				setRoutePoints([]);
			}
		};
		img.src = imageSrc;

		return () => {
			cancelled = true;
		};
	}, [startPosition, destination, imageSrc]);

	return (
		<div className="flex flex-col min-h-screen bg-primary-bg">
			<div className="w-full">
				<Title />
			</div>
			<div className="flex flex-col items-center justify-start flex-1 px-6 py-3 text-center gap-4">
				<p className="text-xl font-bold text-white wrap-break-word">{`${decodedMapName} - ${startPosition ? (destination ? (routeString ?? 'Calculating...') : "Tap Destination") : "Tap Start Position"}`}</p>
				{imageSrc && (
					<div className="relative w-full max-w-md">
						<img
							onClick={handleImageClick}
							src={imageSrc}
							alt={`${decodedMapName} map`}
							className="w-full rounded border-2 border-black cursor-pointer"
						/>
						<button
							type="button"
							onClick={() => navigate(decodedMapName ? `/settings/${encodeURIComponent(decodedMapName)}` : '/settings')}
							className="absolute right-3 bottom-3 w-10 h-10 rounded-full bg-white/90 text-black flex items-center justify-center app-border-strong app-pressable-brightness app-transition-fast"
							aria-label="Settings"
						>
							<Cog6ToothIcon className="w-6 h-6" />
						</button>
						{showCompass && (
							<div className="absolute left-3 bottom-3 pointer-events-none select-none flex flex-col items-center gap-1">
								<div className="relative w-12 h-12 rounded-full border border-black/40 bg-white/55 text-black/80">
									<div className="absolute left-1/2 top-4 bottom-4 w-px bg-black/70 -translate-x-1/2" />
									<div className="absolute top-1/2 left-4 right-4 h-px bg-black/70 -translate-y-1/2" />
									<div className="absolute left-1/2 top-0 -translate-x-1/2 text-[10px] font-bold text-red-700">N</div>
									<div className="absolute right-1 top-1/2 -translate-y-1/2 text-[10px] font-semibold">E</div>
									<div className="absolute left-1/2 bottom-0 -translate-x-1/2 text-[10px] font-semibold">S</div>
									<div className="absolute left-1 top-1/2 -translate-y-1/2 text-[10px] font-semibold">W</div>
								</div>
								<span className="px-1.5 py-0.5 rounded bg-black/35 text-white text-[8px] font-semibold uppercase tracking-[0.08em]">
									Compass
								</span>
							</div>
						)}
						{routePoints.length > 1 && (
							<svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
								<polyline
									points={routePoints.map((point) => `${point.x},${point.y}`).join(' ')}
									fill="none"
									stroke="#3b82f6"
									strokeWidth="0.8"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						)}
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
							<MapPinIcon
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
