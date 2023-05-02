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
    {
      name: "team",
      label: "Team Members",
      path: "data",
      format: "json",
      match: {
        include: "team",
      },
      ui: {
        allowedActions: {
          create: false,
          delete: false,
        },
      },
      fields: [
        {
          name: "editor_in_chief",
          label: "Editor in Chief",
          type: "string",
          list: true,
        },
        {
          name: "editorial",
          label: "Editorial Team",
          type: "string",
          list: true,
        },
        {
          name: "design_team",
          label: "Design Team",
          type: "string",
          list: true,
        },
        {
          name: "publicity_events",
          label: "Social Media/PR",
          type: "string",
          list: true,
        },
      ],
    },
    {
      name: "forms",
      label: "Forms",
      path: "data",
      format: "json",
      match: {
        include: "forms",
      },
      ui: {
        allowedActions: {
          create: false,
          delete: false,
        },
      },
      fields: [
        {
          name: "written",
          label: "Written Submission Form",
          type: "string",
        },
        {
          name: "visual",
          label: "Visual Arts Submission Form",
          type: "string",
        },
        {
          name: "subsClosedText",
          label: "Text to Show if Written and Visual Arts Submissions Are Closed",
          type: "rich-text",
        },
        {
          name: "otherSubs",
          label: "Other Submission Forms",
          type: "object",
          list: true,
          fields: [
            { 
              name: "description",
              label: "Description",
              type: "string",
              required: true,
            },
            {
              name: "link",
              label: "Link",
              type: "string",
              required: true,
            },
          ],
        },
        {
          name: "editorial",
          label: "Editorial Application Form",
          type: "string",
        },
        {
          name: "content",
          label: "Content Writing Application Form",
          type: "string",
        },
        {
          name: "design",
          label: "Design Application Form",
          type: "string",
        },
        {
          name: "events",
          label: "Event Planning Application Form",
          type: "string",
        },
        {
          name: "website",
          label: "Website Application Form",
          type: "string",
        },
      ],
    },
    {
      name: "homepage",
      label: "Homepage",
      path: "data",
      format: "json",
      match: {
        include: "homepage",
      },
      ui: {
        allowedActions: {
          create: false,
          delete: false,
        },
      },
      fields: [
        {
          name: "image",
          label: "Featured Image",
          type: "image",
          required: true,
        },
        {
          name: "featured_alt",
          label: "Featured Image Alt Text",
          type: "string",
          required: true,
        },
        {
          name: "featured_piece_name",
          label: "Featured Image Name",
          type: "string",
          required: true,
        },
        {
          name: "featured_contributor",
          label: "Featured Image Contributor",
          type: "string",
          required: true,
        },
        {
          name: "featured_link",
          label: "Featured Image Link",
          type: "string",
        },
        {
          name: "term",
          label: "Term",
          type: "string",
          required: true,
        },
        {
          name: "collection",
          label: "Collection No.",
          type: "number",
          required: true,
        },
        {
          name: "theme",
          label: "Theme",
          type: "string",
          required: true,
        },
      ],
    },
  ],
}