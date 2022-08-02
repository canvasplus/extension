export function isPathnameCompatible(fullUrl) {
  const asUrl = new URL(fullUrl);

  if (
    asUrl.hostname !== new URL(location.href).hostname ||
    asUrl.searchParams.get("view")?.startsWith("original")
  )
    return false;

  const pathname = asUrl.pathname.replace(/\/+$/, "");

  const path = new URL(asUrl).pathname.split("/").filter((n) => n);

  if (pathname === "" || path[2] === "pages") {
    return true;
  }

  return false;
}
