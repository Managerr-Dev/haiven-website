import { client } from "@/sanity/lib/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { SanityDocument } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import createImageUrlBuilder from "@sanity/image-url";
import moment from "moment";

const { dataset, projectId } = client.config();

const urlFor = (source: SanityImageSource) =>
	projectId && dataset
		? createImageUrlBuilder({ projectId, dataset }).image(source)
		: null;

function BlogCard(post: SanityDocument) {
	const postImageUrl = post.image
		? urlFor(post.image)?.width(550).height(310).url()
		: null;
	return (
		<Link href={`/blog/${post.slug.current}`}>
			<div className="p-[13.57px] bg-[#13247E08] border-[0.68px] border-[#13247E4D] rounded-[10.18px] flex flex-col gap-[10.18px]">
				<div className="basis-1/2">
					<Image
						src={postImageUrl || ""}
						alt={post.title}
						width={328.28}
						height={254.48}
						className="min-h-[254px] object-cover object-center"
					/>
				</div>
				<div className="font-sans basis-1/2 ">
					<p className="font-semibold text-haiven-blue leading-[25.45px] text-[16.97px] mb-[10.18px]">
						{post.title}
					</p>
					<p className="font-light font-sora-sans text-[#3C3C43] leading-[20.36px] text-[13.57px] mb-[13.57px] tracking-[0%]">
						{post.excerpt}
					</p>

					<hr />
					{post.tags.map(
						(item: {
							_id: string;
							title: string;
							slug: { current: string };
						}) => (
							<Link
								key={item._id}
								href={`/blog?category=${item.slug.current}`}
								className="my-[20.36px] inline-block text-sm xl:text-[16.97px] font-semibold leading-[20.36px] text-[#FF8900]"
							>
								{item.title}
							</Link>
						),
					)}
					<p className="font-semibold text-haiven-blue leading-[20.36px] text-sm xl:text-[16.97px]">
						{moment(post.publishedAt).format("MMMM DD, YYYY")}
					</p>
				</div>
			</div>
		</Link>
	);
}

export default BlogCard;
