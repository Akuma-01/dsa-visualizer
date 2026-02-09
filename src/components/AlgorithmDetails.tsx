import type { Algorithm } from "../types";

type Props = {
	algorithm: Algorithm;
};

export default function AlgorithmDetails({ algorithm }: Props) {
	return (
		<div className="p-4 bg-gray-800 rounded-lg text-white">
			<h2 className="text-xl font-semibold mb-2">
				{algorithm.displayName}
			</h2>

			<p className="text-sm text-gray-300 mb-4">
				{algorithm.description}
			</p>

			<div className="space-y-3 text-sm">
				<div>
					<strong>Time Complexity</strong>
					<ul className="ml-4 list-disc text-gray-300">
						{algorithm.timeComplexity.best && (
							<li>Best: {algorithm.timeComplexity.best}</li>
						)}
						<li>Average: {algorithm.timeComplexity.average}</li>
						<li>Worst: {algorithm.timeComplexity.worst}</li>
					</ul>
				</div>

				<div>
					<strong>Space Complexity:</strong>{" "}
					<span className="text-gray-300">{algorithm.spaceComplexity}</span>
				</div>

				{algorithm.invariant &&
					<div>
						<strong>Invariant:</strong>
						<p className="text-gray-300">{algorithm.invariant}</p>
					</div>
				}

			</div>
		</div>
	);
}
