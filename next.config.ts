import type { NextConfig } from "next";

// GitHub Pages serves the site from https://<user>.github.io/paymama/, so the
// workflow sets GITHUB_PAGES=true to build a static export under that sub-path.
// (cacheComponents / partialPrefetching are not supported in export mode.)
const pages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = pages
  ? { output: "export", basePath: "/paymama", trailingSlash: true, images: { unoptimized: true } }
  : { cacheComponents: true, partialPrefetching: true };

export default nextConfig;
