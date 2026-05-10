// src/SortingVisualizer.tsx

import React, { useEffect, useRef, useState } from 'react';
import { algorithms, getAlgorithmByName, getDefaultAlgorithm } from './algorithms';
import {
	AlgorithmDetails, CodeDisplay, ColorLegend,
	Controls, StepInfo, Visualization
} from './components';
import { DEFAULT_CONFIG } from './constants';
import { useSound } from './hooks/useSound';
import type { ArrayElement, PresetType, SortingStep } from './types';
import { calculateDelay, generateArray, generateRandomArray } from './utils';

interface Props {
	onEnterRace: () => void;
}

const SortingVisualizer: React.FC<Props> = ({ onEnterRace }) => {
	const [array, setArray] = useState<ArrayElement[]>(() =>
		generateRandomArray(DEFAULT_CONFIG.DEFAULT_ARRAY_SIZE)
	);
	const [arraySize, setArraySize] = useState<number>(DEFAULT_CONFIG.DEFAULT_ARRAY_SIZE);
	const [currentStep, setCurrentStep] = useState<number>(0);
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [speed, setSpeed] = useState<number>(DEFAULT_CONFIG.DEFAULT_SPEED);
	const [preset, setPreset] = useState<PresetType>('random');
	const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>(getDefaultAlgorithm().name);
	const [sortingSteps, setSortingSteps] = useState<SortingStep[]>([]);
	const [soundEnabled, setSoundEnabled] = useState(true);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const { playTone } = useSound(soundEnabled);

	const currentAlgorithm = getAlgorithmByName(selectedAlgorithm) || getDefaultAlgorithm();

	const handleReset = () => {
		setArray(generateArray(arraySize, preset));
		setCurrentStep(0); setIsPlaying(false); setSortingSteps([]);
	};

	const handleArraySizeChange = (size: number) => {
		setArraySize(size);
		setArray(generateArray(size, preset));
		setCurrentStep(0); setIsPlaying(false); setSortingSteps([]);
	};

	const handlePresetChange = (p: PresetType) => {
		setPreset(p);
		setArray(generateArray(arraySize, p));
		setCurrentStep(0); setIsPlaying(false); setSortingSteps([]);
	};

	const startSorting = () => {
		const steps = currentAlgorithm.sortFunction(array);
		setSortingSteps(steps); setCurrentStep(0); setIsPlaying(true);
	};

	useEffect(() => {
		if (isPlaying && sortingSteps.length > 0) {
			if (currentStep < sortingSteps.length - 1) {
				timeoutRef.current = setTimeout(() => setCurrentStep(p => p + 1), calculateDelay(speed));
			} else {
				timeoutRef.current = setTimeout(() => setIsPlaying(false), 0);
			}
		}
		return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
	}, [isPlaying, currentStep, sortingSteps, speed]);

	useEffect(() => {
		if (
			sortingSteps.length === 0 ||
			currentStep >= sortingSteps.length
		) {
			return;
		}

		const currentArray = sortingSteps[currentStep].main;

		if (!currentArray.length) return;

		const activeEl =
			currentArray.find(
				el => el.color === '#ef4444' || el.color === '#f59e0b'
			) ?? currentArray[Math.floor(currentArray.length / 2)];

		const values = currentArray.map(el => el.value);

		const min = Math.min(...values);
		const max = Math.max(...values);

		playTone(activeEl.value, min, max);
		setArray(currentArray);

	}, [currentStep, sortingSteps, playTone]);

	const handleAlgorithmChange = (name: string) => {
		setSelectedAlgorithm(name); setSortingSteps([]); setCurrentStep(0); setIsPlaying(false);
	};

	const handlePlayPause = () => {
		if (sortingSteps.length === 0) startSorting();
		else setIsPlaying(!isPlaying);
	};

	const handlePrevStep = () => {
		if (currentStep > 0) { setCurrentStep(p => p - 1); setIsPlaying(false); }
	};

	const handleNextStep = () => {
		if (sortingSteps.length === 0) startSorting();
		else if (currentStep < sortingSteps.length - 1) { setCurrentStep(p => p + 1); setIsPlaying(false); }
	};

	const step = sortingSteps[currentStep];

	/* ─────────────────────────── shared sub-sections ─────────────────────────── */

	// slim step-info / counter bar — reused on both breakpoints
	const StepBar = (
		<StepInfo
			description={step?.description}
			operation={step?.operation}
			comparisons={step?.comparisons}
			swaps={step?.swaps}
			currentStep={currentStep}
			totalSteps={sortingSteps.length}
		/>
	);

	// right-panel — two separate cards
	const RightPanel = (
		<div className="flex flex-col gap-3 h-full">
			<div className="bg-slate-800/50 border border-slate-700/50 rounded-xl shrink-0">
				<AlgorithmDetails algorithm={currentAlgorithm} />
			</div>
			<div className="bg-slate-800/50 border border-slate-700/50 rounded-xl flex-1 min-h-0 overflow-y-auto">
				<CodeDisplay code={currentAlgorithm.code} activeLine={step?.line} />
			</div>
		</div>
	);

	/* ─────────────────────────────── render ──────────────────────────────────── */
	return (
		<div className="min-h-screen bg-slate-950 flex flex-col text-white">

			{/* ── Header ── */}
			<header className="flex items-center justify-between px-4 md:px-6 py-3 bg-slate-900 border-b border-slate-800 shrink-0">
				<div className="flex items-center gap-2">
					<div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
					<h1 className="text-base md:text-lg font-bold tracking-tight">DSA Visualizer</h1>
				</div>
				<div className="flex items-center gap-3">
					{/* legend — desktop only */}
					<div className="hidden md:block">
						<ColorLegend />
					</div>
					<button
						onClick={onEnterRace}
						className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-yellow-400/10 hover:bg-yellow-400/20 border border-yellow-400/30 text-yellow-300 text-xs font-semibold transition-colors"
					>
						🏁 Race Mode
					</button>
					<button
						onClick={() => setSoundEnabled(s => !s)}
						className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${soundEnabled
							? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/20'
							: 'bg-slate-800 border-slate-700 text-slate-500 hover:bg-slate-700'
							}`}
						title={soundEnabled ? 'Mute sound' : 'Enable sound'}
					>
						{soundEnabled ? '🔊' : '🔇'}
					</button>
				</div>
			</header>

			{/* ══════════════ DESKTOP (lg+): 3-column fixed layout ══════════════ */}
			<div className="hidden lg:flex flex-1 min-h-0 p-4 gap-3">

				{/* LEFT — Controls */}
				<aside className="w-56 shrink-0 bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-y-auto p-4">
					<Controls
						algorithm={selectedAlgorithm} arraySize={arraySize} speed={speed}
						currentStep={currentStep} totalSteps={sortingSteps.length} isPlaying={isPlaying}
						preset={preset}
						onAlgorithmChange={handleAlgorithmChange} onArraySizeChange={handleArraySizeChange}
						onSpeedChange={setSpeed} onPresetChange={handlePresetChange} onReset={handleReset}
						onPlayPause={handlePlayPause}
						onPrevStep={handlePrevStep} onNextStep={handleNextStep}
						availableAlgorithms={algorithms}
					/>
				</aside>

				{/* CENTER — bars + step info */}
				<main className="flex-1 flex flex-col min-w-0 min-h-0 gap-3">
					{StepBar}
					<Visualization array={array} aux={step?.aux} />
				</main>

				{/* RIGHT — algo info / code */}
				<aside className="w-64 shrink-0 flex flex-col min-h-0">
					{RightPanel}
				</aside>
			</div>

			{/* ══════════════ MOBILE (below lg): stacked layout ══════════════ */}
			<div className="flex flex-col flex-1 lg:hidden">

				{/* Mobile controls */}
				<div className="bg-slate-900 border-b border-slate-800 p-3 flex flex-col gap-3 shrink-0">

					{/* row 1: algorithm picker + reset */}
					<div className="flex gap-2">
						<select value={selectedAlgorithm} onChange={e => handleAlgorithmChange(e.target.value)}
							className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none">
							{algorithms.map(a => (
								<option key={a.name} value={a.name}>{a.displayName}</option>
							))}
						</select>
						<button onClick={handleReset} disabled={isPlaying}
							className="px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-sm font-semibold disabled:opacity-40">
							↺
						</button>
					</div>

					{/* row 2: playback */}
					<div className="flex items-center gap-2">
						<button onClick={handlePrevStep} disabled={currentStep === 0}
							className="px-4 py-2 rounded-lg bg-slate-800 text-sm font-bold disabled:opacity-30">◀</button>
						<button onClick={handlePlayPause}
							className="flex-1 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-bold shadow-lg shadow-indigo-900/40">
							{isPlaying ? '⏸ Pause' : '▶ Play'}
						</button>
						<button onClick={handleNextStep}
							disabled={sortingSteps.length > 0 && currentStep >= sortingSteps.length - 1}
							className="px-4 py-2 rounded-lg bg-slate-800 text-sm font-bold disabled:opacity-30">▶</button>
					</div>

					{/* row 3: sliders */}
					<div className="grid grid-cols-2 gap-3">
						<div>
							<label className="text-xs text-slate-400 mb-1 block">Size ({arraySize})</label>
							<input type="range" min="5" max="60" value={arraySize} disabled={isPlaying}
								onChange={e => handleArraySizeChange(Number(e.target.value))}
								className="w-full h-1.5 bg-slate-700 rounded-full appearance-none accent-indigo-500 disabled:opacity-40" />
						</div>
						<div>
							<label className="text-xs text-slate-400 mb-1 block">Speed</label>
							<input type="range" min="1" max="100" value={speed}
								onChange={e => setSpeed(Number(e.target.value))}
								className="w-full h-1.5 bg-slate-700 rounded-full appearance-none accent-indigo-500" />
						</div>
					</div>

					{/* row 4: preset pills */}
					<div>
						<label className="text-xs text-slate-400 mb-1.5 block">Input preset</label>
						<div className="flex gap-1.5 flex-wrap">
							{(['random', 'sorted', 'reversed', 'nearly-sorted'] as const).map(p => (
								<button key={p} disabled={isPlaying} onClick={() => handlePresetChange(p)}
									className={`px-2.5 py-1 rounded-full text-xs font-semibold border transition-colors disabled:opacity-40
										${preset === p
											? 'bg-slate-600 border-slate-400 text-white'
											: 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
										}`}>
									{p === 'nearly-sorted' ? 'Nearly' : p.charAt(0).toUpperCase() + p.slice(1)}
								</button>
							))}
						</div>
					</div>
				</div>

				{/* Mobile StepInfo */}
				<div className="p-3 shrink-0">
					{StepBar}
				</div>

				{/* Mobile bars */}
				<div className="px-3 shrink-0">
					<Visualization array={array} aux={step?.aux} />
				</div>

				{/* Mobile color legend */}
				<div className="px-3 py-2 shrink-0">
					<ColorLegend />
				</div>

				{/* Mobile bottom panel — both stacked */}
				<div className="bg-slate-900 border-t border-slate-800 flex flex-col">
					{RightPanel}
				</div>
			</div>
		</div>
	);
};

export default SortingVisualizer;
