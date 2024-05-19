# Remix Docs Template

A Remix starter template for running a markdown documentation site pulling from GitHub.

## Features

- Remote fetching of Markdown and Images from GitHub
- Version selector
- Docs
- Blogs _coming soon_
- Customisable components

## Building Blocks

- [Remix](https://remix.run/) for the framework
- [Vite](https://vitejs.dev/) for the build tool / compiler
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Shadcn](https://ui.shadcn.com/) for the accessible, customisable, open-source components.

## Acknowledgement

A special call out to the [Remix website](https://github.com/remix-run/remix-website) and [Kent C Dodds](https://github.com/kentcdodds/kentcdodds.com) for the inspiration and guidance and code snippets that make up this template.

## Support

- Join the discussion on the [Boomerang Slack](https://join.slack.com/t/boomerang-io/shared_invite/zt-pxo2yw2o-c3~6YvWkKNrKIwhIBAKhaw)

## Design

### Routes

The docs path is based on a context of `/docs/<language>/<branch>/<path>`. The language will default to `en` and the branch will default to `main`. The path will be the path to the markdown or image file in the repository.

### Redirects

There is a file called \_redirects where you can put in paths for your documentation as things change.

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
