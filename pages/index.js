import { useInView } from "react-intersection-observer";
import React, { useEffect, useReducer, useState } from "react";

import Head from "next/head";
//import Script from 'next/script';
import styles from "../styles/Home.module.css";
import Card from "../component/card";
import SubcardCard from "../component/subcard";
import ChangeLang from "../component/ChangeLang";

import { readData } from "../data/read";
import { drawMagicLine } from "../lib/helpFunction";

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

	useEffect(() => {
		setLang(window.navigator.language);
		let id = drawMagicLine();

		return () => clearTimeout(id);
	}, []);

	const [ref, inView, entry] = useInView({
		/* Optional options */
		root: null,
		rootMargin: "100px",
		threshold: [...Array(num).keys()].map((index) => (index + 1) * rate),
	});

	const [lang, setLang] = useReducer(reducer, "EN");
	const listCard = data[lang];
	const ratio = entry?.intersectionRatio ?? 1;

	const typeGrid = "info"; //'mainGrid';

	const gridCards = (
		<div className={styles[typeGrid]} id="info">
			{listCard?.map((item) => {
				item.info.sort((a, b) => (a?.id && b?.id ? a?.id - b?.id : 1));
				return (
					<Card
						title={item?.title}
						key={`card_${item.id}`}
						isSticky={item?.id === 1}
					>
						{item.info.map((infItem) => {
							return (
								<SubcardCard
									key={`subcard_${item.id}_${infItem?.id}`}
									title={infItem?.title}
									description={infItem?.description}
									subdescription={infItem?.subdescription}
									body={infItem?.child}
								/>
							);
						})}
						{item?.child}
					</Card>
				);
			})}
		</div>
	);

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
				<canvas
					id="mouseTrailCanvas"
					style={{
						display: "block",
						position: "absolute",
						top: 0,
						left: 0,
					}}
				></canvas>
			</div>

			<main
				className={styles.main}
				id="main"
				style={{ opacity: 1 - 1.2 * ratio ** 3 }}
			>
				<ChangeLang props={{ prefix, inView, setLang, lang }} />
				{gridCards}
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
