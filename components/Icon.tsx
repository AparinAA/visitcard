import fs from "node:fs";
import path from "node:path";

/**
 * Inlines an SVG from /public at build time. The icons are all under 2 KB, so
 * embedding them removes a dozen render-blocking requests from a page whose
 * whole point is loading instantly.
 */
const cache = new Map<string, string>();

function namespaceIds(svg: string, prefix: string): string {
	const ids = new Set<string>();
	for (const m of svg.matchAll(/\sid="([^"]+)"/g)) ids.add(m[1]);

	for (const id of ids) {
		const esc = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		svg = svg
			.replace(new RegExp(`\\sid="${esc}"`, "g"), ` id="${prefix}-${id}"`)
			.replace(
				new RegExp(`url\\(#${esc}\\)`, "g"),
				`url(#${prefix}-${id})`
			)
			.replace(
				new RegExp(`((?:xlink:)?href)="#${esc}"`, "g"),
				`$1="#${prefix}-${id}"`
			);
	}

	return svg;
}

function load(name: string): string {
	const cached = cache.get(name);
	if (cached) return cached;

	const file = path.join(process.cwd(), "public", `${name}.svg`);
	let svg = fs.readFileSync(file, "utf-8");

	// Drop the XML prolog and any comments; keep only the <svg> element.
	svg = svg.slice(svg.indexOf("<svg"));
	// These are decorative, and several are authored with a hardcoded black
	// fill that vanishes against the dark palette. Brand colours are left
	// alone — only flat black becomes theme-aware.
	svg = svg.replace(/fill="(black|#000|#000000)"/gi, 'fill="currentColor"');
	svg = svg.replace(/<title>.*?<\/title>/gis, "");
	// Let the wrapper element own the size.
	svg = svg.replace(
		/^<svg([^>]*)>/,
		(_, attrs: string) =>
			`<svg${attrs.replace(/\s(width|height)="[^"]*"/g, "")} width="100%" height="100%" preserveAspectRatio="xMidYMid meet" focusable="false" aria-hidden="true">`
	);
	svg = namespaceIds(svg, name);

	cache.set(name, svg);
	return svg;
}

interface IconProps {
	name: string;
	size?: number;
	/** Flags are wider than tall; pass an explicit ratio to keep them sharp. */
	width?: number;
	height?: number;
	className?: string;
}

export function Icon({ name, size = 16, width, height, className }: IconProps) {
	return (
		<span
			className={className ? `icon ${className}` : "icon"}
			style={{ width: width ?? size, height: height ?? size }}
			dangerouslySetInnerHTML={{ __html: load(name) }}
		/>
	);
}
