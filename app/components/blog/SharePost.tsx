"use client";

import {
	EmailShareButton,
	FacebookShareButton,
	LinkedinShareButton,
	TwitterShareButton,
} from "react-share";

import Link from "next/link";
import Image from "next/image";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

const SharePost = () => {
	const [currentUrl, setCurrentUrl] = React.useState("");
	const [copyText, setCopyText] = React.useState("Copy link");

	React.useEffect(() => {
		if (typeof window !== "undefined") {
			setCurrentUrl(window.location.href);
		}
	}, []);

	const handleCopyLink = async () => {
		try {
			await navigator.clipboard.writeText(currentUrl);
			setCopyText("Copied!");
		} catch (err) {
			console.error("Failed to copy: ", err);
		}
	};

	return (
		<div className="flex items-center gap-[10.18px]">
			<Button
				onClick={handleCopyLink}
				className="border-[0.85px] border-[#D0D5DD] flex bg-white h-auto py-[8.48px] px-[13.57px] items-center gap-1.5 font-semibold text-[11.88px] text-[#344054] hover:bg-haiven-blue hover:text-white cursor-pointer"
			>
				<Copy />
				{copyText}
			</Button>

			<TwitterShareButton url={currentUrl}>
				<Button className="border-[0.85px] border-[#D0D5DD] bg-white flex h-auto p-[8.48px] items-center gap-1.5 font-semibold text-[11.88px] text-[#344054] hover:bg-haiven-blue hover:text-white cursor-pointer">
					<Image
						src="/images/share-twitter.png"
						alt="share to twitter"
						width={16.97}
						height={16.97}
					/>
				</Button>
			</TwitterShareButton>

			<FacebookShareButton url={currentUrl}>
				<Button className="border-[0.85px] border-[#D0D5DD] bg-white flex h-auto p-[8.48px] items-center gap-1.5 font-semibold text-[11.88px] text-[#344054] hover:bg-haiven-blue hover:text-white cursor-pointer">
					<Image
						src="/images/share-facebook.png"
						alt="share to facebook"
						width={16.97}
						height={16.97}
					/>
				</Button>
			</FacebookShareButton>

			<LinkedinShareButton url={currentUrl}>
				<Button className="border-[0.85px] border-[#D0D5DD] bg-white flex h-auto p-[8.48px] items-center gap-1.5 font-semibold text-[11.88px] text-[#344054] hover:bg-haiven-blue hover:text-white cursor-pointer">
					<Image
						src="/images/share-linkedin.png"
						alt="share to linkedin"
						width={16.97}
						height={16.97}
					/>
				</Button>
			</LinkedinShareButton>
		</div>
	);
};
export default SharePost;
