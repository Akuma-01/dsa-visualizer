import type { Algorithm } from "../types";

type Props = { algorithm: Algorithm };

export default function AlgorithmDetails({ algorithm }: Props) {
	return (
		<div className="p-4 flex flex-col gap-3">
			<div>
				<h2 className="text-sm font-bold text-white">{algorithm.displayName}</h2>
				<p className="text-xs text-slate-400 mt-1 leading-relaxed">{algorithm.description}</p>
			</div>

			<div>
				<p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5">Complexity</p>
				<div className="grid grid-cols-2 gap-1.5">
					{algorithm.timeComplexity.best && (
						<div className="bg-slate-800 rounded-lg px-2.5 py-1.5">
							<p className="text-xs text-slate-500">Best</p>
							<p className="text-xs font-bold text-green-400 font-mono">{algorithm.timeComplexity.best}</p>
						</div>
					)}
					<div className="bg-slate-800 rounded-lg px-2.5 py-1.5">
						<p className="text-xs text-slate-500">Average</p>
						<p className="text-xs font-bold text-yellow-400 font-mono">{algorithm.timeComplexity.average}</p>
					</div>
					<div className="bg-slate-800 rounded-lg px-2.5 py-1.5">
						<p className="text-xs text-slate-500">Worst</p>
						<p className="text-xs font-bold text-red-400 font-mono">{algorithm.timeComplexity.worst}</p>
					</div>
					<div className="bg-slate-800 rounded-lg px-2.5 py-1.5">
						<p className="text-xs text-slate-500">Space</p>
						<p className="text-xs font-bold text-blue-400 font-mono">{algorithm.spaceComplexity}</p>
					</div>
				</div>
			</div>

			{algorithm.invariant && (
				<div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg px-3 py-2">
					<p className="text-xs font-semibold text-indigo-400 mb-0.5">Invariant</p>
					<p className="text-xs text-slate-400 leading-relaxed">{algorithm.invariant}</p>
				</div>
			)}
		</div>
	);
}
