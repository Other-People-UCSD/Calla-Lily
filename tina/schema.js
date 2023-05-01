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
          label: "Title*",
          isTitle: true,
          required: true,
        },
        {
          type: "datetime",
          name: "date",
          label: "Date*",
          ui: {
            timeFormat: "HH:mm:ss",
            description: "Set the time to publish date. Set HH:mm:ss for collection releases, where each post has a different second value to order them. View the docs to see how this would work."
          }
        },
        {
          type: "string",
          name: "contributor",
          label: "Contributor(s)*",
          required: true,
        },
        {
          type: "number",
          name: "collection",
          label: "Collection No.",
          ui: {
            description: "Leave blank if not part of a collection",
            validate: (value) => {
              return value <= 0 ? "The number must be a positive integer." : null;
            }
          }
        },

        {
          name: "tags",
          label: "Tags*",
          type: "string",
          list: true,
          required: true,
          ui: {
            description: "Poetry, Fiction, Nonfiction, and 'Visual Arts'. Case-insensitive, but most are Capitalized",
          }
        },
        {
          type: "image",
          name: "thumbnail",
          label: "Thumbnail",
          ui: {
            description: "This is the very small image you see rendered on the genre or homepage.",
          },
        },
        {
          type: "rich-text",
          name: "body",
          label: "Body",
          isBody: true,
          ui: {
            description: "Currently supports markdown only, no HTML.",
          }
        },
      ],
    },
  ],
}