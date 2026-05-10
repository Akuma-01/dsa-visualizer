import { COLORS } from '../constants';
import type { ArrayElement, AuxState } from '../types';

// Mini bar chart used for both the main array and aux sub-arrays
function BarChart({
	array,
	activeIndices = [],
	label,
	dim = false,
}: {
	array: ArrayElement[];
	activeIndices?: number[];
	label?: string;
	dim?: boolean;
}) {
	const maxValue = array.length > 0 ? Math.max(...array.map(el => el.value)) : 1;
	return (
		<div className={`flex flex-col gap-1 flex-1 min-w-0 transition-opacity ${dim ? 'opacity-40' : 'opacity-100'}`}>
			{label && (
				<p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest text-center">{label}</p>
			)}
			<div className="flex-1 flex items-end justify-center gap-px min-h-0">
				{array.map((el, idx) => {
					const isActive = activeIndices.includes(idx);
					return (
						<div
							key={idx}
							className="rounded-t transition-all duration-150"
							style={{
								flex: 1,
								height: `${(el.value / maxValue) * 100}%`,
								backgroundColor: isActive ? COLORS.COMPARING : el.color,
								minHeight: '3px',
								outline: isActive ? `1.5px solid ${COLORS.COMPARING}` : 'none',
							}}
						/>
					);
				})}
			</div>
		</div>
	);
}

type Props = {
	array: ArrayElement[];
	aux?: AuxState;
};

export default function Visualization({ array, aux }: Props) {
	const maxValue = array.length > 0 ? Math.max(...array.map(el => el.value)) : 1;
	const barWidth = array.length > 0 ? Math.min(Math.max(100 / array.length - 2, 4), 40) : 8;
	const hasAux = aux && (aux.left?.length || aux.right?.length);

	return (
		<div className="flex-1 bg-slate-800/50 rounded-xl border border-slate-700/50 px-4 pt-3 pb-3 w-full min-h-0 flex flex-col gap-2">

			{/* Main array bars */}
			<div className="flex items-end justify-center gap-1" style={{ flex: hasAux ? '0 0 60%' : '1 1 0' }}>
				{array.map((element, idx) => (
					<div
						key={idx}
						className="transition-all duration-300 ease-out rounded-t"
						style={{
							width: `${barWidth}px`,
							height: `${(element.value / maxValue) * 100}%`,
							backgroundColor: element.color,
							minHeight: '4px',
						}}
					/>
				))}
			</div>

			{/* Aux panel — only shown during merge sort when aux data is present */}
			{hasAux && (
				<div className="flex flex-col gap-1" style={{ flex: '0 0 36%' }}>
					<div className="border-t border-slate-700/60 pt-2 flex flex-col h-full gap-1">
						<p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold text-center shrink-0">
							Merge buffers
						</p>
						<div className="flex gap-3 flex-1 min-h-0">
							{aux.left && aux.left.length > 0 && (
								<BarChart
									array={aux.left}
									activeIndices={aux.leftActive !== undefined ? [aux.leftActive] : []}
									label="Left"
								/>
							)}
							{/* Write pointer indicator */}
							{aux.writeIndex !== undefined && (
								<div className="flex flex-col items-center justify-center gap-1 shrink-0">
									<div className="w-px h-full bg-slate-600" />
									<span className="text-[9px] text-slate-500 tabular-nums">→{aux.writeIndex}</span>
								</div>
							)}
							{aux.right && aux.right.length > 0 && (
								<BarChart
									array={aux.right}
									activeIndices={aux.rightActive !== undefined ? [aux.rightActive] : []}
									label="Right"
								/>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
