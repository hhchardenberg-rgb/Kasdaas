"use client";
/**
 * In-app navigation history for this browser tab.
 *
 * The browser's own history can't tell us whether the previous entry belongs to
 * the guide (a guest may arrive from WhatsApp, a bookmark or the home screen).
 * We keep our own stack of guide pages so the back button never leaves the app.
 */
const KEY = "kd:nav";

function read(): string[] {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function write(stack: string[]) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(stack.slice(-50)));
  } catch {}
}

/** Record a page view. Going back to the previous page pops instead of pushes. */
export function recordNavigation(path: string) {
  if (/\/welcome\/?$/.test(path)) return;
  const stack = read();
  if (stack[stack.length - 1] === path) return;
  if (stack[stack.length - 2] === path) stack.pop();
  else stack.push(path);
  write(stack);
}

/** The current page is being replaced (router.replace): swap the top of the stack. */
export function replaceCurrent(path: string) {
  const stack = read();
  if (stack.length) stack[stack.length - 1] = path;
  else stack.push(path);
  write(stack);
}

/** True when the previous history entry is a page of the guide. */
export function hasInAppPrevious(): boolean {
  return read().length >= 2;
}

/** Logical parent page, used when there is no in-app page to go back to. */
export function parentPath(pathname: string): string {
  const m = pathname.match(/^\/(nl|en|es)(\/.*)?$/);
  if (!m) return "/";
  const base = `/${m[1]}`;
  const rest = (m[2] ?? "").replace(/\/$/, "");
  const rules: [RegExp, string][] = [
    [/^\/villa\/.+/, "/villa"],
    [/^\/help$/, "/villa"],
    [/^\/places\/.+/, "/discover"],
    [/^\/discover\/.+/, "/discover"],
    [/^\/plans\/.+/, "/plans"],
    [/^\/(plans|map)$/, "/discover"],
    [/^\/(favorites|good-to-know|search)$/, "/more"],
    [/^\/boat\/.+/, "/boat"],
  ];
  for (const [re, parent] of rules) if (re.test(rest)) return base + parent;
  return base;
}
