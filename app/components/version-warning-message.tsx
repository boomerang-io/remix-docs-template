import { Link } from "@remix-run/react";
import * as React from "react";

export function VersionWarningMessage({
  branches,
  currentGitHubRef,
  splat,
}: {
  branches: string[];
  currentGitHubRef: string;
  splat?: string;
}) {
  // Don't want to show release-next in the menu, but we do want to show
  // the branch-warning
  let warning = [...branches].includes(currentGitHubRef)
    ? `Viewing docs for ${currentGitHubRef} branch, not the latest release`
    : `Viewing docs for an older release`;

  return (
    <>
      {warning}.{" "}
      <Link
        to={splat ? `/docs/en/main/${splat}` : "/docs/en/main"}
        className="underline"
      >
        View latest
      </Link>
    </>
  );
}
