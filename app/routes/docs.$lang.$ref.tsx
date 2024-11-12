import * as React from "react";
import {
  Link,
  Outlet,
  useLoaderData,
  useLocation,
  useMatches,
  useNavigation,
  useParams,
  useResolvedPath,
  matchPath,
} from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import type { LoaderFunctionArgs, HeadersFunction } from "@remix-run/node";
import cx from "clsx";
import "~/styles/docs.css";
import { DetailsMenu } from "~/components/details-menu";
import iconsHref from "~/icons.svg";
import {
  getRepoBranches,
  getRepoDocsMenu,
  getRepoTags,
  validateParams,
  getLatestVersion,
  getLatestVersionHeads,
} from "~/utils/github";
import type { Doc } from "~/utils/github";
import { octokit } from "~/utils/github.server";
import { env } from "~/utils/env.server";
import { CACHE_CONTROL } from "~/utils/http.server";
import { VersionWarningMessage } from "~/components/version-warning-message";
import { siteConfig } from "~/config/site";
import { docConfig } from "~/config/doc";
import { Header } from "~/components/header";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  let { lang = "en", ref = "main", "*": splat } = params;

  let branchesInMenu = docConfig.branches;
  let [tags, branches] = await Promise.all([
    getRepoTags({ octokit, releasePrefix: docConfig.versions.prefix }),
    getRepoBranches({ octokit }),
  ]);

  console.log("Tags: ", tags);
  if (!tags || !branches) {
    throw new Response("Cannot reach GitHub", { status: 503 });
  }

  if (
    process.env.NODE_ENV === "development" &&
    !branchesInMenu.includes("local")
  ) {
    branches.push("local");
    branchesInMenu.push("local");
  }

  let betterUrl = validateParams(tags, branches, {
    lang,
    ref,
    "*": splat,
  });
  if (betterUrl) {
    console.log("Redirecting to better URL: ", betterUrl);
    throw redirect("/docs/" + betterUrl);
  }

  let latestVersion = getLatestVersion(tags);
  let versions = getLatestVersionHeads(tags);

  let menu = await getRepoDocsMenu(useGitHubRef(ref), lang);
  let releaseBranch = docConfig.releaseBranch;
  let isLatest = ref === releaseBranch || ref === latestVersion;

  return json({
    menu,
    versions,
    latestVersion,
    releaseBranch,
    branches: branchesInMenu,
    currentRef: ref,
    lang,
    isLatest,
    repoUrl: siteConfig.github.repoUrl,
  });
};

export const headers: HeadersFunction = () => {
  return {
    "Cache-Control": CACHE_CONTROL.DEFAULT,
    Vary: "Cookie",
  };
};

export default function DocsLayout() {
  let params = useParams();
  let navigation = useNavigation();
  let navigating =
    navigation.state === "loading" && navigation.formData == null;
  let changingVersions =
    navigating &&
    params.ref &&
    // TODO: we should have `transition.params`
    !navigation.location!.pathname.match(params.ref);

  let location = useLocation();
  let detailsRef = React.useRef<HTMLDetailsElement>(null);

  React.useEffect(() => {
    let details = detailsRef.current;
    if (details && details.hasAttribute("open")) {
      details.removeAttribute("open");
    }
  }, [location]);

  let docsContainer = React.useRef<HTMLDivElement>(null);

  let versionData = useLoaderData<typeof loader>();

  return (
    <div className="[--header-height:theme(spacing.16)] [--nav-width:theme(spacing.72)]">
      <div className="sticky top-0 z-20">
        <Header versionData={versionData} />
        <VersionWarning />
        <NavMenuMobile />
      </div>
      <div
        className={
          changingVersions
            ? "opacity-25 transition-opacity delay-300"
            : undefined
        }
      >
        <InnerContainer>
          <div className="block lg:flex">
            <NavMenuDesktop />
            <div
              ref={docsContainer}
              className={cx(
                // add scroll margin to focused elements so that they aren't
                // obscured by the sticky header
                "[&_*:focus]:scroll-mt-[8rem] lg:[&_*:focus]:scroll-mt-[5rem]",
                // Account for the left navbar
                "min-h-[80vh] lg:ml-3 lg:w-[calc(100%-var(--nav-width))]",
                "lg:pl-6 xl:pl-10 2xl:pl-12",
                !changingVersions && navigating
                  ? "opacity-25 transition-opacity delay-300"
                  : ""
              )}
            >
              <Outlet />
              <div className="pt-8 sm:pt-10 lg:pt-12">
                <Footer />
              </div>
            </div>
          </div>
        </InnerContainer>
      </div>
    </div>
  );
}

