"use client";

import { useEffect, useState, type ReactNode } from "react";
import { LANG_KEY, LANGS, type Lang } from "@/data/cv";

/**
 * The active language lives in `document.documentElement.dataset.lang` and the
 * inline script in the document head sets it before first paint, so the correct
 * copy is painted immediately and the button highlight (pure CSS, keyed off the
 * same attribute) is never wrong. React only wires up the clicks.
 */
export function LangSwitch({ flags }: { flags: Record<Lang, ReactNode> }) {
	const [lang, setLang] = useState<Lang>("EN");

	useEffect(() => {
		const active = document.documentElement.dataset.lang;
		if (active === "RU" || active === "EN") setLang(active);
	}, []);

	const pick = (next: Lang) => {
		const root = document.documentElement;
		root.dataset.lang = next;
		root.lang = next.toLowerCase();
		setLang(next);
		try {
			localStorage.setItem(LANG_KEY, next);
		} catch {
			// Private mode or blocked storage: the choice just won't persist.
		}
	};

	return (
		<div className="lang" role="group" aria-label="Language">
			{LANGS.map((code) => (
				<button
					key={code}
					type="button"
					className="lang__btn"
					data-lang={code}
					aria-pressed={lang === code}
					aria-label={code === "EN" ? "English" : "Русский"}
					onClick={() => pick(code)}
				>
					{flags[code]}
				</button>
			))}
		</div>
	);
}
