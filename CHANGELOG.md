# Changelog 
### v4.5.7.1
- Announcement bar only shows up on homepage
  - Should not show up on UC Magazines page
  - Modified the localStorage to save memory by using the same key and checking against the previous value instead of generating new keys
  - If this is changed to show up on other landing pages, must add the tina homepage connection to each used page 

## v4.5.7 (8/16/23)
- Enhanced usability of the UC Magazines page to a search-and-filter interface
  - Connected to CMS to allow editing 

## v4.5.6 (7/9/23)
- Google Analytics

### v4.5.5.4 (5/17/23)
- Added search bar no results text
- Refactoring over CSS styles and HTML layouts
- Minor post fixes
- Added announcement bar

### v4.5.5.3 (5/17/23)
- Uploaded illustrations for Metamorphoses, the post-mortem
- More accurate word count
- Parser supports Markdown links
- Differentiated files by utility in components and lib folders

### v4.5.5.2 (5/16/23)
- Updated posts with visual fixes
- Added line break after header like in Pink-Currents
- Changed footer logo from Next/Image to a JSX SVG to support changing styles

## v4.5.5.1 (5/16/23) 
- Modified custom MDX parser to better support HTML and HTML inline
- Moved copyright and theme file into components instead of exposing to public folder

## v4.5.5 (5/15/23)
- Added support for missed connections external JS component
- Added support for content warning inside CMS as a frontmatter field which conditionally renders the content warning component
- Copyright is now applied to all posts
- Header now changes theme color gradually alongside the body theme

### v4.5.4.1 (5/8/23)
- Changed permalinks to /year/title format again

## v4.5.4.0 (5/8/23)
- SEO implemented on pages and posts
- Fixed issue with Search and SEO not building together due to the context wrapper originally checking for one children instead of multiple (DefaultSeo and Component)

## v4.5.3.1 (5/5/23)
- Thumbnails on genre lists
  - Implements NextJS Images with fill property, very low quality because they are at max 60px wide, and forced relative positioning
- Search component receives context about all posts so posts are fetched only once
- Refactored genre such that it filters the entire posts data to get the tag
  - Useful as each page will have the entire post database and thus saves a call to fetch all of the posts
- getStaticProps implemented on each landing page for search to work
- Removed Showcase link as page does not exist

### v4.5.2 (5/5/23)
- GraphQL pagination to generate all posts and redirects for the yearly posts 
 
### v4.5.1.1 (5/5/23)
- Genre lists now sort by date.
- Fixed limit setting on homepage genre cards.

## v4.5.1.0 (5/5/23)
- Full Collection No. 1 to No. 5 and 2020-2023 posts from Pink-Currents
- These posts do not have the right image paths and may contain formatting errors.

## v4.5.0 (5/5/23)
- Collection No. 4 and 2020.

## v4.4.0 (5/5/23)
- Collection No. 4 and 2020.
- Posts now display their collection number
- TODO: Close issues with Kalbelia and Worm.

## v4.3.0 (5/5/23)
- Collection No. 3 and 2020.

## v4.2.0 (5/5/23)
- Collection No. 2 and 2020.

## v4.1.0 (5/5/23)
- Supports Pink-Currents collection and non-collection permalink format.
- Collection No. 1 (partial) and 2020.

### v4.0.4.2 (5/3/23)
- Security: Changed TinaCMS access point because bots usually query for /admin/ on domains.

### v4.0.4.0-1 (5/1/23)
- TinaCMS connections on Homepage, About, Submissions
  - Added configurable post display limits on homepage
- Fixed navigation menu staying open when search link is pressed The menu now closes because there are no static page refreshes using NextJS.
- Refactored some frontmatter from posts

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
