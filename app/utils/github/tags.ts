import { LRUCache } from "lru-cache";
import parseLinkHeader from "parse-link-header";
import semver from "semver";
import type { Octokit } from "octokit";
import { docConfig } from "~/config/doc";

type CacheContext = { octokit: Octokit; releasePackage: string };
declare global {
  var tagsCache: LRUCache<string, string[], CacheContext>;
}

/**
 * Fetches the repo tags
 */
export async function getTags(
  repo: string,
  { octokit, releasePackage }: CacheContext,
) {
  return tagsCache.fetch(repo, {
    context: { octokit, releasePackage },
  });
}

export function getLatestVersion(tags: string[]) {
  return tags.filter((tag) =>
    semver.satisfies(tag, "*", { includePrerelease: false }),
  )[0];
}

/**
 * Returns the latest version of each major version
 */
export function getLatestVersionHeads(tags: string[]) {
  let heads = new Map<string, string>();
  for (let tag of tags) {
    let prefix = semver.major(tag);
    if (docConfig.versions.includeMinor) {
      prefix += "." + semver.minor(tag);
    }
    let head = heads.get(prefix);
    if (!head || semver.gt(tag, head)) {
      heads.set(prefix, tag);
    }
  }
  return Array.from(heads.values()).sort(semver.compare).reverse();
}

// global for SS "HMR", we need a better story here
global.tagsCache ??= new LRUCache<string, string[], CacheContext>({
  // let tagsCache = new LRUCache<string, string[]>({
  max: 3,
  ttl: 1000 * 60 * 5, // 5 minutes, so we can see new tags quickly
  allowStale: true,
  noDeleteOnFetchRejection: true,
  fetchMethod: async (key, _, { context }) => {
    console.log("Fetching fresh tags (releases)");
    let [owner, repo] = key.split("/");
    return getAllReleases(owner, repo, context.releasePackage, context);
  },
});

// TODO: implementation details of the remix site leaked into here cause I'm in
// a hurry now, sorry!
export async function getAllReleases(
  owner: string,
  repo: string,
  primaryPackage: string,
  {
    octokit,
    page = 1,
    releases = [],
  }: {
    octokit: Octokit;
    page?: number;
    releases?: string[];
  },
): Promise<string[]> {
  console.log("Fetching fresh releases, page", page);
  let { data, headers, status } = await octokit.rest.repos.listReleases({
    mediaType: { format: "json" },
    owner,
    repo,
    per_page: 100,
    page,
  });

  if (status !== 200) {
    throw new Error(`Failed to fetch releases: ${data}`);
  }

  //Set regex to semver or prefixed semver
  let regex = new RegExp(`^${docConfig.versions.prefix}[0-9]`);

  releases.push(
    ...data
      .filter((release) => {
        return Boolean(
          // Check the release name
          // ideally all we care about is release.name, but if not set,
          // we check the tag name too
          regex.test(release?.name || "") || regex.test(release.tag_name),
        );
      })
      .map((release) => {
        return (
          // pre-changesets, tag_name started with "v"
          regex.test(release.tag_name)
            ? release.tag_name
            : "unknown"
        );
      }),
  );

  let parsed = parseLinkHeader(headers.link);
  if (parsed?.next) {
    return await getAllReleases(owner, repo, primaryPackage, {
      page: page + 1,
      releases,
      octokit,
    });
  }

  return releases;
}
