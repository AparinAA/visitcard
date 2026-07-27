import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { LANG_KEY } from "@/data/cv";
import "./globals.css";

const SITE = "https://aleksandraparin.site";

export const metadata: Metadata = {
	metadataBase: new URL(SITE),
	title: "Aleksandr Aparin — Senior JavaScript Developer",
	description:
		"CV of Aleksandr Aparin: Senior JavaScript Developer and mathematician. TypeScript, Node.js, React, Next.js, ad delivery systems and AI workflows.",
	openGraph: {
		title: "Aleksandr Aparin — Senior JavaScript Developer",
		description: "CV of Aleksandr Aparin, mathematician and engineer.",
		url: SITE,
		siteName: "Visit card",
		locale: "en_US",
		type: "profile",
	},
	icons: { icon: "/favicon.svg", shortcut: "/aa.ico" },
};

export const viewport: Viewport = {
	themeColor: "#ffffff",
	width: "device-width",
	initialScale: 1,
};

/**
 * Picks the language before first paint so the correct copy is in the very
 * first frame — both languages are already in the HTML, this only decides which
 * one CSS reveals.
 */
const LANG_BOOTSTRAP = `(function(){try{
var s=localStorage.getItem(${JSON.stringify(LANG_KEY)});
var l=(s==="RU"||s==="EN")?s:((navigator.languages||[navigator.language||""]).some(function(x){return /^ru/i.test(x)})?"RU":"EN");
var d=document.documentElement;d.dataset.lang=l;d.lang=l.toLowerCase();
}catch(e){document.documentElement.dataset.lang="EN"}})()`;

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" data-lang="EN" suppressHydrationWarning>
			<head>
				<script
					dangerouslySetInnerHTML={{ __html: LANG_BOOTSTRAP }}
				/>
			</head>
			<body>
				{children}
				<Script id="metrika" strategy="lazyOnload">
					{`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();
for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
ym(98850439, "init", {clickmap:true, trackLinks:true, accurateTrackBounce:true});`}
				</Script>
			</body>
		</html>
	);
}
