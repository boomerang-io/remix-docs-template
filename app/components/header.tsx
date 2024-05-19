import { Link, useNavigate } from "@remix-run/react";
import { siteConfig } from "~/config/site";
import { MainNav } from "~/components/main-nav";
import { MobileNav } from "~/components/mobile-nav";
import { Button } from "~/components/ui/button";

type HeaderProps = {
  className: string;
};

export function Header(props: HeaderProps) {
  let navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-2 font-medium">
            <Link
              className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent h-9 px-4 py-2 transition-colors hover:text-foreground/80"
              to="https://app.backstop.dev/"
            >
              Log In
            </Link>
            <Button
              className="transition-colors"
              type="button"
              onClick={() => navigate("/signup")}
            >
              Get Started
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
