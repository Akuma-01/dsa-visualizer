import { useEffect, useRef, useState } from 'react';
import { algorithms, getAlgorithmByName } from '../algorithms';
import { DEFAULT_CONFIG } from '../constants';
import type { ArrayElement, SortingStep } from '../types';
import type { PresetType } from '../utils';
import { calculateDelay, generateArray } from '../utils';

interface LaneProps {
	algorithmName: string;
	steps: SortingStep[];
	currentStep: number;
	isFinished: boolean;
	isWinner: boolean;
	showWinner: boolean;
}

function RaceLane({ algorithmName, steps, currentStep, isFinished, isWinner, showWinner }: LaneProps) {
	const algo = getAlgorithmByName(algorithmName);
	const step = steps[currentStep];
	const array = step?.main ?? [];
	const maxValue = array.length > 0 ? Math.max(...array.map(el => el.value)) : 1;
	const progress = steps.length > 0 ? Math.round(((currentStep + 1) / steps.length) * 100) : 0;

	return (
		<div className={`flex flex-col flex-1 min-w-0 rounded-xl border transition-all duration-500 overflow-hidden
			${isWinner && showWinner
				? 'border-yellow-400 shadow-[0_0_24px_rgba(250,204,21,0.25)]'
				: isFinished
					? 'border-green-500/60'
					: 'border-slate-700/50'
			}
		`}>
			{/* Lane header */}
			<div className={`px-4 py-2.5 flex items-center justify-between border-b shrink-0 transition-colors duration-500
				${isWinner && showWinner
					? 'bg-yellow-400/10 border-yellow-400/30'
					: isFinished
						? 'bg-green-500/10 border-green-500/30'
						: 'bg-slate-800/80 border-slate-700/50'
				}
			`}>
				<div className="flex items-center gap-2">
					{isWinner && showWinner && (
						<span className="text-yellow-400 text-sm">🏆</span>
					)}
					<span className={`text-sm font-bold ${isWinner && showWinner ? 'text-yellow-300' : 'text-white'}`}>
						{algo?.displayName}
					</span>
				</div>
				<div className="flex items-center gap-3">
					<span className="text-xs text-slate-500 tabular-nums">
						Cmp <span className="text-red-400 font-bold">{step?.comparisons ?? 0}</span>
					</span>
					<span className="text-xs text-slate-500 tabular-nums">
						Swp <span className="text-amber-400 font-bold">{step?.swaps ?? 0}</span>
					</span>
				</div>
			</div>

			{/* Progress bar */}
			<div className="h-1 bg-slate-800 shrink-0">
				<div
					className={`h-full transition-all duration-200 ${isFinished ? 'bg-green-500' : 'bg-indigo-500'}`}
					style={{ width: `${progress}%` }}
				/>
			</div>

			{/* Bar visualization */}
			<div className="flex-1 bg-slate-900/60 px-3 pt-3 pb-2 min-h-0">
				<div className="h-full flex items-end justify-center gap-px">
					{array.map((el, idx) => (
						<div
							key={idx}
							className="rounded-t transition-all duration-150"
							style={{
								flex: 1,
								height: `${(el.value / maxValue) * 100}%`,
								backgroundColor: el.color,
								minHeight: '3px',
							}}
						/>
					))}
				</div>
			</div>

			{/* Step description */}
			<div className="px-3 pb-2.5 shrink-0 h-10 flex items-center">
				<p className="text-xs text-slate-500 truncate">
					{isFinished
						? `✓ Sorted in ${steps.length} steps`
						: step?.description ?? 'Waiting…'}
				</p>
			</div>
		</div>
	);
}

interface Props {
	onExit: () => void;
}

