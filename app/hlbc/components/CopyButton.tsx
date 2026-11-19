"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

/** Copies `value` to the clipboard and briefly confirms it. */
const CopyButton = ({ value, label }: { value: string; label: string }) => {
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		if (!copied) return;
		const t = setTimeout(() => setCopied(false), 2000);
		return () => clearTimeout(t);
	}, [copied]);

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(value);
			setCopied(true);
		} catch (err) {
			// Clipboard access can be blocked (e.g. insecure context); the
			// reference is still visible to copy by hand.
			console.error("Copy failed:", err);
		}
	};

	return (
		<button
			type="button"
			onClick={copy}
			aria-label={copied ? `${label} copied` : `Copy ${label}`}
			title={copied ? "Copied" : "Copy"}
			className="inline-flex flex-none cursor-pointer items-center gap-1.5 rounded-lg border-none bg-white px-2.5 py-1.5 text-[13px] font-bold text-haiven-blue transition-colors hover:bg-[#E8EBF5]"
		>
			{copied ? (
				<Check aria-hidden="true" className="h-4 w-4 text-[#00873A]" strokeWidth={2.5} />
			) : (
				<Copy aria-hidden="true" className="h-4 w-4" strokeWidth={2.2} />
			)}
			<span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
		</button>
	);
};

export default CopyButton;
