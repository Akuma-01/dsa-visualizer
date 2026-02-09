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
		<div className="space-y-6 bg-white p-6 rounded-x1 shadow-sm border border-gray-200">
			{/* Algo */}
			<div>
				<label className="block text-sm font-medium mb-2 text-gray-900">
					Algorithm
				</label>
				<select
					value={algorithm}
					onChange={(e) => onAlgorithmChange(e.target.value)}
					className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
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
				<label className="block text-sm font-semibold text-gray-900 mb-2">
					Array Size ({arraySize})
				</label>
				<input
					type="range"
					min="5"
					max="100"
					value={arraySize}
					disabled={isPlaying}
					onChange={(e) => onArraySizeChange(Number(e.target.value))}
					className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
				/>
			</div>

			{/* Reset */}
			<button
				onClick={onReset}
				disabled={isPlaying}
				className="w-full bg-slate-700 hover:bg-slate-800 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
			>
				Reset & Generate
			</button>

			{/* Playback Controls */}
			<div className="space-y-3">
				<div className="flex justify-center items-center gap-2">
					<button
						onClick={onPrevStep}
						disabled={currentStep === 0}
						className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg flex items-center justify-center min-w-11 font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
						title="Previous Step"
					>
						◀
					</button>

					<button
						onClick={onPlayPause}
						className="px-8 py-2.5 bg-slate-700 hover:bg-slate-800 text-white rounded-lg font-semibold transition-colors shadow-sm min-w-25"
					>
						{isPlaying ? "Pause" : "Play"}
					</button>

					<button
						onClick={onNextStep}
						disabled={totalSteps === 0 || currentStep >= totalSteps - 1}
						className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg flex items-center justify-center min-w-11 font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
						title="Next Step"
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
				<label className="block text-sm font-semibold text-gray-900 mb-2">
					Speed
				</label>
				<input
					type="range"
					min="1"
					max="100"
					value={speed}
					onChange={(e) => onSpeedChange(Number(e.target.value))}
					className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
				/>
			</div>


		</div>
	);
}
