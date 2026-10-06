import type { MegaMenu, NavItem } from "@/content/navigation";

export function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function menuHrefs(menu: MegaMenu): string[] {
  return [
    ...menu.groups.flatMap((group) => group.links.map((link) => link.href)),
    ...(menu.cta ? [menu.cta.href] : []),
    ...(menu.provenWork?.items.map((item) => item.link.href) ?? []),
  ];
}

/** A top-level item is active when the current route is its link or any link in its menu. */
export function isNavItemActive(pathname: string, item: NavItem) {
  if (!item.menu) return isActivePath(pathname, item.href);
  return menuHrefs(item.menu).some((href) => isActivePath(pathname, href));
}

export function allNavHrefs(items: NavItem[]): string[] {
  return items.flatMap((item) =>
    item.menu ? menuHrefs(item.menu) : [item.href],
  );
}
