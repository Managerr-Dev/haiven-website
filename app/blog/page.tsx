import { client } from "@/sanity/lib/client";
import { SanityDocument } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import BlogCard from "../components/blog/BlogCard";
import SectionBadge from "../components/landing/SectionBadge";
import {
	ALL_TAGS_QUERY,
	PAGINATED_POSTS_BY_TAG_QUERY,
	PAGINATED_POSTS_QUERY,
} from "../lib/queries/Post";
import { Button } from "@/components/ui/button";

const options = { next: { revalidate: 30 } };

const PAGE_SIZE = 9;

type PageSearchParams = {
	category?: string;
	page?: string;
};

type PageProps = {
	searchParams?: Promise<PageSearchParams>;
};

const page = async ({ searchParams }: PageProps) => {
	const params = (await searchParams) ?? {};
	const selectedCategory = params.category;
	const currentPage = Number(params.page) > 1 ? Number(params.page) : 1;

	const start = (currentPage - 1) * PAGE_SIZE;
	const end = start + PAGE_SIZE + 1;

	const query = selectedCategory
		? PAGINATED_POSTS_BY_TAG_QUERY
		: PAGINATED_POSTS_QUERY;

	const fetchedPosts = await client.fetch<SanityDocument[]>(
		query,
		{
			...(selectedCategory ? { tagSlug: selectedCategory } : {}),
			start,
			end,
		},
		options,
	);

	const hasNextPage = fetchedPosts.length > PAGE_SIZE;
	const posts = hasNextPage
		? fetchedPosts.slice(0, PAGE_SIZE)
		: fetchedPosts;

	const tags = await client.fetch<
		{ _id: string; title: string; slug: { current: string } }[]
	>(ALL_TAGS_QUERY, {}, options);

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

					<div className="flex gap-4 flex-wrap">
						<Link href="/blog">
							<Button
								className={`text-[#FFFFFFB2] py-[8.6px] px-[15.47px] border-[0.69px] border-[#FFFFFF4D] rounded-[10.31px] shadow-[0px_0.86px_1.72px_0px_#1018280D] bg-transparent hover:bg-accent-green hover:text-white ${
									!selectedCategory ? "bg-accent-green text-white" : ""
								}`}
							>
								All
							</Button>
						</Link>
						{tags?.map((item) => {
							const tagSlug = item.slug?.current;
							const isActive = selectedCategory === tagSlug;

							if (!tagSlug) return null;

							return (
								<Link key={item._id} href={`/blog?category=${tagSlug}`}>
									<Button
										className={`text-[#FFFFFFB2] py-[8.6px] px-[15.47px] border-[0.69px] border-[#FFFFFF4D] rounded-[10.31px] shadow-[0px_0.86px_1.72px_0px_#1018280D] bg-transparent hover:bg-accent-green hover:text-white ${
											isActive ? "bg-accent-green text-white" : ""
										}`}
									>
										{item.title}
									</Button>
								</Link>
							);
						})}
					</div>
				</div>
			</div>

			<div className="max-w-[1127.67px] mx-auto px-4 pt-[85.95px]">
				{posts.length === 0 ? (
					<div className="py-16 text-center text-[#3C3C43]">
						<p className="text-lg font-semibold mb-2">
							No posts found
						</p>
						<p className="text-sm text-[#3C3C43B2]">
							{selectedCategory
								? "Try selecting a different category or view all posts."
								: "Check back soon for new content."}
						</p>
					</div>
				) : (
					<ul className="gap-y-4 grid sm:grid-cols-2 md:grid-cols-3 gap-[18px]">
						{posts.map((post) => (
							<BlogCard key={post._id} {...post} />
						))}
					</ul>
				)}

				{(currentPage > 1 || hasNextPage) && (
					<div className="mt-10 flex items-center justify-center gap-4">
						{currentPage > 1 ? (
							<Link
								href={
									selectedCategory
										? `/blog?category=${selectedCategory}&page=${
												currentPage - 1
										  }`
										: `/blog?page=${currentPage - 1}`
								}
							>
								<Button
									variant="outline"
									className="px-4 py-2"
								>
									Previous
								</Button>
							</Link>
						) : (
							<Button
								variant="outline"
								className="px-4 py-2"
								disabled
							>
								Previous
							</Button>
						)}

						<span className="text-sm text-[#3C3C43B2]">
							Page {currentPage}
						</span>

						{hasNextPage ? (
							<Link
								href={
									selectedCategory
										? `/blog?category=${selectedCategory}&page=${
												currentPage + 1
										  }`
										: `/blog?page=${currentPage + 1}`
								}
							>
								<Button
									variant="outline"
									className="px-4 py-2"
								>
									Next
								</Button>
							</Link>
						) : (
							<Button
								variant="outline"
								className="px-4 py-2"
								disabled
							>
								Next
							</Button>
						)}
					</div>
				)}
			</div>
			{/* <div className="container mx-auto min-h-screen max-w-3xl p-8 pt-[127px]">
			</div> */}
		</div>
	);
};
export default page;
