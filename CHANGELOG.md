# Changelog 
### v4.0.3 (5/1/23)
- Corrected URL links to posts by fixing regex logic for `.mdx` files.
- Used API algorithm to get relevant post data between posts and word count.
- Fixed post date conversion for accurate post sorting.
- Moved team members, submissions, and homepage frontmatter into JSON files for CMS interfacing.
- Updated Homepage with cover image and genre components.
- Fixed thumbnail logic and URLs.

### v4.0.2 (5/1/23)
- Post pages now apply the Pink-Currents post styles.
- Added descriptors to UI schema for the editor.
- Custom parsing rich-text editor to support HTML in markdown using the raw values. This currently works one-level down the AST tree. May have issues with other posts once they get republished.

### v4.0.1 36daaec (4/27/23)
- TinaCMS configuration setup
- Working basic UI for posts

## v4.0.0 (4/26/23)
- Working build of ReactJS-based frontend of Pink-Currents!
- Implements all landing pages
  - Except Showcase page
  - Partial support for About page, fix once CMS data model is designed and implemented
- **Routing** 
  - API router is set up for potential use as a CMS connection
  - Posts are of the /:collections/:title format instead of the /:category/:title format
  - Static page generation routing is performed via JSON data from an internal data file not exposed on build
- SEO
  - Only title tag is implemented
  - Needs to include post metadata for indexing
- SASS/SCSS is converted into modules
  - All transferred except for `newsletter.scss`
- Favicons have a wider range of support