export default function RaceMode({ onExit }: Props) {
	const [leftAlgo, setLeftAlgo] = useState(algorithms[0].name);
	const [rightAlgo, setRightAlgo] = useState(algorithms[2].name);
	const [arraySize, setArraySize] = useState(30);
	const [speed, setSpeed] = useState(70);
	const [preset, setPreset] = useState<PresetType>('random');

	const [sharedArray, setSharedArray] = useState<ArrayElement[]>(() =>
		generateArray(30, 'random')
	);

	const [leftSteps, setLeftSteps] = useState<SortingStep[]>([]);
	const [rightSteps, setRightSteps] = useState<SortingStep[]>([]);
	const [leftStep, setLeftStep] = useState(0);
	const [rightStep, setRightStep] = useState(0);
	const [isRacing, setIsRacing] = useState(false);
	const [raceStarted, setRaceStarted] = useState(false);
	const [winner, setWinner] = useState<'left' | 'right' | 'tie' | null>(null);

	const leftRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const rightRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const leftStepRef = useRef(0);
	const rightStepRef = useRef(0);
	const leftDoneRef = useRef(false);
	const rightDoneRef = useRef(false);

	const clearTimers = () => {
		if (leftRef.current) clearTimeout(leftRef.current);
		if (rightRef.current) clearTimeout(rightRef.current);
	};

	const handleReset = () => {
		clearTimers();
		const newArr = generateArray(arraySize, preset);
		setSharedArray(newArr);
		setLeftSteps([]);
		setRightSteps([]);
		setLeftStep(0);
		setRightStep(0);
		setIsRacing(false);
		setRaceStarted(false);
		setWinner(null);
		leftStepRef.current = 0;
		rightStepRef.current = 0;
		leftDoneRef.current = false;
		rightDoneRef.current = false;
	};

	const handleArraySizeChange = (size: number) => {
		setArraySize(size);
		clearTimers();
		const newArr = generateArray(size, preset);
		setSharedArray(newArr);
		setLeftSteps([]);
		setRightSteps([]);
		setLeftStep(0);
		setRightStep(0);
		setIsRacing(false);
		setRaceStarted(false);
		setWinner(null);
		leftStepRef.current = 0;
		rightStepRef.current = 0;
		leftDoneRef.current = false;
		rightDoneRef.current = false;
	};

	const handlePresetChange = (p: PresetType) => {
		setPreset(p);
		clearTimers();
		const newArr = generateArray(arraySize, p);
		setSharedArray(newArr);
		setLeftSteps([]);
		setRightSteps([]);
		setLeftStep(0);
		setRightStep(0);
		setIsRacing(false);
		setRaceStarted(false);
		setWinner(null);
		leftStepRef.current = 0;
		rightStepRef.current = 0;
		leftDoneRef.current = false;
		rightDoneRef.current = false;
	};

	const startRace = () => {
		clearTimers();
		const leftAlgoObj = getAlgorithmByName(leftAlgo)!;
		const rightAlgoObj = getAlgorithmByName(rightAlgo)!;
		const lSteps = leftAlgoObj.sortFunction(sharedArray);
		const rSteps = rightAlgoObj.sortFunction(sharedArray);
		setLeftSteps(lSteps);
		setRightSteps(rSteps);
		setLeftStep(0);
		setRightStep(0);
		setWinner(null);
		setRaceStarted(true);
		setIsRacing(true);
		leftStepRef.current = 0;
		rightStepRef.current = 0;
		leftDoneRef.current = false;
		rightDoneRef.current = false;
		// store for use in tick
		leftStepsRef.current = lSteps;
		rightStepsRef.current = rSteps;
	};

	// Store steps in refs so tick closures can read them
	const leftStepsRef = useRef<SortingStep[]>([]);
	const rightStepsRef = useRef<SortingStep[]>([]);

	// Sync refs when state changes
	useEffect(() => { leftStepsRef.current = leftSteps; }, [leftSteps]);
	useEffect(() => { rightStepsRef.current = rightSteps; }, [rightSteps]);

	const checkWinner = () => {
		if (leftDoneRef.current && rightDoneRef.current) {
			const lTotal = leftStepsRef.current.length;
			const rTotal = rightStepsRef.current.length;
			if (lTotal < rTotal) setWinner('left');
			else if (rTotal < lTotal) setWinner('right');
			else setWinner('tie');
			setIsRacing(false);
		} else if (leftDoneRef.current && !rightDoneRef.current) {
			setWinner('left');
		} else if (rightDoneRef.current && !leftDoneRef.current) {
			setWinner('right');
		}
	};

	useEffect(() => {
		if (!isRacing) return;
		const delay = calculateDelay(speed);

		const tickLeft = () => {
			if (leftDoneRef.current) return;
			const next = leftStepRef.current + 1;
			if (next < leftStepsRef.current.length) {
				leftStepRef.current = next;
				setLeftStep(next);
				leftRef.current = setTimeout(tickLeft, delay);
			} else {
				leftDoneRef.current = true;
				checkWinner();
			}
		};

		const tickRight = () => {
			if (rightDoneRef.current) return;
			const next = rightStepRef.current + 1;
			if (next < rightStepsRef.current.length) {
				rightStepRef.current = next;
				setRightStep(next);
				rightRef.current = setTimeout(tickRight, delay);
			} else {
				rightDoneRef.current = true;
				checkWinner();
			}
		};

		leftRef.current = setTimeout(tickLeft, delay);
		rightRef.current = setTimeout(tickRight, delay);

		return clearTimers;
	}, [isRacing, speed]);

	const leftFinished = raceStarted && leftStep >= leftSteps.length - 1 && leftSteps.length > 0;
	const rightFinished = raceStarted && rightStep >= rightSteps.length - 1 && rightSteps.length > 0;

	return (
		<div className="min-h-screen bg-slate-950 flex flex-col text-white">

			{/* Header */}
			<header className="flex items-center justify-between px-4 md:px-6 py-3 bg-slate-900 border-b border-slate-800 shrink-0">
				<div className="flex items-center gap-3">
					<div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
					<h1 className="text-base md:text-lg font-bold tracking-tight">Race Mode</h1>
					{winner && winner !== 'tie' && (
						<span className="text-xs px-2 py-0.5 rounded-full bg-yellow-400/15 text-yellow-300 border border-yellow-400/30 font-semibold">
							🏆 {getAlgorithmByName(winner === 'left' ? leftAlgo : rightAlgo)?.displayName} wins!
						</span>
					)}
					{winner === 'tie' && (
						<span className="text-xs px-2 py-0.5 rounded-full bg-indigo-400/15 text-indigo-300 border border-indigo-400/30 font-semibold">
							🤝 It's a tie!
						</span>
					)}
				</div>
				<button
					onClick={onExit}
					className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
				>
					← Back
				</button>
			</header>

			{/* Controls bar */}
			<div className="bg-slate-900/80 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center gap-4 shrink-0">

				{/* Algorithm pickers */}
				<div className="flex items-center gap-2">
					<select
						value={leftAlgo}
						disabled={isRacing}
						onChange={e => setLeftAlgo(e.target.value)}
						className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none disabled:opacity-50"
					>
						{algorithms.map(a => (
							<option key={a.name} value={a.name}>{a.displayName}</option>
						))}
					</select>
					<span className="text-slate-500 text-sm font-bold">vs</span>
					<select
						value={rightAlgo}
						disabled={isRacing}
						onChange={e => setRightAlgo(e.target.value)}
						className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none disabled:opacity-50"
					>
						{algorithms.map(a => (
							<option key={a.name} value={a.name}>{a.displayName}</option>
						))}
					</select>
				</div>

				{/* Array size */}
				<div className="flex items-center gap-2">
					<label className="text-xs text-slate-400 whitespace-nowrap">Size ({arraySize})</label>
					<input
						type="range" min="10" max={DEFAULT_CONFIG.MAX_ARRAY_SIZE} value={arraySize}
						disabled={isRacing}
						onChange={e => handleArraySizeChange(Number(e.target.value))}
						className="w-24 h-1.5 bg-slate-700 rounded-full appearance-none accent-indigo-500 disabled:opacity-40"
					/>
				</div>

				{/* Speed */}
				<div className="flex items-center gap-2">
					<label className="text-xs text-slate-400">Speed</label>
					<input
						type="range" min="1" max="100" value={speed}
						onChange={e => setSpeed(Number(e.target.value))}
						className="w-24 h-1.5 bg-slate-700 rounded-full appearance-none accent-indigo-500"
					/>
				</div>

				{/* Preset pills */}
				<div className="flex items-center gap-1.5">
					<label className="text-xs text-slate-400 whitespace-nowrap">Preset</label>
					{(['random', 'sorted', 'reversed', 'nearly-sorted'] as const).map(p => (
						<button key={p} disabled={isRacing} onClick={() => handlePresetChange(p)}
							className={`px-2.5 py-1 rounded-full text-xs font-semibold border transition-colors disabled:opacity-40
								${preset === p
									? 'bg-slate-600 border-slate-400 text-white'
									: 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
								}`}>
							{p === 'nearly-sorted' ? 'Nearly' : p.charAt(0).toUpperCase() + p.slice(1)}
						</button>
					))}
				</div>

				{/* Action buttons */}
				<div className="flex items-center gap-2 ml-auto">
					<button
						onClick={handleReset}
						disabled={isRacing}
						className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-sm font-semibold disabled:opacity-40 transition-colors"
					>
						↺ New Array
					</button>
					<button
						onClick={startRace}
						disabled={isRacing || leftAlgo === rightAlgo}
						className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-bold shadow-lg shadow-indigo-900/40 disabled:opacity-40 transition-colors"
					>
						{raceStarted && !isRacing ? '↺ Race Again' : '▶ Start Race'}
					</button>
				</div>
			</div>

			{leftAlgo === rightAlgo && (
				<div className="px-4 py-2 bg-amber-500/10 border-b border-amber-500/20 text-xs text-amber-400">
					⚠ Pick two different algorithms to race.
				</div>
			)}

			{/* Race lanes */}
			<div className="flex-1 flex gap-3 p-4 min-h-0">
				{!raceStarted ? (
					/* Pre-race idle state */
					<div className="flex-1 flex gap-3">
						{[{ name: leftAlgo, side: 'left' }, { name: rightAlgo, side: 'right' }].map(({ name, side }) => {
							const algo = getAlgorithmByName(name)!;
							return (
								<div key={side} className="flex-1 rounded-xl border border-slate-700/50 bg-slate-800/30 flex flex-col items-center justify-center gap-4 p-6">
									<div className="text-center">
										<p className="text-lg font-bold text-white">{algo.displayName}</p>
										<p className="text-xs text-slate-400 mt-1 max-w-xs">{algo.description}</p>
									</div>
									<div className="grid grid-cols-2 gap-2 w-full max-w-xs">
										<div className="bg-slate-800 rounded-lg p-2 text-center">
											<p className="text-xs text-slate-500">Avg</p>
											<p className="text-sm font-bold text-yellow-400 font-mono">{algo.timeComplexity.average}</p>
										</div>
										<div className="bg-slate-800 rounded-lg p-2 text-center">
											<p className="text-xs text-slate-500">Worst</p>
											<p className="text-sm font-bold text-red-400 font-mono">{algo.timeComplexity.worst}</p>
										</div>
									</div>
									<p className="text-xs text-slate-600 italic">Press Start Race ↑</p>
								</div>
							);
						})}
					</div>
				) : (
					<>
						<RaceLane
							algorithmName={leftAlgo}
							steps={leftSteps}
							currentStep={leftStep}
							isFinished={leftFinished}
							isWinner={winner === 'left'}
							showWinner={winner !== null}
						/>
						<RaceLane
							algorithmName={rightAlgo}
							steps={rightSteps}
							currentStep={rightStep}
							isFinished={rightFinished}
							isWinner={winner === 'right'}
							showWinner={winner !== null}
						/>
					</>
				)}
			</div>

			{/* Post-race stats */}
			{winner && (
				<div className="px-4 pb-4 shrink-0">
					<div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4">
						<p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Race results</p>
						<div className="grid grid-cols-2 gap-4">
							{[
								{ name: leftAlgo, steps: leftSteps, side: 'left' as const },
								{ name: rightAlgo, steps: rightSteps, side: 'right' as const },
							].map(({ name, steps: s, side }) => {
								const algo = getAlgorithmByName(name)!;
								const last = s[s.length - 1];
								const isW = winner === side;
								return (
									<div key={side} className={`rounded-lg p-3 ${isW ? 'bg-yellow-400/10 border border-yellow-400/20' : 'bg-slate-800'}`}>
										<p className={`text-sm font-bold mb-2 ${isW ? 'text-yellow-300' : 'text-white'}`}>
											{isW && '🏆 '}{algo.displayName}
										</p>
										<div className="flex gap-4 text-xs">
											<div>
												<p className="text-slate-500">Steps</p>
												<p className="font-bold text-white tabular-nums">{s.length.toLocaleString()}</p>
											</div>
											<div>
												<p className="text-slate-500">Comparisons</p>
												<p className="font-bold text-red-400 tabular-nums">{(last?.comparisons ?? 0).toLocaleString()}</p>
											</div>
											<div>
												<p className="text-slate-500">Swaps</p>
												<p className="font-bold text-amber-400 tabular-nums">{(last?.swaps ?? 0).toLocaleString()}</p>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
