import type { ControlsProps } from "../types";

export default function Controls({
	algorithm, arraySize,
	speed, currentStep,
	totalSteps, isPlaying,
	onAlgorithmChange, onArraySizeChange,
	onSpeedChange, onReset,
	onPlayPause, onPrevStep,
	onNextStep, availableAlgorithms,
}: ControlsProps) {
	return (
		<div className="space-y-6 bg-white p-6 rounded-x1 shadow-sm">
			{/* Algo */}
			<div>
				<label className="block text-sm font-medium mb-2">
					Algorithm
				</label>
				<select
					value={algorithm}
					onChange={(e) => onAlgorithmChange(e.target.value)}
					className="w-full px-3 py-2 border rounded-lg"
				>
					{availableAlgorithms.map(a => (
						<option key={a.name} value={a.name}>
							{a.displayName}
						</option>
					))}
				</select>
			</div>

			{/*Array size*/}
			<div>
				<label className="block text-sm font-medium mb-2">
					Array Size ({arraySize})
				</label>
				<input
					type="range"
					min="5"
					max="100"
					value={arraySize}
					disabled={isPlaying}
					onChange={(e) => onArraySizeChange(Number(e.target.value))}
					className="w-full"
				/>
			</div>

			{/* Reset */}
			<button
				onClick={onReset}
				disabled={isPlaying}
				className="w-full bg-slate-700 text-white py-2 rounded-lg disabled:bg-gray-400"
			>
				Reset & Generate
			</button>

			{/* Exeution */}
			<div className="space-y-3">
				<div className="flex justify-center gap-3">
					<button
						onClick={onPrevStep}
						disabled={currentStep === 0}
						className="px-3 py-2 bg-gray-200 rounded"
					>
						◀
					</button>

					<button
						onClick={onPlayPause}
						className="px-4 py-2 bg-slate-700 text-white rounded"
					>
						{isPlaying ? "Pause" : "Play"}
					</button>

					<button
						onClick={onNextStep}
						disabled={totalSteps === 0 || currentStep >= totalSteps - 1}
						className="px-3 py-2 bg-gray-200 rounded"
					>
						▶
					</button>
				</div>

				<div className="text-center text-sm text-gray-600">
					Step {totalSteps ? currentStep + 1 : 0} of {totalSteps}
				</div>
			</div>

			{/* speed */}
			<div>
				<label className="block text-sm font-medium mb-2">
					Speed
				</label>
				<input
					type="range"
					min="1"
					max="100"
					value={speed}
					onChange={(e) => onSpeedChange(Number(e.target.value))}
					className="w-full"
				/>
			</div>


		</div>
	);
}
