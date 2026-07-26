/** Resolve hash nav links when the user is not on the homepage. */
export function resolveNavHref(href: string, pathname: string) {
  if (href.startsWith("#")) {
    return pathname === "/" ? href : `/${href}`;
  }
  return href;
}
