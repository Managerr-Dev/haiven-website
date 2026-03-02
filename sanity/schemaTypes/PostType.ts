import { defineField, defineType } from "sanity";

export const PostType = defineType({
	name: "post",
	title: "Post",
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
		defineField({
			name: "excerpt",
			title: "Excerpt",
			type: "text",
			rows: 3,
			validation: (rule) => rule.max(200),
		}),
		defineField({
			name: "tags",
			title: "Tags",
			type: "array",
			of: [
				{
					type: "reference",
					to: [{ type: "tag" }],
				},
			],
		}),
		defineField({
			name: "publishedAt",
			type: "datetime",
			initialValue: () => new Date().toISOString(),
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "author",
			type: "reference",
			to: [{ type: "author" }],
		}),
		defineField({
			name: "image",
			type: "image",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "body",
			type: "array",
			of: [
				{ type: "block" },
				{
					type: "image",
					options: { hotspot: true },
					fields: [
						{
							name: "alt",
							type: "string",
							title: "Alt text",
							validation: (rule) => rule.required(),
						},
						{
							name: "caption",
							type: "string",
							title: "Caption",
						},
					],
				},
			],
		}),
	],
});
