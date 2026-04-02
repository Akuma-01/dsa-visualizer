import { COLORS } from "../constants";

const LEGEND_ITEMS = [
	{ color: COLORS.UNSORTED, label: "Unsorted" },
	{ color: COLORS.COMPARING, label: "Comparing" },
	{ color: COLORS.SWAPPING, label: "Swapping" },
	{ color: COLORS.SORTED, label: "Sorted" },
	{ color: COLORS.PIVOT, label: "Pivot" },
	{ color: COLORS.SELECTED, label: "Selected" },
	{ color: COLORS.WRITING, label: "Writing" },
	{ color: COLORS.MERGED, label: "Merged" },
] as const;

export default function ColorLegend() {
	return (
		<div className="flex items-center gap-4 flex-wrap">
			{LEGEND_ITEMS.map(({ color, label }) => (
				<div key={label} className="flex items-center gap-1.5">
					<span
						className="w-2.5 h-2.5 rounded-sm shrink-0"
						style={{ backgroundColor: color }}
					/>
					<span className="text-xs text-slate-400">{label}</span>
				</div>
			))}
		</div>
	);
}
