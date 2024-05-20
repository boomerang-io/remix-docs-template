import { getDoc, getMenu, getImage } from "./docs";
import { getBranches } from "./branches";
import { getLatestVersion, getTags } from "./tags";
import invariant from "tiny-invariant";
import type { Octokit } from "octokit";
import { env } from "~/utils/env.server";

export { validateParams } from "./params";
export { getRepoTarballStream } from "./repo-tarball";
export {
  getLatestVersion,
  getAllReleases,
  getLatestVersionHeads,
} from "./tags";

export type { Doc } from "./docs";

const REPO = env.SOURCE_REPO;

export function getRepoTags({
  octokit,
  releasePackage,
}: {
  octokit: Octokit;
  releasePackage: string;
}) {
  return getTags(REPO, { octokit, releasePackage });
}

export function getRepoBranches({ octokit }: { octokit: Octokit }) {
  return getBranches(REPO, { octokit });
}

export async function getLatestRepoTag({
  octokit,
  releasePackage,
}: {
  octokit: Octokit;
  releasePackage: string;
}): Promise<string> {
  let tags = await getTags(REPO, { octokit, releasePackage });
  invariant(tags, "Expected tags in getLatestRepoTag");
  return getLatestVersion(tags);
}

export function getRepoDocsMenu(ref: string, lang: string) {
  return getMenu(REPO, ref, lang);
}

export function getRepoDoc(ref: string, slug: string) {
  return getDoc(REPO, ref, slug);
}

export function getRepoImage(ref: string, slug: string) {
  return getImage(REPO, ref, slug);
}
