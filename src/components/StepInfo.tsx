type Props = {
	description?: string;
	operation?: string;
	comparisons?: number;
	swaps?: number;
	currentStep: number;
	totalSteps: number;
};

const OPERATION_COLORS: Record<string, string> = {
	COMPARE: "bg-red-500/20 text-red-300 border-red-500/30",
	SWAP: "bg-amber-500/20 text-amber-300 border-amber-500/30",
	SWAP_DONE: "bg-amber-500/20 text-amber-300 border-amber-500/30",
	PIVOT: "bg-purple-500/20 text-purple-300 border-purple-500/30",
	PIVOT_PLACED: "bg-green-500/20 text-green-300 border-green-500/30",
	PIVOT_SWAP: "bg-amber-500/20 text-amber-300 border-amber-500/30",
	MERGE_DONE: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
	WRITE: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
	DONE: "bg-green-500/20 text-green-300 border-green-500/30",
	START: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
	PASS_DONE: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
	INSERT: "bg-teal-500/20 text-teal-300 border-teal-500/30",
	SHIFT: "bg-orange-500/20 text-orange-300 border-orange-500/30",
};

function opColor(op?: string) {
	return OPERATION_COLORS[op ?? ''] ?? "bg-indigo-500/20 text-indigo-300 border-indigo-500/30";
}

export default function StepInfo({ description, operation, comparisons, swaps, currentStep, totalSteps }: Props) {
	const progress = totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0;

	return (
		<div className="bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-2.5 flex flex-col gap-2">
			{/* row 1: badge + description + step count */}
			<div className="flex items-center gap-2.5">
				<span className={`shrink-0 text-xs font-bold px-2 py-0.5 rounded border ${opColor(operation)}`}>
					{operation ?? "IDLE"}
				</span>
				<p className="text-xs text-slate-400 flex-1 truncate">
					{description ?? "Press Play or Next Step to begin."}
				</p>
				<span className="shrink-0 text-xs text-slate-500 tabular-nums">
					{totalSteps ? `${currentStep + 1} / ${totalSteps}` : "0 / 0"}
				</span>
			</div>

			{/* row 2: progress + counters */}
			<div className="flex items-center gap-3">
				{/* progress bar */}
				<div className="flex-1 h-1 bg-slate-700 rounded-full overflow-hidden">
					<div className="h-full bg-indigo-500 rounded-full transition-all duration-200"
						style={{ width: `${progress}%` }} />
				</div>

				{/* counters — compact */}
				<div className="flex items-center gap-3 shrink-0">
					<span className="text-xs text-slate-500">
						Cmp <span className="font-bold text-red-400 tabular-nums">{comparisons ?? 0}</span>
					</span>
					<span className="text-xs text-slate-500">
						Swp <span className="font-bold text-amber-400 tabular-nums">{swaps ?? 0}</span>
					</span>
				</div>
			</div>
		</div>
	);
}
