# Changelog 
## v4.0.0 (4/26/23)
- Working build of React-based frontend of Pink-Currents
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
