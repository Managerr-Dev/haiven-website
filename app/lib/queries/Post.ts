export const POSTS_QUERY = `*[
_type == "post" && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt, body, image, excerpt, tags[]->{
    _id,
    title,
    slug
  }}`;

export const PAGINATED_POSTS_QUERY = `*[
  _type == "post" && defined(slug.current)
] | order(publishedAt desc) [$start...$end]{
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
}`;

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
  },
  author->{
    _id,
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


export const ALL_TAGS_QUERY = `*[
  _type == "tag" && defined(slug.current)
] | order(title asc){
  _id,
  title,
  slug,
  description
}`;


export const POSTS_BY_TAG_QUERY = `
*[
  _type == "post" &&
  references(*[_type == "tag" && slug.current == $tagSlug]._id)
] | order(publishedAt desc){
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
  },
  author->{
    _id,
    name,
    title,
    image
  }
}
`;

export const PAGINATED_POSTS_BY_TAG_QUERY = `
*[
  _type == "post" &&
  references(*[_type == "tag" && slug.current == $tagSlug]._id)
] | order(publishedAt desc) [$start...$end]{
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
  },
  author->{
    _id,
    name,
    title,
    image
  }
}
`;

export const POSTS_BY_TITLE_QUERY = `
*[
  _type == "post" && 
  title match $title
] | order(publishedAt desc){
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
  },
  author->{
    _id,
    name,
    title,
    image
  }
}
`;

export const PAGINATED_POSTS_BY_TITLE_QUERY = `
*[
  _type == "post" && 
  title match $title
] | order(publishedAt desc) [$start...$end]{
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
  },
  author->{
    _id,
    name,
    title,
    image
  }
}
`;