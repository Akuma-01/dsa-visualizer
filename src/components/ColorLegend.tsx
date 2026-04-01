import { COLORS } from "../constants";

const LEGEND_ITEMS = [
	{ color: COLORS.UNSORTED, label: "Unsorted", desc: "Default state" },
	{ color: COLORS.COMPARING, label: "Comparing", desc: "Being compared" },
	{ color: COLORS.SWAPPING, label: "Swapping", desc: "Swap in progress" },
	{ color: COLORS.SORTED, label: "Sorted", desc: "Final position" },
	{ color: COLORS.PIVOT, label: "Pivot", desc: "Quick sort pivot" },
	{ color: COLORS.SELECTED, label: "Selected", desc: "Active / key element" },
	{ color: COLORS.WRITING, label: "Writing", desc: "Being written to array" },
	{ color: COLORS.MERGED, label: "Merged", desc: "Merge sort result" },
] as const;

export default function ColorLegend() {
	return (
		<div className="bg-white rounded-xl shadow-sm border border-gray-100 px-4 py-3">
			<p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
				Color Legend
			</p>
			<div className="grid grid-cols-2 gap-x-4 gap-y-2">
				{LEGEND_ITEMS.map(({ color, label, desc }) => (
					<div key={label} className="flex items-center gap-2 min-w-0">
						<span
							className="shrink-0 w-3 h-3 rounded-sm shadow-sm"
							style={{ backgroundColor: color }}
						/>
						<div className="min-w-0">
							<span className="text-xs font-semibold text-gray-700">{label}</span>
							<span className="text-xs text-gray-400 ml-1 hidden sm:inline">— {desc}</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
