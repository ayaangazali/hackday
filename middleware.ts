import { stackServerApp } from "@/stack";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for auth pages to prevent redirect loops
  const authPages = ["/sign-in", "/sign-up", "/forgot-password", "/auth"];
  if (authPages.some(page => pathname.startsWith(page))) {
    return NextResponse.next();
  }

  try {
    const user = await stackServerApp.getUser();

    // Protected routes - redirect to sign-in if not authenticated
    const protectedRoutes = [
      "/pages/dashboard",
      "/pages/statistics", 
      "/pages/saved-videos",
      "/pages/upload",
      "/pages/realtimeStreamPage",
      "/pages/video",
      "/protected"
    ];
    
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
    
    if (isProtectedRoute && !user) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // If authenticated and trying to access home, redirect to dashboard
    if (pathname === "/" && user) {
      return NextResponse.redirect(new URL("/pages/dashboard", request.url));
    }

    return NextResponse.next();
  } catch (e) {
    // If there's an error checking auth, allow the request to continue
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
