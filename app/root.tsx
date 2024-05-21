import { LoaderFunctionArgs, json } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLoaderData,
  useMatches,
  useRouteError,
} from "@remix-run/react";
import "~/styles/globals.css";
import { isProductionHost, removeTrailingSlashes } from "./utils/http.server";
import { canUseDOM } from "./utils/ui-utils";
import { cn } from "./utils/theme";

export function links() {
  return [
    {
      rel: "prefetch",
      as: "image",
      href: "/boomerang-logo.svg",
    },
    {
      rel: "icon",
      type: "image/png",
      href: "/boomerang-icon.png",
    },
  ];
}

export async function loader({ request }: LoaderFunctionArgs) {
  removeTrailingSlashes(request);

  let isDevHost = !isProductionHost(request);
  let url = new URL(request.url);

  return json(
    {
      host: url.host,
      isProductionHost: !isDevHost,
      noIndex: isDevHost,
    },
    {
      headers: {
        Vary: "Cookie",
      },
    }
  );
}

interface LayoutProps {
  title?: string;
  isDev?: boolean;
  noIndex: boolean;
  children: React.ReactNode;
}

function Layout({ children, title, noIndex, isDev }: LayoutProps) {
  let matches = useMatches();
  let isDocsPage = !!matches.find((match) =>
    match.id.startsWith("routes/docs")
  );
  return (
    <html
      lang="en"
      className={cn({
        "scroll-pt-[6rem] lg:scroll-pt-[4rem]": isDocsPage,
      })}
    >
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,viewport-fit=cover"
        />
        {noIndex && <meta name="robots" content="noindex" />}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  let { noIndex } = useLoaderData<typeof loader>();
  return (
    <Layout noIndex={noIndex}>
      <Outlet />
    </Layout>
  );
}

export function ErrorBoundary() {
  let error = useRouteError();
  if (!canUseDOM) {
    console.error(error);
  }

  if (isRouteErrorResponse(error)) {
    return (
      <Layout noIndex title={error.statusText}>
        <div className="flex flex-1 flex-col justify-center text-white">
          <div className="text-center leading-none">
            <h1 className="font-mono text-[25vw]">{error.status}</h1>
            <a
              className="inline-block text-[8vw] underline"
              href={`https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/${error.status}`}
            >
              {error.statusText}
            </a>
          </div>
        </div>
      </Layout>
    );
  }
}
