type Props = {
	description?: string;
	operation?: string;
	comparisons?: number;
	swaps?: number;
	currentStep: number;
	totalSteps: number;
};

const OPERATION_COLORS: Record<string, string> = {
	COMPARE: "bg-red-100 text-red-700 border border-red-200",
	SWAP: "bg-amber-100 text-amber-700 border border-amber-200",
	SWAP_DONE: "bg-amber-100 text-amber-700 border border-amber-200",
	SORTED: "bg-green-100 text-green-700 border border-green-200",
	PIVOT: "bg-purple-100 text-purple-700 border border-purple-200",
	PIVOT_PLACED: "bg-green-100 text-green-700 border border-green-200",
	PIVOT_SWAP: "bg-amber-100 text-amber-700 border border-amber-200",
	MERGE_DONE: "bg-emerald-100 text-emerald-700 border border-emerald-200",
	WRITE: "bg-yellow-100 text-yellow-700 border border-yellow-200",
	DONE: "bg-green-100 text-green-700 border border-green-200",
	START: "bg-blue-100 text-blue-700 border border-blue-200",
	PASS_DONE: "bg-indigo-100 text-indigo-700 border border-indigo-200",
	INSERT: "bg-teal-100 text-teal-700 border border-teal-200",
	SHIFT: "bg-orange-100 text-orange-700 border border-orange-200",
};

function opColor(op?: string) {
	if (!op) return "bg-indigo-100 text-indigo-700 border border-indigo-200";
	return OPERATION_COLORS[op] ?? "bg-indigo-100 text-indigo-700 border border-indigo-200";
}

export default function StepInfo({ description, operation, comparisons, swaps, currentStep, totalSteps }: Props) {
	const progress = totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0;

	return (
		<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-3">
			{/* Operation badge + progress */}
			<div className="flex items-center justify-between gap-3">
				<span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${opColor(operation)}`}>
					{operation ?? "IDLE"}
				</span>
				<span className="text-xs text-gray-400 tabular-nums">
					Step {totalSteps ? currentStep + 1 : 0} / {totalSteps}
				</span>
			</div>

			{/* Progress bar */}
			<div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
				<div
					className="h-full bg-indigo-500 rounded-full transition-all duration-300"
					style={{ width: `${progress}%` }}
				/>
			</div>

			{/* Description */}
			<p className="text-sm text-gray-700 min-h-10 leading-relaxed">
				{description ?? "Press Play or Next Step to begin."}
			</p>

			{/* Counters */}
			<div className="grid grid-cols-2 gap-2 pt-1">
				<div className="bg-red-50 rounded-lg px-3 py-2 text-center">
					<p className="text-xs text-red-400 font-medium uppercase tracking-wide">Comparisons</p>
					<p className="text-2xl font-bold text-red-600 tabular-nums">{comparisons ?? 0}</p>
				</div>
				<div className="bg-amber-50 rounded-lg px-3 py-2 text-center">
					<p className="text-xs text-amber-400 font-medium uppercase tracking-wide">Swaps / Writes</p>
					<p className="text-2xl font-bold text-amber-600 tabular-nums">{swaps ?? 0}</p>
				</div>
			</div>
		</div>
	);
}
