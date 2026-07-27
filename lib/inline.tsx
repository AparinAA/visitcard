import { Fragment, type ReactNode } from "react";

/**
 * Minimal inline formatter for CV copy: `**strong**`, `*emphasis*` and
 * `` `code` ``. It exists so the content files stay readable without pulling a
 * full markdown pipeline into the bundle — this runs at build time only.
 */
const TOKEN = /\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`/g;

export function inline(text: string): ReactNode {
	const out: ReactNode[] = [];
	let last = 0;

	for (const match of text.matchAll(TOKEN)) {
		const [raw, strong, em, code] = match;
		const at = match.index;

		if (at > last) out.push(text.slice(last, at));

		if (strong !== undefined) {
			out.push(<strong key={at}>{strong}</strong>);
		} else if (em !== undefined) {
			out.push(<em key={at}>{em}</em>);
		} else {
			out.push(<code key={at}>{code}</code>);
		}

		last = at + raw.length;
	}

	if (last === 0) return text;
	if (last < text.length) out.push(text.slice(last));

	return out.map((node, i) => <Fragment key={i}>{node}</Fragment>);
}
