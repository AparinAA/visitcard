import React from "react";
import ReactMarkdown from "react-markdown";
import styles from "../../styles/Home.module.css";
import Image from "next/image";

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "";

const textExp = (exp) => {
	if (exp > 5) {
		return "> 5 years";
	} else if (exp === 0) {
		return "< 1 year";
	} else {
		return exp > 1 ? `${exp} years` : `${exp} year`;
	}
};

function ListItemHorizontal(props) {
	const { item } = props;
	const [name = null, exp = 0] = [
		Object.keys(item)[0],
		Object.values(item)[0],
	];
	const lvl = [];

	for (let i = 0; i < Math.min(Math.max(exp, 1), 5); i++) {
		lvl.push(
			<div className={styles.bar} key={i}>
				<Image
					src={`${prefix}/bar.png`}
					width={15}
					height={10}
					alt=""
				/>
			</div>
		);
	}

	const txtExp = textExp(exp);
	return (
		<li>
			<div className={styles.listHorNameItem}>
				<ReactMarkdown components={{ p: React.Fragment }}>
					{name}
				</ReactMarkdown>
			</div>
			<div className={styles.progressbar}>
				{lvl}
				<span>{txtExp}</span>
			</div>
		</li>
	);
}

export default ListItemHorizontal;
