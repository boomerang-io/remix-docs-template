import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Header } from "~/components/header";
import { siteConfig } from "~/config/site";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Docs Template | Boomerang" },
    {
      name: "description",
      content: "A template by the Boomerang open source community.",
    },
  ];
};

export default function Index() {
  return (
    <>
      <Header className="pb-8" />
      <div className="flex flex-col min-h-[100dvh]">
        <main className="flex-1">
          <section className="w-full py-12 md:pt-24 md:pb-12 lg:pt-32 lg:pb-16 xl:pt-48 xl:pb-24">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Document. Publish. Collaborate.
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                    A minimalist Remix template for sharing your documentation
                    with the world. By the Boomerang open source community
                  </p>
                </div>
                <div className="space-x-4">
                  <Link
                    className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    to={`${siteConfig.github.repoUrl}`}
                  >
                    Get Started
                  </Link>
                  <Link
                    className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                    to="/docs"
                  >
                    View Example
                  </Link>
                </div>
              </div>
            </div>
          </section>
          <section className="relative max-w-6xl mx-auto px-4 py-8 md:py-12 lg:py-24 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex flex-col items-start space-y-2">
                <RocketIcon className="text-primary w-6 h-6" />
                <h3 className="text-lg font-semibold">Remote Fetching</h3>
                <p className="text-sm text-gray-600">
                  Fetching markdown and images from GitHub. As simple as
                  swapping out the repo and running.
                </p>
              </div>
              <div className="flex flex-col items-start space-y-2">
                <CogIcon className="text-primary w-6 h-6" />
                <h3 className="text-lg font-semibold">Versions</h3>
                <p className="text-sm text-gray-600">
                  Ability to switch versions to branches or tags. With ability
                  to configure what branches and if minor tags are included.
                </p>
              </div>
              <div className="flex flex-col items-start space-y-2">
                <ServerIcon className="text-primary w-6 h-6" />
                <h3 className="text-lg font-semibold">
                  Customisable components <i>future</i>
                </h3>
                <p className="text-sm text-gray-600">
                  Components are using shadcn/ui and can be themed or swapped
                  out
                </p>
              </div>
              <div className="flex flex-col items-start space-y-2">
                <LightbulbIcon className="text-primary w-6 h-6" />
                <h3 className="text-lg font-semibold">Configurable</h3>
                <p className="text-sm text-gray-600">
                  Adjust the settings to configure how the documentation
                  functions or point to a new repo and run as is.
                </p>
              </div>
              <div className="flex flex-col items-start space-y-2">
                <BarChartIcon className="text-primary w-6 h-6" />
                <h3 className="text-lg font-semibold">Cache support</h3>
                <p className="text-sm text-gray-600">
                  All the markdown and images are cached per version to reduce
                  the load.
                </p>
              </div>
              <div className="flex flex-col items-start space-y-2">
                <ShieldCheckIcon className="text-primary w-6 h-6" />
                <h3 className="text-lg font-semibold">
                  Language Support <i>future</i>
                </h3>
                <p className="text-sm text-gray-600">
                  The routes have the ability to switch languages.
                  Implementation has not yet been figured out.
                </p>
              </div>
            </div>
          </section>
        </main>
        <footer className="flex place-content-center sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            <div>
              &copy; 2024{" "}
              <a className="hover:underline" href={siteConfig.url}>
                {siteConfig.project}
              </a>
              . All rights reserved.
            </div>
          </p>
        </footer>
      </div>
    </>
  );
}

function BarChartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  );
}

function CogIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
      <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M12 2v2" />
      <path d="M12 22v-2" />
      <path d="m17 20.66-1-1.73" />
      <path d="M11 10.27 7 3.34" />
      <path d="m20.66 17-1.73-1" />
      <path d="m3.34 7 1.73 1" />
      <path d="M14 12h8" />
      <path d="M2 12h2" />
      <path d="m20.66 7-1.73 1" />
      <path d="m3.34 17 1.73-1" />
      <path d="m17 3.34-1 1.73" />
      <path d="m11 13.73-4 6.93" />
    </svg>
  );
}

function LightbulbIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  );
}

function RocketIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function ServerIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
      <line x1="6" x2="6.01" y1="6" y2="6" />
      <line x1="6" x2="6.01" y1="18" y2="18" />
    </svg>
  );
}

function ShieldCheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
