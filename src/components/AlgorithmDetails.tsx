import { ALGORITHM_INFO } from "../constants";

type Props = {
	algorithm: keyof typeof ALGORITHM_INFO;
};

export default function AlgorithmDetails({ algorithm }: Props) {
	const info = ALGORITHM_INFO[algorithm];

	if (!info) return null;

	return (
		<div className="p-4 bg-gray-800 rounded-lg text-white">
			<h2 className="text-xl font-semibold mb-2">{info.name}</h2>

			<p className="text-sm text-gray-300 mb-4">
				{info.description}
			</p>

			<div className="space-y-2 text-sm">
				<div>
					<strong>Time Complexity</strong>
					<ul className="ml-4 list-disc text-gray-300">
						<li>Best: {info.time.best}</li>
						<li>Average: {info.time.average}</li>
						<li>Worst: {info.time.worst}</li>
					</ul>
				</div>

				<div>
					<strong>Space Complexity:</strong>{" "}
					<span className="text-gray-300">{info.space}</span>
				</div>

				<div>
					<strong>Invariant:</strong>
					<p className="text-gray-300">{info.invariant}</p>
				</div>
			</div>
		</div>
	);
}
