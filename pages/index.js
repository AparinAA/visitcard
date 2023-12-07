import { useInView } from "react-intersection-observer";
import React, { useEffect, useReducer } from "react";

import Head from "next/head";
import styles from "../styles/Home.module.css";
import ChangeLang from "../component/ChangeLang";

import { readData } from "../data/read";
import MagicField from "../component/MagicField";
import GridCards from "../component/GridCards";

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
		url: "https://aparinaleksandr.site",
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
