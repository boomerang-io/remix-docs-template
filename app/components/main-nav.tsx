import * as React from "react";
import { Link } from "@remix-run/react";
import { useLocation } from "@remix-run/react";
import { siteConfig } from "~/config/site";
import { navConfig } from "~/config/nav";
import { cn } from "~/utils/theme";

export function MainNav() {
  const location = useLocation();

  return (
    <div className="mr-4 hidden md:flex">
      <Link to="/" className="mr-6 flex items-center space-x-2">
        <img src="/backstop-logo.svg" className="h-9" alt="Backstop" />
        {/* <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span> */}
      </Link>
      <nav className="flex items-center space-x-6 text-sm">
        {navConfig.mainNav?.map(
          (item) =>
            item.href && (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
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
    </div>
  );
}
