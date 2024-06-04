import { type LoaderFunctionArgs } from "@remix-run/node";
import * as React from "react";
import { json } from "@remix-run/node";
import { handleRedirects } from "~/utils/http.server";
import invariant from "tiny-invariant";
import { getRepoImage } from "~/utils/github";
import { docConfig } from "~/config/doc";

export async function loader({ params, request }: LoaderFunctionArgs) {
  invariant(params.ref, "expected `ref` params");
  try {
    let pathPrefix = docConfig.pathToDocs ? `${docConfig.pathToDocs}/` : "";
    let slug = `${pathPrefix}${params["*"]}`;
    let image = await getRepoImage(params.ref, slug);
    if (!image) throw null;
    return new Response(image, {
      headers: {
        "Content-Type": "image/png",
        // starting with 1 day, may need to be longer as these images don't change often
        // could also make it dependent on the date of the post
        "Cache-Control": `max-age=${60 * 60 * 24}`,
      },
    });
  } catch (_) {
    if (params.ref === "main" && params["*"]) {
      // Only perform redirects for 404's on `main` URLs which are likely being
      // redirected from the root `/docs/{slug}`.  If someone is direct linking
      // to a missing slug on an old version or tag, then a 404 feels appropriate.
      handleRedirects(`/docs/${params["*"]}`);
    }
    throw json(null, { status: 404 });
  }
}
