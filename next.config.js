/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
};
const images = {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: ["leetcode.com", "assets.leetcode.com"],
    minimumCacheTTL: 31536000,
};

module.exports = {
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
    nextConfig,
    images,
};
