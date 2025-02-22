import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware(async (auth, _) => {
  await auth.protect({
    unauthenticatedUrl: "https://accounts.christianloschiavo.com/sign-up",
  });
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
