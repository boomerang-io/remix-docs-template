import * as React from "react";
import { Link, useLocation, useNavigate } from "@remix-run/react";
import { siteConfig } from "~/config/site";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { navConfig } from "~/config/nav";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import iconsHref from "~/icons.svg";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectLabel,
  SelectSeparator,
  SelectGroup,
  Select,
} from "~/components/ui/select";
import { cn } from "~/utils/theme";

type HeaderProps = {
  className?: string;
  versionData?: {
    versions: string[];
    latestVersion?: string;
    releaseBranch?: string;
    branches?: string[];
    currentGitHubRef?: string;
    lang?: string;
  };
};

export function Header({ className, versionData }: HeaderProps) {
  let navigate = useNavigate();
  let {
    versions,
    latestVersion,
    releaseBranch,
    branches,
    currentGitHubRef,
    lang,
  } = versionData || {};

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="mr-6 flex items-center space-x-4">
            <BookIcon className="h-6 w-6" />
            <span className="sr-only">{siteConfig.name}</span>
            <span className="font-medium sm:inline-block sm:text-">
              {siteConfig.name}
            </span>
          </Link>
          {versionData && (
            <nav className="flex items-center text-sm">
              <Select
                onValueChange={(v) => navigate(`/docs/${lang}/` + v)}
                defaultValue={currentGitHubRef}
              >
                <SelectTrigger
                  id="version"
                  className="w-40 border border-none shadow-none rounded-md h-md py-2 text-md font-medium bg-accent focus:outline-none"
                >
                  <SelectValue placeholder="Select a version" />
                </SelectTrigger>
                <SelectContent position="popper" className="w-56 r-md">
                  <SelectGroup>
                    {branches && branches.length > 0 && (
                      <SelectLabel className="text-sm text-muted-foreground font-light">
                        Branches
                      </SelectLabel>
                    )}
                    <SelectSeparator />
                    {branches?.map((branch) => (
                      <SelectItem key={branch} value={branch}>
                        {branch}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                  <SelectGroup>
                    {versions && versions?.length > 0 && (
                      <SelectLabel className="text-sm text-muted-foreground font-light">
                        Tags
                      </SelectLabel>
                    )}
                    <SelectSeparator />
                    {versions?.map((version) => (
                      <SelectItem key={version} value={version}>
                        {version}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </nav>
          )}
        </div>
        <MainNav />
        <MobileNav />
      </div>
    </header>
  );
}

function MainNav() {
  const location = useLocation();

  return (
    <div className="hidden md:flex flex-1 items-center justify-between space-x-2 md:justify-end">
      <nav className="flex items-center space-x-6 text-sm font-medium">
        {navConfig.mainNav?.map(
          (item) =>
            item.href && (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "transition-colors hover:text-foreground hover:underline underline-offset-4",
                  location.pathname === "/features"
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                {item.title}
              </Link>
            )
        )}
      </nav>
      <div className="flex items-center gap-1">
        <Link
          key="github"
          to="https://github.com/remix-run/remix"
          className={cn(
            "h-10 w-10 place-items-center text-black hover:text-gray-600  md:grid"
          )}
        >
          <span className="sr-only">"View on GitHub"</span>
          <svg aria-hidden style={{ width: `24px`, height: `24px` }}>
            <use href={`${iconsHref}#github`} />
          </svg>
        </Link>
        <Link
          key="slack"
          to="https://join.slack.com/t/boomerang-io/shared_invite/zt-pxo2yw2o-c3~6YvWkKNrKIwhIBAKhaw"
          className={cn(
            "h-10 w-10 place-items-center text-black hover:text-gray-600 md:grid"
          )}
        >
          <span className="sr-only">"Chat on Slack"</span>
          <img
            aria-hidden
            style={{ width: `24px`, height: `24px` }}
            src="/icons/slack.svg"
          />
        </Link>
      </div>
    </div>
  );
}

function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <div className="md:hidden flex flex-1 items-center space-x-2 justify-end">
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="mr-2 justify-end px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          >
            <HamburgerMenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
      </div>
      <SheetContent side="left" className="pr-0">
        <Link href="/" className="flex items-center">
          {/* <Icons.logo className="mr-2 h-4 w-4" /> */}
          <span className="font-bold">{siteConfig.name}</span>
        </Link>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            {navConfig.mainNav?.map(
              (item) =>
                item.href && (
                  <Link key={item.href} to={item.href}>
                    {item.title}
                  </Link>
                )
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

function BookIcon(props) {
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
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}
