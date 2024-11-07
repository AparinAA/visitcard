import { useInView } from "react-intersection-observer";
import React, { useEffect, useReducer } from "react";

import Head from "next/head";
import styles from "../styles/Home.module.css";
import ChangeLang from "../component/ChangeLang";

import { readData } from "../data/read";
import MagicField from "../component/MagicField";
import GridCards from "../component/GridCards";
import Script from "next/script";

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "";

function reducer(state, action) {
	const lang = action;
	if (/ru/gi.test(lang)) {
		return "RU";
	}

	return "EN";
}

export const metadata = {
	openGraph: {
		title: "Aparin Aleksandr",
		description: "The CV page",
		url: "https://aparinaleksandr.me",
		siteName: "Visitcard",
		locale: "en_US",
		type: "website",
	},
};

function Home({ data }) {
	const num = 100;
	const rate = 1 / (num + 1);

	const [lang, setLang] = useReducer(reducer, "EN");

	const [ref, inView, entry] = useInView({
		root: null,
		rootMargin: "100px",
		threshold: new Array(num).fill().map((_, index) => (index + 1) * rate),
	});

	const ratio = entry?.intersectionRatio ?? 1;

	useEffect(() => {
		setLang(window.navigator.language);
	}, []);

	return (
		<div className={styles.container} id="body">
			<Head>
				<title>Visit card</title>
				<meta name="description" content="" />
				<link rel="icon" href={`${prefix}/aa.ico`} />
			</Head>
			<Script id="metrika" nonce="XUENAJFW123">
				{`
					(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
					m[i].l=1*new Date();
					for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
					k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
					(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

					ym(98850439, "init", {
							clickmap:true,
							trackLinks:true,
							accurateTrackBounce:true
					});
					`}
			</Script>
			<noscript>
				<div>
					<img
						src="https://mc.yandex.ru/watch/98850439"
						style={{ position: "absolute", left: "-9999px" }}
						alt=""
					/>
				</div>
			</noscript>
			<div
				className={styles.title}
				id="title"
				ref={ref}
				style={{
					opacity: ratio ** 9 - 0.1,
					backgroundImage: `url(${prefix}/welcomtextMini.svg)`,
				}}
			>
				<MagicField />
			</div>

			<main
				className={styles.main}
				id="main"
				style={{ opacity: 1 - 1.2 * ratio ** 3 }}
			>
				<ChangeLang props={{ prefix, inView, setLang, lang }} />

				<GridCards listCard={data[lang]} />

				<footer className={styles.footer}>
					Powered by Aparin Aleksandr
				</footer>
			</main>
		</div>
	);
}

export default React.memo(Home);

export async function getStaticProps() {
	const data = readData(prefix);
	return {
		props: { data },
	};
}
