type Props = {
	code: string;
}

export default function CodeDisplay({ code }: Props) {
	return (
		<div className="bg-gray-900 text-gray-100 rounded-x1 shadow-sm p-4">
			<h3 className="text-sm font-semibold mb-3 text-gray-300">
				Algorithm Code
			</h3>
			<pre className="text-xs overflow-auto max-h-90 leading-relaxed">
				<code>{code}</code>
			</pre>
		</div>
	);
}
