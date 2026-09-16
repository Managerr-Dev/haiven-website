import SharePost from "@/app/components/blog/SharePost";
import SimilarInterests from "@/app/components/blog/SimilarInterests";
import { POST_QUERY } from "@/app/lib/queries/Post";
import { cn } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import createImageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import moment from "moment";
import { Metadata } from "next";
import { PortableText, SanityDocument } from "next-sanity";
import Image from "next/image";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const post = await client.fetch(POST_QUERY, {
		slug: (await params).slug,
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

	const postAuthorImageUrl = post.image
		? urlFor(post.author.image)?.width(550).height(310).url()
		: null;

	console.log({ post: post.author });

	return (
		<div className="py-[127px] px-4">
			<div className="bg-[#13247E08] flex flex-col max-w-[1129.4px] mx-auto w-full border-[0.68px] border-[#13247E4D] rounded-[10.18px] p-[13.57px] mb-[46.42px]">
				<p className="mb-2.5 font-semibold text-[15.27px] leading-[17.81px] text-[#FF8900]">
					{moment(post.publishedAt).format("MMMM DD, YYYY")}
				</p>
				<h1 className="mb-2.5 font-medium text-[40.72px] leading-[51.74px] text-[#101828]">
					{post.title}
				</h1>
				{/* tags */}
				<div className="mb-2.5 flex gap-2.5 flex-wrap">
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
			<main className="max-w-[1129.4px] mx-auto lg:px-[93.16px] flex flex-col gap-4 ">
				<div className="prose text-[#475467]">
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
							src={postAuthorImageUrl || ""}
							alt="user profile"
							width={47.5}
							height={47.5}
							className="rounded-full size-8 lg:size-[47.5px] object-cover object-top"
						/>
						<div className="">
							<p className="font-semibold text-[15.27px] leading-[23.75px] text-[#101828] ver">
								{post.author?.name || ""}
							</p>
							<p className="font-normal text-[13.57px] leading-[20.36px] text-[#475467]">
								{post?.author?.title || ""}
							</p>
						</div>
					</div>

					{/* sharing */}
					<SharePost />
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
