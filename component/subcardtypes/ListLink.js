import React from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import styles from "../../styles/Home.module.css";

function ListLink({ data }) {
	const { prefix, type, item } = data;

	const img = item?.ico ? (
		<Image
			src={`${prefix}/${item?.ico}.svg`}
			width={16}
			height={16}
			alt=""
		/>
	) : (
		""
	);

	return (
		<a
			className={`${styles[type]}`}
			rel="noreferrer"
			href={item.url}
			target="_blank"
		>
			{img}
			<ReactMarkdown components={{ p: React.Fragment }}>
				{item.name}
			</ReactMarkdown>
		</a>
	);
}

export default ListLink;
