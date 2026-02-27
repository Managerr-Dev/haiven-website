import SimilarInterests from "@/app/components/blog/SimilarInterests";
import { POST_QUERY } from "@/app/lib/queries/Post";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import createImageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { Copy } from "lucide-react";
import moment from "moment";
import { Metadata } from "next";
import { PortableText, SanityDocument } from "next-sanity";
import Image from "next/image";
import Link from "next/link";

const links = [
	{
		image: "/images/share-twitter.png",
		alt: "share to twitter",
	},
	{
		image: "/images/share-facebook.png",
		alt: "share to facebook",
	},
	{
		image: "/images/share-linkedin.png",
		alt: "share to linkedin",
	},
];

export async function generateMetadata({
	params,
}: {
	params: { slug: string };
}): Promise<Metadata> {
	const post = await client.fetch(POST_QUERY, {
		slug: params.slug,
	});

	if (!post) return {};

	return {
		title: post.title,
		description: post.excerpt,
		openGraph: {
			title: post.title,
			description: post.excerpt,
			images: post.image ? [post.image] : [],
		},
	};
}
const { dataset, projectId } = client.config();

const urlFor = (source: SanityImageSource) =>
	projectId && dataset
		? createImageUrlBuilder({ projectId, dataset }).image(source)
		: null;

const options = { next: { revalidate: 30 } };

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const post = await client.fetch<SanityDocument>(
		POST_QUERY,
		await params,
		options,
	);

	const postImageUrl = post.image
		? urlFor(post.image)?.width(550).height(310).url()
		: null;

	return (
		<div className="py-[127px]">
			<div className="bg-[#13247E08] flex flex-col max-w-[1129.4px] mx-auto w-full border border-[#13247E4D] rounded-[10.18px] p-[13.57px] mb-[46.42px]">
				<p className="mb-2.5 font-semibold text-[15.27px] leading-[17.81px] text-[#FF8900]">
					{moment(post.publishedAt).format("MMMM DD, YYYY")}
				</p>
				<h1 className="mb-2.5 font-medium text-[40.72px] leading-[51.74px] text-[#101828]">
					{post.title}
				</h1>
				{/* tags */}
				<div className="mb-2.5">
					{post.tags.map(
						(
							item: { _id: string; title: string; slug: string },
							index: number,
						) => (
							<div
								className={cn(
									"py-[8.48px] px-[17.71px] rounded-[16.97px] w-fit",
									index % 2 === 0 ? "bg-[#FF89001F]" : "bg-[#156B8D1F]",
								)}
								key={item._id}
							>
								<p
									className={cn(
										"font-semibold text-[16.97px] leading-[20.36px]",
										index % 2 === 0 ? "text-[#FF8900]" : "text-[#156B8D]",
									)}
								>
									{item.title}
								</p>
							</div>
						),
					)}
				</div>
				<div className="flex-1">
					{postImageUrl && (
						<Image
							src={postImageUrl}
							alt={post.title}
							className="aspect-video rounded-xl size-full object-top"
							width="550"
							height="310"
							priority
						/>
					)}
				</div>
			</div>
			<main className="max-w-[1129.4px] mx-auto px-4 lg:px-[93.16px] flex flex-col gap-4 ">
				<div className="prose">
					{Array.isArray(post.body) && (
						<PortableText
							value={post.body}
							components={{
								types: {
									image: ({ value }) => (
										<div className="my-6">
											<Image
												src={urlFor(value)?.url() || ""}
												alt={value.alt || ""}
												width={800}
												height={500}
												className="rounded-lg"
											/>
											{value.caption && (
												<p className="text-sm text-gray-500 mt-2 text-center">
													{value.caption}
												</p>
											)}
										</div>
									),
								},
							}}
						/>
					)}
				</div>

				<hr />

				<div className="flex justify-between items-center gap-2">
					{/* profile */}
					<div className="flex gap-[13.57px]">
						<Image
							src=""
							alt="user profile"
							width={47.5}
							height={47.5}
							className="rounded-full size-8 lg:size-[47.5px]"
						/>
						<div className="">
							<p className="font-semibold text-[15.27px] leading-[23.75px] text-[#101828] ver">
								Olivia Rhye
							</p>
							<p className="font-normal text-[13.57px] leading-[20.36px] text-[#475467]">
								Product Designer, Untitled
							</p>
						</div>
					</div>

					{/* sharing */}
					<div className="flex items-center gap-[10.18px]">
						<Link href="/">
							<Button className="border-[0.85px] border-[#D0D5DD] flex bg-white h-auto py-[8.48px] px-[13.57px] items-center gap-1.5 font-semibold text-[11.88px] text-[#344054]">
								<Copy />
								Copy link
							</Button>
						</Link>

						{links?.map((item) => (
							<Link href="/" key={item.alt}>
								<Button className="border-[0.85px] border-[#D0D5DD] bg-white flex h-auto p-[8.48px] items-center gap-1.5 font-semibold text-[11.88px] text-[#344054]">
									<Image
										src={item.image}
										alt={item.alt}
										width={16.97}
										height={16.97}
									/>
								</Button>
							</Link>
						))}
					</div>
				</div>

				<SimilarInterests
					currentPostId={post._id}
					tags={post.tags?.map((tag: { _id: string }) => tag._id) || []}
				/>
			</main>
		</div>
	);
};
export default Page;
