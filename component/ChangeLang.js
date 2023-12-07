import React from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import SelectedLang from "./SelectedLang";
import classNames from "classnames";

function ChangeLang({ props }) {
	const { prefix, inView, setLang, lang } = props;
	return (
		<div
			className={classNames({
				[styles.sticky]: !inView,
				[styles.langMenu]: true,
			})}
			style={{ zIndex: "100" }}
		>
			{
				<a
					href={`${prefix}/Aparin_CV_${lang}.pdf`}
					target="_blank"
					rel="noreferrer"
					className={styles.downloadCvIcon}
				>
					<Image
						src={`${prefix}/pdfsymbol.svg`}
						alt="ru"
						width={30}
						height={15}
					/>
				</a>
			}

			<SelectedLang
				curLang={lang}
				lang="en"
				setLang={setLang}
				prefix={prefix}
			/>

			<SelectedLang
				curLang={lang}
				lang="ru"
				setLang={setLang}
				prefix={prefix}
			/>
		</div>
	);
}

export default React.memo(ChangeLang);
