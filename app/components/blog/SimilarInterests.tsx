import { client } from "@/sanity/lib/client";
import SectionBadge from "../landing/SectionBadge";
import { SanityDocument } from "next-sanity";
import { POSTS_QUERY, RELATED_POSTS_QUERY } from "@/app/lib/queries/Post";
import BlogCard from "./BlogCard";

const options = { next: { revalidate: 30 } };

interface Props {
	currentPostId: string;
	tags: string[];
}

const SimilarInterests = async ({ currentPostId, tags }: Props) => {
	const posts = await client.fetch<SanityDocument[]>(RELATED_POSTS_QUERY, {
		currentId: currentPostId,
		tagIds: tags,
	});

	return (
		<section className="py-[84.83px] px-4 xl:px-0">
			<div className="max-w-[1112.94px] mx-auto font-sans ">
				<div className="">
					<SectionBadge text="Other Events & Masterclasses" />
					<h4 className="text-[#1B1816] mt-[10.18px] font-regular text-3xl xl:text-[40.72px] leading-[30px] xl:leading-[48.86px]">
						Explore Similar Interests and Topics
					</h4>
				</div>
				<div className="mt-[67.86px]">
					<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-[22.06px]">
						{posts.map((item, i) => (
							<BlogCard key={i} {...item} />
						))}
						{posts.map((post, index) => (
							<BlogCard key={2} {...post} />
						))}
						{posts.map((post) => (
							<BlogCard key={3} {...post} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
};
export default SimilarInterests;
