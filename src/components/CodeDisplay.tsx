type Props = {
	code: string;
	activeLine?: number;
};

export default function CodeDisplay({ code, activeLine }: Props) {
	const lines = code.split("\n");

	return (
		<div className="bg-slate-900 rounded-xl p-4 max-h-105 overflow-auto">
			<pre className="text-sm font-mono text-slate-100">
				{lines.map((line, i) => (
					<div
						key={i}
						className={`px-2 py-1 rounded ${i === activeLine
							? "bg-yellow-500/20 border-l-4 border-yellow-400"
							: ""
							}`}
					>
						{line}
					</div>
				))}
			</pre>
		</div>
	);
}
