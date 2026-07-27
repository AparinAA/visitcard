import { Fragment, type CSSProperties } from "react";
import { HERO } from "@/data/cv";
import { Icon } from "./Icon";
import { PerLang, T } from "./T";

/**
 * Splits a line into words so each can be revealed on its own delay. The
 * separating spaces stay real text nodes, so the heading still reads and copies
 * as a sentence rather than onerunontoken.
 */
function Words({ text, delay = 0 }: { text: string; delay?: number }) {
	return (
		<>
			{text.split(" ").map((word, i) => (
				<Fragment key={i}>
					{i > 0 && " "}
					<span
						className="word"
						style={{ "--d": `${delay + i * 55}ms` } as CSSProperties}
					>
						{word}
					</span>
				</Fragment>
			))}
		</>
	);
}

export function Hero() {
	return (
		<header className="hero">
			<div className="hero__inner">
				<h1 className="hero__greeting">
					<PerLang
						render={(lang) => <Words text={HERO.greeting[lang]} />}
					/>
				</h1>

				<p className="hero__name">
					<PerLang
						render={(lang) => (
							<Words text={HERO.name[lang]} delay={260} />
						)}
					/>
				</p>

				<p className="hero__role">
					<T v={HERO.role} />
				</p>

				<div className="hero__scroll" aria-hidden="true">
					<span className="hero__scrollLabel">
						<T v={HERO.scrollHint} />
					</span>
					<Icon name="caret-down-fill" size={14} />
				</div>
			</div>
		</header>
	);
}
