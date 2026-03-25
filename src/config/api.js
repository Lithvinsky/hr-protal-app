/**
 * API base URL without trailing slash.
 * Dev: leave REACT_APP_API_URL unset — requests use relative /api/... and CRA proxy targets the Express server.
 * Production: set to your API host only, e.g. https://your-api.railway.app (paths still include /api/...).
 */
function normalizeBase(url) {
  if (!url || typeof url !== "string") return "";
  return url.replace(/\/+$/, "");
}

export function apiUrl(path) {
  const segment = path.startsWith("/") ? path : `/${path}`;
  const base = normalizeBase(process.env.REACT_APP_API_URL);
  if (base) return `${base}${segment}`;
  return segment;
}

/** False when built for production without REACT_APP_API_URL (Vercel will call same-origin /api and login will fail). */
export function isApiBaseConfiguredForProduction() {
  if (process.env.NODE_ENV !== "production") return true;
  return Boolean(normalizeBase(process.env.REACT_APP_API_URL));
}
