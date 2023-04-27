# Calla-Lily
Other People Magazine's website rebuilt in React JS as a modern static site generator

```
otherpeoplesd.com/
| 
├── _posts              # Published posts, organized into folders
|
├── data                # Client static-side database of posts
├── components          # Parts for the website
├── pages               # Viewable pages on the website
|   ├── collection      # Dynamic routing for posts
|   └── api             # API Routing
|
├── styles              # CSS using CSS Modules and SASS
├── public              # Styling the website
|   ├── favicons        # Other People Logo
|   ├── fonts           # Basier Mono Circle
|   ├── images          # Folder for media and images, organized into folders
|   └── js              # Functionality for interactive elements
|
├── _app.js             # The container for all components
├── _document.js        # Updates the html and body tags
├── index.js            # Homepage
├── submissions.js      # Submissions Page
├── about.js            # About Page
├── fiction.js          # Fiction Page
├── nonfiction.js       # Nonfiction Page
├── poetry.js           # Poetry Page
├── 404.js              # 404 Not Found Page
|
|
└── next.config.js      # Configuration for Next.JS framework
```