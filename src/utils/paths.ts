/** Join site base path (e.g. /design-patterns-guide/) with a route segment. */
export function sitePath(route = ''): string {
  const raw = import.meta.env.BASE_URL;
  const base = raw.endsWith('/') ? raw : `${raw}/`;
  if (!route) return base;
  const clean = route.startsWith('/') ? route.slice(1) : route;
  return `${base}${clean}`;
}

export function patternPath(slug: string): string {
  return sitePath(`patterns/${slug}`);
}
