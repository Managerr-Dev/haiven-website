import { client } from "@/sanity/lib/client";
import BlogCard from "../blog/BlogCard";
import SectionBadge from "../landing/SectionBadge";
import { SanityDocument } from "next-sanity";
import { POSTS_QUERY } from "@/app/lib/queries/Post";

const options = { next: { revalidate: 30 } };

const EventsBlogs = async () => {
	const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

	return (
		<section className="py-[84.83px] px-4">
			<div className="max-w-[1112.94px] mx-auto font-sans ">
				<div className="">
					<SectionBadge text="Other Events & Blog Post" />
					<h4 className="text-[#1B1816] mt-[10.18px] font-regular text-3xl xl:text-[40.72px] leading-[30px] xl:leading-[48.86px]">
						Explore Similar Interests and Topics
					</h4>
				</div>
				<div className="mt-[67.86px]">
					<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-[18px]">
						{posts.map((item, i) => (
							<BlogCard key={i} {...item} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default EventsBlogs;
