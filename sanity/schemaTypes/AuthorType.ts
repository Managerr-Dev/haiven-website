import { defineField, defineType } from "sanity";

export const AuthorType = defineType({
	name: "author",
	title: "Author",
	type: "document",
	fields: [
		defineField({
			name: "name",
			type: "string",
			validation: (rule) => rule.required(),
		}),

		defineField({
			name: "title",
			type: "string",
			description: "E.g. Frontend Engineer, Editor, Writer",
		}),

		defineField({
			name: "image",
			type: "image",
			options: { hotspot: true },
			fields: [
				{
					name: "alt",
					type: "string",
					title: "Alt text",
					validation: (rule) => rule.required(),
				},
			],
		}),
	],
});
