import { defineField, defineType } from "sanity";

export const TagType = defineType({
	name: "tag",
	title: "Tag",
	type: "document",
	fields: [
		defineField({
			name: "title",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "slug",
			type: "slug",
			options: { source: "title" },
			validation: (rule) => rule.required(),
		}),
	],
});
