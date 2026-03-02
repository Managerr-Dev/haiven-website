import { type SchemaTypeDefinition } from "sanity";
import { PostType } from "./PostType";
import { TagType } from "./Tags";
import { AuthorType } from "./AuthorType";

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [PostType, TagType, AuthorType],
};
