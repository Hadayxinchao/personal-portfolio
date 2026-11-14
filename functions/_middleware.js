// Send visitors on the default Pages hostname to the custom domain so search
// engines see a single canonical site. Preview deployments
// (<hash>.hadayxinchao.pages.dev) are left reachable for testing.
const LEGACY_HOST = "hadayxinchao.pages.dev";
const CANONICAL_HOST = "portfolio.hadayxinchao.com";

export async function onRequest({ request, next }) {
  const url = new URL(request.url);

  if (url.hostname === LEGACY_HOST) {
    url.hostname = CANONICAL_HOST;
    url.protocol = "https:";
    url.port = "";
    return Response.redirect(url.toString(), 301);
  }

  return next();
}
