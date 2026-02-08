import type { ArrayElement } from "../types";

type Props = {
	array: ArrayElement[];
}

export default function Visualization({ array }: Props) {
	const maxValue = array.length > 0 ? Math.max(...array.map(el => el.value)) : 1;

	const barWidth = array.length > 0 ? Math.min(Math.max(100 / array.length - 2, 4), 40) : 8;

	return (
		<div className="lg:col-span-6 bg-white rounded-xl shadow-sm p-8">
			<div className="h-96 flex items-end justify-center gap-1">
				{array.map((element, idx) => (
					<div
						key={idx}
						className="transition-all duration-300 ease-out rounded-t"
						style={{
							width: `${barWidth}px`,
							height: `${(element.value / maxValue) * 100}%`,
							backgroundColor: element.color,
							minHeight: "20px",
						}}
					/>
				))}
			</div>
		</div>
	)
}
