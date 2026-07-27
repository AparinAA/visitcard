import type { ReactNode } from "react";
import type { Lang, Text } from "@/data/cv";
import { inline } from "@/lib/inline";

const HTML_LANG: Record<Lang, string> = { EN: "en", RU: "ru" };

/**
 * Renders both languages into the static HTML and lets CSS reveal the active
 * one (see `html[data-lang]` rules in globals.css). Switching languages then
 * costs no JavaScript, no re-render and no request — which is the point of a
 * page that must appear instantly.
 */
export function T({ v, as: Tag = "span" }: { v: Text; as?: "span" | "div" }) {
	// Identical in both languages — emit it once.
	if (v.EN === v.RU) return <Tag>{inline(v.EN)}</Tag>;

	return (
		<>
			<Tag lang={HTML_LANG.EN} data-l="EN">
				{inline(v.EN)}
			</Tag>
			<Tag lang={HTML_LANG.RU} data-l="RU">
				{inline(v.RU)}
			</Tag>
		</>
	);
}

/** Same idea, but the caller supplies the markup for each language. */
export function PerLang({
	render,
}: {
	render: (lang: Lang) => ReactNode;
}): ReactNode {
	return (
		<>
			<span lang={HTML_LANG.EN} data-l="EN">
				{render("EN")}
			</span>
			<span lang={HTML_LANG.RU} data-l="RU">
				{render("RU")}
			</span>
		</>
	);
}
