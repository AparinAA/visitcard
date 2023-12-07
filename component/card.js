import styles from "../styles/Home.module.css";
import { useInView } from "react-intersection-observer";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import React from "react";
import classNames from "classnames";

export default function Card({ title, children, isSticky }) {
	const { ref, inView } = useInView({
		/* Optional options */
		rootMargin: "0px",
		threshold: [0, 1.0],
	});

	return (
		<div className={styles.card} ref={ref}>
			<h2 className={classNames({ [styles.sticky]: inView })}>
				<ReactMarkdown components={{ p: React.Fragment }}>
					{title}
				</ReactMarkdown>
			</h2>
			<div
				className={classNames({
					[styles.fixed]: isSticky,
					[styles.cardBody]: true,
				})}
			>
				{children}
			</div>
		</div>
	);
}