function Footer() {
  let { repoUrl } = useLoaderData<typeof loader>();
  return (
    <div className="place-content-center flex justify-between gap-4 border-t border-t-gray-50 py-4 text-sm text-gray-400 dark:border-gray-800">
      <div className="sm:flex sm:items-center sm:gap-2 lg:gap-4">
        <div>
          &copy; 2024{" "}
          <a className="hover:underline" href={siteConfig.url}>
            {siteConfig.project}
          </a>
          . All rights reserved.
        </div>
        <div className="hidden sm:block">•</div>
        <div>
          Docs and examples licensed under{" "}
          <a className="hover:underline" href={siteConfig.license.url}>
            {siteConfig.license.name}
          </a>
        </div>
        <div className="hidden sm:block">•</div>
        <div>
          <EditLink repoUrl={repoUrl} />
        </div>
      </div>
    </div>
  );
}

function VersionWarning() {
  let { isLatest, branches, currentRef } = useLoaderData<typeof loader>();
  if (isLatest) return null;
  let { "*": splat } = useParams();

  return (
    <div className="text-center">
      <div className="p-2 bg-[#0072c3] text-xs text-white">
        <VersionWarningMessage
          branches={branches}
          currentRef={currentRef}
          splat={splat}
        />
      </div>
    </div>
  );
}

function NavMenuMobile() {
  let doc = useDoc();
  return (
    <div className="lg:hidden">
      <DetailsMenu className="group relative flex h-full flex-col">
        <summary
          tabIndex={0}
          className="_no-triangle flex cursor-pointer select-none items-center gap-2 border-b border-gray-50 bg-white px-2 py-3 text-sm font-medium hover:bg-gray-50 active:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800 dark:active:bg-gray-700"
        >
          <div className="flex items-center gap-2">
            <svg aria-hidden className="h-5 w-5 group-open:hidden">
              <use href={`${iconsHref}#chevron-r`} />
            </svg>
            <svg aria-hidden className="hidden h-5 w-5 group-open:block">
              <use href={`${iconsHref}#chevron-d`} />
            </svg>
          </div>
          <div className="whitespace-nowrap font-bold">
            {doc ? doc.attrs.title : "Navigation"}
          </div>
        </summary>
        <div className="absolute h-[66vh] w-full overflow-auto overscroll-contain border-b bg-white p-2 pt-5 shadow-2xl dark:border-gray-700 dark:bg-gray-900 dark:shadow-black">
          <Menu />
        </div>
      </DetailsMenu>
    </div>
  );
}

function NavMenuDesktop() {
  return (
    <div
      className={cx(
        "sticky bottom-0 top-16 -ml-3 hidden w-[--nav-width] flex-col gap-3 self-start overflow-auto pb-10 pr-5 pt-5 lg:flex",
        // Account for the height of the top nav
        "h-[calc(100vh-var(--header-height))]"
      )}
    >
      <div className="[&_*:focus]:scroll-mt-[6rem]">
        <Menu />
      </div>
    </div>
  );
}

function Menu() {
  let { menu } = useLoaderData<typeof loader>();

  return menu ? (
    <nav>
			<Accordion type="multiple" className="w-full">
        {menu.map((category) => {
          // Technically we can have a category that has content (and thus
          // needs it's own link) _and_ has children, so needs to be a details
          // element. It's ridiculous, but it's possible.
          const menuCategoryType = category.hasContent
            ? category.children.length > 0
              ? "linkAndDetails"
              : "link"
            : "details";

          return (
						<AccordionItem
							key={category.attrs.title}
							value={category.attrs.title}
							className="mb-3 border-none"
						>
              {menuCategoryType === "link" ? (
                <MenuSummary as="div">
									<MenuCategoryLink to={category.slug}>{category.attrs.title}</MenuCategoryLink>
                </MenuSummary>
              ) : (
                <MenuCategoryDetails className="group" slug={category.slug}>
									<AccordionTrigger className="py-0">
                  <MenuSummary>
                    {menuCategoryType === "linkAndDetails" ? (
                      <MenuCategoryLink to={category.slug}>
                        {category.attrs.title}
                      </MenuCategoryLink>
                    ) : (
                      category.attrs.title
                    )}
                  </MenuSummary>
									</AccordionTrigger>
									<AccordionContent>
										<nav>
											{category.children.map((doc) => (
                      <MenuLink key={doc.slug} to={doc.slug}>
                        {doc.attrs.title}{" "}
                        {doc.attrs.tag && (
                          <Badge variant="default" className="!font-normal">
                            {doc.attrs.tag}
                          </Badge>
                        )}
                      </MenuLink>
											))}
										</nav>
									</AccordionContent>
                </MenuCategoryDetails>
              )}
						</AccordionItem>
          );
        })}
			</Accordion>
    </nav>
  ) : (
    <div className="bold text-gray-300">Failed to load menu</div>
  );
}

