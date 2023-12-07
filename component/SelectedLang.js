import Image from "next/image";
import styles from "../styles/Home.module.css";
import classNames from "classnames";

export default function SelectedLang({ curLang, lang, setLang, prefix }) {
	return (
		<>
			<input
				type="radio"
				name="langRadio"
				className={classNames(styles.buttonLang, styles[lang])}
				onChange={(e) => setLang(e.target.value)}
				value={lang.toUpperCase()}
				id={`button${lang.toUpperCase()}`}
				checked={curLang === lang.toUpperCase()}
			/>
			<label
				htmlFor={`button${lang.toUpperCase()}`}
				className={styles.labelButtonLang}
			>
				<Image
					src={`${prefix}/${lang}flag.svg`}
					alt={lang}
					width={30}
					height={15}
				/>
			</label>
		</>
	);
}
