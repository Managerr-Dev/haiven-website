import { client } from "@/sanity/lib/client";
import { SanityDocument } from "next-sanity";
import Image from "next/image";
import BlogCard from "../components/blog/BlogCard";
import SectionBadge from "../components/landing/SectionBadge";
import { POSTS_QUERY } from "../lib/queries/Post";

const options = { next: { revalidate: 30 } };

const page = async () => {
	const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

	return (
		<div className="relative min-h-screen/2 xl:min-h-[978px] font-sans pb-[146px]">
			<div className="bg-haiven-blue relative px-4 font-sans pb-[146px]">
				<div className="relative max-w-[1071px] mx-auto gap-[27.99px] pt-[167px] bg-haiven-blue flex flex-col items-center text-center">
					<Image
						src="/images/haiven-leaf.svg"
						alt="decorative leaf"
						width={126.8}
						height={108.85}
						className="absolute top-20 left-20"
						preload={false}
					/>

					<Image
						src="/images/haiven-leaf.svg"
						alt="decorative leaf"
						width={126.8}
						height={108.85}
						className="absolute top-30 right-0"
						preload={false}
					/>
					<Image
						src="/images/haiven-leaf.svg"
						alt="decorative leaf"
						width={126.8}
						height={108.85}
						className="absolute left-[40%] top-1/2 -translate-y-1/2"
						preload={false}
					/>
					<Image
						src="/images/haiven-leaf.svg"
						alt="decorative leaf"
						width={126.8}
						height={108.85}
						className="absolute top-1/2  left-0"
						preload={false}
					/>
					<Image
						src="/images/haiven-leaf.svg"
						alt="decorative leaf"
						width={126.8}
						height={108.85}
						className="absolute top-1/2  right-0"
						preload={false}
					/>
					<SectionBadge text="Blog" />

					<h1 className="font-bold text-[40.72px] max-w-[80%] leading-[100%] align-middle uppercase text-white">
						Our Blog
					</h1>

					<p className="font-regular text-base text-[#FFFFFFB2] lg:text-xl text-center leading-[150%] mb-1">
						Your inside scoop on real stories, estate management, smart living,
						and safety in modern communities.
					</p>

					<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
						{/* {list.map((item, index) => (
							<div key={index} className="">
								<Image
									src={item}
									alt="grid images"
									width={341}
									height={240}
									className="h-full"
								/>
							</div>
						))} */}
					</div>
				</div>
			</div>

			<div className="max-w-[1127.67px] mx-auto px-4 pt-[85.95px]">
				<ul className=" gap-y-4 grid sm:grid-cols-2 md:grid-cols-3 gap-[18px]">
					{posts.map((post) => (
						<BlogCard key={post._id} {...post} />
					))}
				</ul>
			</div>
			{/* <div className="container mx-auto min-h-screen max-w-3xl p-8 pt-[127px]">
			</div> */}
		</div>
	);
};
export default page;
