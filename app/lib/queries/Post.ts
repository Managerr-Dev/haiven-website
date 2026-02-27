export const POSTS_QUERY = `*[
_type == "post" && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt, body, image, excerpt, tags[]->{
    _id,
    title,
    slug
  }}`;

export const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  publishedAt,
  body,
  image,
  excerpt,
  tags[]->{
    _id,
    title,
    slug
  }
  author->{
    name,
    title,
    image
  }
}`;

export const RELATED_POSTS_QUERY = `
*[
  _type == "post" &&
  _id != $currentId &&
  count(tags[@._ref in $tagIds]) > 0
] | order(publishedAt desc)[0...3]{
  _id,
  title,
  slug,
  image,
  excerpt
}
`;
