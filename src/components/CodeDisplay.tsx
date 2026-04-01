type Props = { code: string; activeLine?: number };

export default function CodeDisplay({ code, activeLine }: Props) {
	const lines = code.split("\n");
	return (
		<div className="p-4 flex flex-col gap-2 flex-1">
			<p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Pseudocode</p>
			<div className="overflow-auto flex-1">
				<pre className="text-xs font-mono">
					{lines.map((line, i) => (
						<div
							key={i}
							className={`px-2 py-0.5 rounded transition-colors ${i === activeLine
									? "bg-yellow-400/15 border-l-2 border-yellow-400 text-yellow-200"
									: "text-slate-400"
								}`}
						>
							{line || " "}
						</div>
					))}
				</pre>
			</div>
		</div>
	);
}
