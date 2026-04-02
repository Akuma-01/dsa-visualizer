import type { ControlsProps } from "../types";

export default function Controls({
	algorithm, arraySize, speed, currentStep,
	totalSteps, isPlaying,
	onAlgorithmChange, onArraySizeChange,
	onSpeedChange, onReset,
	onPlayPause, onPrevStep, onNextStep,
	availableAlgorithms,
}: ControlsProps) {
	return (
		<div className="flex flex-col gap-4">

			{/* Algorithm */}
			<div>
				<label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
					Algorithm
				</label>
				<select
					value={algorithm}
					onChange={(e) => onAlgorithmChange(e.target.value)}
					className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
				>
					{availableAlgorithms.map(a => (
						<option key={a.name} value={a.name}>{a.displayName}</option>
					))}
				</select>
			</div>

			{/* Array size */}
			<div>
				<label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
					Array Size <span className="text-indigo-400">({arraySize})</span>
				</label>
				<input
					type="range" min="5" max="80" value={arraySize}
					disabled={isPlaying}
					onChange={(e) => onArraySizeChange(Number(e.target.value))}
					className="w-full h-1.5 bg-slate-700 rounded-full appearance-none cursor-pointer disabled:opacity-40 accent-indigo-500"
				/>
			</div>

			{/* Speed */}
			<div>
				<label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
					Speed
				</label>
				<input
					type="range" min="1" max="100" value={speed}
					onChange={(e) => onSpeedChange(Number(e.target.value))}
					className="w-full h-1.5 bg-slate-700 rounded-full appearance-none cursor-pointer accent-indigo-500"
				/>
			</div>

			{/* Reset */}
			<button
				onClick={onReset}
				disabled={isPlaying}
				className="w-full py-2 px-4 rounded-lg text-sm font-semibold bg-slate-700 hover:bg-slate-600 text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
			>
				↺ Reset & Generate
			</button>

			{/* Playback */}
			<div className="flex items-center gap-1.5">
				<button
					onClick={onPrevStep}
					disabled={currentStep === 0}
					className="flex-1 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-bold transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
				>◀</button>

				<button
					onClick={onPlayPause}
					className="flex-2 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition-colors shadow-lg shadow-indigo-900/40"
				>
					{isPlaying ? "⏸ Pause" : "▶ Play"}
				</button>

				<button
					onClick={onNextStep}
					disabled={totalSteps > 0 && currentStep >= totalSteps - 1}
					className="flex-1 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-bold transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
				>▶</button>
			</div>

			<p className="text-center text-xs text-slate-500 tabular-nums -mt-2">
				{totalSteps ? `Step ${currentStep + 1} of ${totalSteps}` : "Step 0 of 0"}
			</p>
		</div>
	);
}
