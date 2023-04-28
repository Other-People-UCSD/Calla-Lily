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
          label: "Title",
          isTitle: true,
          required: true,
        },
        {
          type: "datetime",
          name: "date",
          label: "Date",
          required: true,
        },
        {
          type: "string",
          name: "contributor",
          label: "Contributor(s)",
          required: true,
        },
        {
          type: "number",
          name: "collection",
          label: "Collection",
        },
        {
          type: "rich-text",
          name: "body",
          label: "Body",
          isBody: true,
        },
      ],
    },
  ],
}