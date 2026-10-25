"use client";

import { Link2, X } from "lucide-react";
import { useRef, useState } from "react";

const circle =
	"flex size-10 items-center justify-center rounded-full border border-[#D5DAE6] bg-white text-[#1B2E6B] hover:bg-[#E8EBF5] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#1A4B8C]";

export default function ShareRole({ url, title }: { url: string; title: string }) {
	const [copied, setCopied] = useState(false);
	const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
	const enc = encodeURIComponent;

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(url);
		} catch {
			// Clipboard can be blocked; the label still confirms the attempt.
		}
		setCopied(true);
		clearTimeout(timer.current);
		timer.current = setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="mt-[22px] flex flex-wrap items-center justify-between gap-3 border-t border-[#EEF0F5] pt-[18px]">
			<span className="text-sm font-semibold text-[#4A5168]" aria-live="polite">
				{copied ? "Link copied" : "Share this role"}
			</span>
			<div className="flex gap-2">
				<button type="button" onClick={copy} aria-label="Copy link" className={`${circle} cursor-pointer`}>
					<Link2 size={18} strokeWidth={2} />
				</button>
				<a
					href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`}
					target="_blank"
					rel="noopener"
					aria-label="Share on LinkedIn"
					className={`${circle} text-sm font-extrabold`}
				>
					in
				</a>
				<a
					href={`https://wa.me/?text=${enc(`${title} at Haiven: ${url}`)}`}
					target="_blank"
					rel="noopener"
					aria-label="Share on WhatsApp"
					className={circle}
				>
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" aria-hidden="true">
						<path d="M4 20l1.3-4A8 8 0 1 1 8.4 19z" />
						<path d="M9 9.5c.3 2.2 2.3 4.2 4.5 4.6l1-1.1 1.8.8c-.2 1.2-1.1 1.8-2.3 1.7-3.2-.4-6-3.2-6.3-6.4-.1-1.2.6-2 1.7-2.2l.8 1.7z" fill="currentColor" stroke="none" />
					</svg>
				</a>
				<a
					href={`https://x.com/intent/post?text=${enc(`${title} at Haiven`)}&url=${enc(url)}`}
					target="_blank"
					rel="noopener"
					aria-label="Share on X"
					className={circle}
				>
					<X size={16} strokeWidth={2.2} />
				</a>
			</div>
		</div>
	);
}
