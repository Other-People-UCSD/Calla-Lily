const slugify = (values) => {
  return `${(values.name || values.title || `document-${Date.now()}`)
    .toLowerCase()
    .split(' ')
    .join('-')}`
}

const footerFields = [
  {
    name: "name",
    label: "Name",
    type: "string",
    required: true,
  },
  {
    name: "url",
    label: "URL",
    type: "string",
    required: true,
  },
  {
    name: "outbound",
    label: "Outbound Link?",
    type: "boolean",
  },
  {
    name: "aria_label",
    label: "Aria Label",
    type: "string",
  },
]

export const schema = {
  collections: [
    {
      name: "post",
      label: "Posts",
      path: "_posts",
      format: "mdx",
      ui: {
        router: ({ document }) => {
          return `/${document._sys.breadcrumbs.join('/')}`
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
          required: true,
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
            description: "Supports markdown and HTML live editing!",
          },
        },
        {
          name: "theme",
          label: "Theme (Custom Component)",
          type: "string",
          ui: {
            description: "Select the theme to use ONLY IF INTENTIONAL. Selecting light will force users who use dark theme to match light mode.",
            component: "radio-group",
            options: [
              { label: "Light (FORCED)", value: 'light' },
              { label: "Dark", value: 'dark' },
            ],
          }
        },
        {
          name: "contentWarning",
          label: "Content Warning (Custom Component)",
          type: "string",
          ui: {
            description: "Enter the warning description to enable content warning.",
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
        router: () => {
          return `/about`
        },
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
          label: "Editors",
          type: "string",
          list: true,
        },
        {
          name: "content",
          label: "Content Writers",
          type: "string",
          list: true,
        },
        {
          name: "design_directors",
          label: "Design Directors",
          type: "string",
          list: true,
        },
        {
          name: "design",
          label: "Design",
          type: "string",
          list: true,
        },
        {
          name: "digital",
          label: "Digital",
          type: "string",
          list: true,
        },
        {
          name: "outreach_directors",
          label: "Outreach Directors",
          type: "string",
          list: true,
        },
        {
          name: "publicity_events",
          label: "Social Media/PR",
          type: "string",
          list: true,
        },
        {
          name: "alumni_editorial",
          label: "Editorial Alumni",
          type: "string",
          list: true,
        },
        {
          name: "alumni_design",
          label: "Design Alumni",
          type: "string",
          list: true,
        },
        {
          name: "alumni_pr",
          label: "Social Media Alumni",
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
          name: "submissions_written",
          label: "Written Submission Form",
          type: "string",
        },
        {
          name: "submissions_visual",
          label: "Visual Arts Submission Form",
          type: "string",
        },
        {
          name: "submissions_digital",
          label: "Digital-only Submission Form",
          type: "string"
        },
        {
          name: "subsClosedText",
          label: "Text to Show if Written and Visual Arts Submissions Are Closed",
          type: "rich-text",
        },
        {
          name: "app_editorial",
          label: "Editorial Application Form",
          type: "string",
        },
        {
          name: "app_content",
          label: "Content Writing Application Form",
          type: "string",
        },
        {
          name: "app_design",
          label: "Design Application Form",
          type: "string",
        },
        {
          name: "app_website",
          label: "Website Application Form",
          type: "string",
        },
        {
          name: "app_social_media",
          label: "Social Media Application Form",
          type: "string",
        },
        {
          name: "app_event_planning",
          label: "Event Planning Application Form",
          type: "string",
        },
        {
          name: "footer__c1",
          label: "Footer Col 1",
          type: "object",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: `${item?.name}` }
            },
          },
          fields: footerFields,
        },
        {
          name: "footer__c2",
          label: "Footer Col 2",
          type: "object",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: `${item?.name}` }
            },
          },
          fields: footerFields,
        },
        {
          name: "footer__c3",
          label: "Footer Col 3",
          type: "object",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: `${item?.name}` }
            },
          },
          fields: footerFields,
        },
        {
          name: "footer__c4",
          label: "Footer Col 4",
          type: "object",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: `${item?.name}` }
            },
          },
          fields: footerFields,
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
        router: () => {
          return `/`
        },
        allowedActions: {
          create: false,
          delete: false,
        },
      },
      fields: [
        {
          name: "announcement",
          label: "Announcement",
          type: "object",
          required: true,
          fields: [
            {
              name: "link",
              label: "Link",
              type: "string",
              description: "Leave blank to disable link.",
            },
            {
              name: "description",
              label: "Description",
              type: "string",
              description: "<80 chars or resize editor to check how it looks on mobile devices.",
            }, {
              name: "date",
              label: "Date (MUST CHANGE FOR EVERY ANNOUNCEMENT)",
              type: "datetime",
              description: "If user clicks on X, the announcement will always be hidden until this date is changed. Therefore, they won't see the new announcement."
            }
          ],
        },
        {
          name: "hero_items",
          label: "Featured Covers + Editors Notes",
          type: "object",
          list: true,
          required: true,
          ui: {
            itemProps: (item) => {
              return { label: `${item?.collection_num} | ${item?.collection_theme}` }
            },
          },
          fields: [
            {
              name:"image_cover",
              label: "Collection Cover",
              type: "image",
            },
            {
              name:"image_alt_text",
              label: "Cover's alternative text",
              type: "string",
            },
            {
              name:"image_caption",
              label: "Cover's Caption",
              type: "string",
            },
            {
              name:"collection_num",
              label: "Collection Number",
              type: "number",
            },
            {
              name:"collection_theme",
              label: "Collection Theme",
              type: "string",
            },
            {
              name:"editors_note_text",
              label: "Partial text of editors note",
              type: "rich-text",
            },
            {
              name:"editors_note_link",
              label: "Link to editors note page",
              type: "string",
            },
          ]
        },
      ],
    },
    {
      name: "ucmagazines",
      label: "UC Magazines",
      path: "data",
      format: "json",
      match: {
        include: "uc-magazines",
      },
      ui: {
        router: () => {
          return `/uc-magazines`
        },
        allowedActions: {
          create: false,
          delete: false,
        },
      },
      fields: [
        {
          name: "lastmod",
          label: "Last Modified",
          type: "datetime",
          dateFormat: "YYYY-MM-DD",
          required: true,
        },
        {
          name: "magazines",
          label: "Magazines",
          type: "object",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: `${item?.title} (${item?.college?.toUpperCase()})` }
            },
          },
          fields: [
            {
              name: "url",
              label: "URL",
              type: "string",
            },
            {
              name: "title",
              label: "Title",
              type: "string",
            },
            {
              name: "college",
              label: "College",
              type: "string",
            },
            {
              name: "est",
              label: "Established year (est)",
              type: "number",
            },
            {
              name: "active",
              label: "Active?",
              type: "boolean",
            },
            {
              name: "description",
              label: "Description",
              type: "string",
            },
          ]
        },
      ],
    },
  ],
}

