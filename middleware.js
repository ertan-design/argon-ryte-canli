// Vercel Edge Middleware — Zero-Folder Wildcard Subdomain Router (Argon r27)
// Tek kod tabaniyla sinirsiz tasarimci (*.afair.studio), 1.000 konut (*.modernatasehir.com) ve tum sokaklar (*.atasehirmodern.com)
export const config = { matcher: ["/((?!_next|favicon.svg|gpt.json|manifest.json).*)"] };

export default function middleware(request) {
  const url = new URL(request.url);
  const host = (request.headers.get("host") || "").toLowerCase().split(":")[0];
  const parts = host.split(".");
  if (parts.length >= 3) {
    const sub = parts[0];
    const root = parts.slice(1).join(".");
    if (sub !== "www") {
      url.searchParams.set("tenant", sub);
      url.searchParams.set("root", root);
      return Response.redirect(url, 307);
    }
  }
  return undefined;
}
