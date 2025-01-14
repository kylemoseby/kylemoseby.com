import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  output: 'export',
  reactStrictMode: true,
  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // trailingSlash: true,

  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,

  // Optional: Change the output directory `out` -> `dist`
  basePath: '',
  distDir: 'docs',
};

export default nextConfig;
