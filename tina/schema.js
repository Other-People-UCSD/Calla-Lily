const slugify = (values) => {
  return `${(values.name || values.title || `document-${Date.now()}`)
    .toLowerCase()
    .split(' ')
    .join('-')}`
}

export const schema = {
  collections: [
    {
      name: "post",
      label: "Posts",
      path: "_posts",
      format: "mdx",
      ui: {
        router: ({ document }) => {
          `/_posts/${document._sys.filename}`
        },
        filename: {
          slugify: slugify,
          readonly: true
        },
      },
      defaultItem: () => {
        return {
          layout: "Post",
        }
      },
      fields: [
        {
          type: "string",
          name: "title",
          label: "Title (required)",
          isTitle: true,
          required: true,
        },
        {
          type: "datetime",
          name: "date",
          label: "Date (required)",
          required: true,
        },
        {
          type: "string",
          name: "contributor",
          label: "Contributor(s) (required)",
          required: true,
        },
        {
          type: "number",
          name: "collection",
          label: "Collection No. (leave blank if not part of collection)",
          ui: {
            validate: (value) => {
              return value <= 0 ? "The number must be a positive integer." : null;
            }
          }
        },

        {
          name: "tags",
          label: "Tags (Case-sensitive! Please capitalize the first word <3 | required) ",
          type: "string",
          list: true,
          required: true,
        },
        {
          type: "rich-text",
          name: "body",
          label: "Body (markdown only, NO HTML)",
          isBody: true,
        },
      ],
    },
  ],
}