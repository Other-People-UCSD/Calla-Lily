<div align="center">
  <img src="./public/svg/logo_text_op.svg" height="128">
  <h1 align="center">Calla-Lily</h1>
</div>

![Deployment Status](https://img.shields.io/github/deployments/Other-People-UCSD/Calla-Lily/production?logo=vercel&label=Vercel&link=https%3A%2F%2Fotherpeoplesd.com) [![Recommendation CI/CD](https://github.com/Other-People-UCSD/Calla-Lily/actions/workflows/recommender.yml/badge.svg)](https://github.com/Other-People-UCSD/Calla-Lily/actions/workflows/recommender.yml)

## [Documentation](https://docs-other-people.vercel.app/) | [Changelog](https://github.com/Other-People-UCSD/Calla-Lily/blob/main/CHANGELOG.md)
Other People Magazine's website rebuilt in React JS as a modern static site generator. This literary arts website has a greater emphasis on technical specifications as compared to other pre-configured websites that use content management systems. 

## Features
- Headless CMS integration with TinaCMS to enable content editing for our organization's editors.
- A Storybook to develop and test user interfaces in isolation for more effective organization branding.
- A pretrained neural network to recommend visual arts as well as literature in a similarity-based content recommendation system.
- Automated CI for testing, performance and accessibility auditing, and generating recommendations.
- An API for data science operations and querying status!
- And our wonderful team!

## Installation

```
pnpm install
```

## Local Development

```
pnpm dev
```

## Linting

```
pnpm audit
```

This command checks to make sure the Next program runs properly as well as checking that TinaCMS renders everything. 

## Build

```
pnpm build
```

This command generates the static website content into the `.next/` directory. Do not commit any built resources as this is handled by Vercel, our deployment CI/CD.

## Testing

```
pnpm test:e2e
pnpm test:ui
```

Snapshot testing is currently only aligned with snapshots created on Windows devices. 

The E2E command runs in the command line and outputs an HTML report to view the results of all tests. On the other hand, the UI command will open Playwright UI where tests can be run individually or all at once.

## [Code of Conduct](https://github.com/Other-People-UCSD/Calla-Lily/blob/main/CODE_OF_CONDUCT.md)

Contributors on all projects and communication channels are expected to follow our Code of Conduct.