type MenuCategoryDetailsType = {
  className?: string;
  slug: string;
  children: React.ReactNode;
};

function MenuCategoryDetails({ className, children }: MenuCategoryDetailsType) {

	return <div className={cx(className, "relative flex cursor-pointer flex-col")}>{children}</div>;
}

function MenuSummary({
  children,
  as = "summary",
}: {
  children: React.ReactNode;
  as?: "summary" | "div";
}) {
	const sharedClassName = "px-3 py-3  duration-100";
  const wrappedChildren = (
    <div className="flex h-5 w-full items-center justify-between text-base font-semibold leading-[1.125]">
      {children}
    </div>
  );

  if (as === "summary") {
    return (
			<div
        className={cx(
          sharedClassName,
					"outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-800 dark:focus-visible:ring-gray-100",
        )}
      >
        {wrappedChildren}
			</div>
    );
  }

  return (
    <div
      className={cx(
        sharedClassName,
        "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-inset has-[:focus-visible]:ring-blue-800 dark:has-[:focus-visible]:ring-gray-100"
      )}
    >
      {wrappedChildren}
    </div>
  );
}

function MenuCategoryLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  let isActive = useIsActivePath(to);

  return (
    <Link
      prefetch="intent"
      to={to}
      className={cx(
				"outline-none focus-visible:text-foreground my-1",
				isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </Link>
  );
}

function MenuLink({ to, children }: { to: string; children: React.ReactNode }) {
	const isActive = useIsActivePath(to);
  return (
		<Button
			asChild
			variant={isActive ? "secondary" : "ghost"}
			className={cx("w-full justify-start my-1", isActive ? "bg-accent hover:bg-accent" : "")}
		>
			<Link prefetch="intent" to={to}>
				{children}
			</Link>
		</Button>
  );
}

/*
 * Generates a link to GitHub in the footer. View for tags. Edit for branches.
 */
function EditLink({ repoUrl }: { repoUrl: string }) {
  let doc = useDoc();
  let params = useParams();
  let isEditableRef = docConfig.branches.includes(params.ref || "");
  let text = "Edit on GitHub";
  // TODO: deal with translations when we add them with params.lang
  if (doc) {
    let url = `${repoUrl}/edit/${params.ref}/${doc.slug}.md`;

    if (!doc || !isEditableRef) {
      text = "View on GitHub";
      url = `${repoUrl}/blob/${params.ref}/${doc.slug}.md`;
    }

    return (
      <a
        className="flex items-center gap-1 hover:underline"
        href={url}
        target="_blank"
      >
        {text}
        <svg aria-hidden className="h-4 w-4">
          <use href={`${iconsHref}#edit`} />
        </svg>
      </a>
    );
  }
  return null;
}

function InnerContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="m-auto px-4 sm:px-6 lg:px-8 xl:max-w-[90rem]">
      {children}
    </div>
  );
}

function hasDoc(data: unknown): data is { doc: Doc } {
  return !!data && typeof data === "object" && "doc" in data;
}

function useDoc(): Doc | null {
  let data = useMatches().at(-1)?.data;
  if (!hasDoc(data)) return null;
  return data.doc;
}

function useIsActivePath(to: string) {
  let { pathname } = useResolvedPath(to);
  let navigation = useNavigation();
  let currentLocation = useLocation();
  let navigating =
    navigation.state === "loading" && navigation.formData == null;
  let location = navigating ? navigation.location! : currentLocation;
  let match = matchPath(pathname + "/*", location.pathname);
  return Boolean(match);
}

export function useGitHubRef(ref: string): string {
  let branches = docConfig.branches;
  let githubRef = ref;
  if (docConfig.versions.prefix && !branches.includes(ref)) {
    githubRef = docConfig.versions.prefix + ref;
  }
  return githubRef;
}
