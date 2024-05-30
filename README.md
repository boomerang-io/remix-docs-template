# Remix Docs Template

A Remix starter template for running a markdown documentation site pulling from GitHub.

## Features

- Remote fetching of markdown and images from GitHub
- Version selector
- Customisable components
- Configuration
- Cache support

## Building Blocks

- [Remix](https://remix.run/) for the framework
- [Vite](https://vitejs.dev/) for the build tool / compiler
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Shadcn](https://ui.shadcn.com/) for the accessible, customisable, open-source components.

## 🖤 Acknowledgement

A special call out to the following for the inspiration and guidance and code that make up this template. Without them, this template would not have been created.

- [Remix website](https://github.com/remix-run/remix-website)
- [Kent C Dodds](https://github.com/kentcdodds/kentcdodds.com)

## Support

- Join the discussion on the [Boomerang Slack](https://join.slack.com/t/boomerang-io/shared_invite/zt-pxo2yw2o-c3~6YvWkKNrKIwhIBAKhaw)

## Design

### Routes

The docs path is based on a context of `/docs/<language>/<branch>/<path>`. The language will default to `en` and the branch will default to `main`. The path will be the path to the markdown or image file in the repository.

### Redirects

There is a file called \_redirects where you can put in paths for your documentation as things change.

### Content

The content is pulled from a GitHub repository (or locally in development). The repository is expected to have markdown files and associated images. Images can be located relative or anywhere, as long as they are within the same 'pathToRepo' folder(s) as the markdown files.

The markdown files can contain frontmatter as follows

```jsx
---
title: A wonderful title| <string>
description: A detailed description | <string>
order: 1 | <number>
toc: true | false
hidden: true | false
tag: new | beta | <string>
---
```

If the documentation is within a folder, add an index.md file to the folder including the `title` and `order` frontmatter. This will then be used in the navigation.

### Configuration

To provide as much flexibility as possible, inside the `/app/config` directory are multiple configuration files that control how this template functions. Read the individual configuration files for greater detail to the individual options.

- `doc.ts` - Controls the documentation and versioning integration.
- `nav.ts` - Controls the navigation and sidebar.
- `site.ts` - Controls general information displayed throughout the template such as title and description.

Additionally, there is a `.env` file that controls the environment variables for the template. This includes

- `GITHUB_TOKEN` - A token to increase the rate limiting from 60/hr to 1000/hr
- `SOURCE_REPO` - GitHub repo to pull docs from i.e. `boomerang-io/docs`
- `LOCAL_REPO_RELATIVE_PATH` - For development, reading the docs from a local repo i.e. `../content`
- `NO_CACHE` - Turn off the cache for development

## Setup

## Development

Run the Vite dev server:

```shellscript
pnpm run dev
```

## Deployment

First, build your app for production:

```sh
pnpm run build
```

Then run the app in production mode:

```sh
pnpm start
```

Now you'll need to pick a host to deploy it to.
