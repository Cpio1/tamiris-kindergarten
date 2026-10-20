import { NextResponse, type NextRequest } from "next/server";
import { MOBILE_PREFIX, VIEW_COOKIE, type View } from "@shared/config/view";

const YEAR = 60 * 60 * 24 * 365;

/** First-visit guess only; <ViewSync> corrects it by the real window width. */
function guessView(request: NextRequest): View {
  if (request.headers.get("sec-ch-ua-mobile") === "?1") return "mobile";
  const ua = request.headers.get("user-agent") ?? "";
  return /Mobi|iPhone|iPod|Android.+Mobile|Windows Phone/i.test(ua) ? "mobile" : "desktop";
}

/**
 * One public URL for both interfaces: "/" is rewritten to the mobile tree
 * (/mobile) when the visitor's view is mobile.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // The mobile tree is internal — a direct visit lands on the public URL instead.
  if (pathname === MOBILE_PREFIX || pathname.startsWith(`${MOBILE_PREFIX}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(MOBILE_PREFIX.length) || "/";
    const response = NextResponse.redirect(url);
    response.cookies.set(VIEW_COOKIE, "mobile", { path: "/", maxAge: YEAR, sameSite: "lax" });
    return response;
  }

  const saved = request.cookies.get(VIEW_COOKIE)?.value;
  const view: View = saved === "mobile" || saved === "desktop" ? saved : guessView(request);
  if (view === "desktop") return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = MOBILE_PREFIX;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/", "/mobile", "/mobile/:path*"],
};
