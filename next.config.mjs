import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
	// Fully static site: `next build` emits ./out with no server runtime.
	output: "export",
	// A lockfile one directory up would otherwise be picked as the root.
	outputFileTracingRoot: dirname(fileURLToPath(import.meta.url)),
	basePath,
	assetPrefix: basePath || undefined,
	reactStrictMode: true,
	trailingSlash: true,
	// next/image needs a server to optimise; the icons are inlined at build
	// time instead, so the loader is only a fallback for the few raster assets.
	images: { unoptimized: true },
};

export default nextConfig;
