import { CursorTrail } from "@/components/CursorTrail";
import { Hero } from "@/components/Hero";
import { Icon } from "@/components/Icon";
import { LangSwitch } from "@/components/LangSwitch";
import { ScrollMotion } from "@/components/ScrollMotion";
import { Sections } from "@/components/Sections";
import { LANGS } from "@/data/cv";

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Page() {
	return (
		<>
			<CursorTrail />
			<ScrollMotion />

			<Hero />

			<main className="main" id="main">
				<div className="toolbar">
					{LANGS.map((lang) => (
						<a
							key={lang}
							className="toolbar__cv"
							data-l={lang}
							href={`${prefix}/Aparin_CV_${lang}.pdf`}
							target="_blank"
							rel="noreferrer"
							download
						>
							<Icon name="pdfsymbol" width={16} height={17} />
							<span>CV</span>
						</a>
					))}

					<LangSwitch
						flags={{
							EN: <Icon name="enflag" width={26} height={13} />,
							RU: <Icon name="ruflag" width={26} height={13} />,
						}}
					/>
				</div>

				<Sections />

				<footer className="footer">
					Aleksandr Aparin · {new Date().getFullYear()}
				</footer>
			</main>
		</>
	);
}
