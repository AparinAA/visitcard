import { SECTIONS, type Job, type Section, type Text } from "@/data/cv";
import { Icon } from "./Icon";
import { T } from "./T";
import { LeetCodeStats } from "./LeetCodeStats";

/**
 * The chips show a bare number under a "Years of experience" caption, which
 * reads fine visually but not aloud — this spells the unit out for assistive
 * tech, in whichever language is active.
 */
function yearsText(n: number): Text {
	const last = n % 10;
	const teen = n % 100 >= 11 && n % 100 <= 14;
	const ru =
		!teen && last === 1
			? "год"
			: !teen && last >= 2 && last <= 4
				? "года"
				: "лет";

	return { EN: n === 1 ? "1 year" : `${n} years`, RU: `${n} ${ru}` };
}

function JobEntry({ job }: { job: Job }) {
	return (
		<article className="job">
			<h3 className="job__role">
				<T v={job.role} />
			</h3>
			<p className="job__company">{job.company}</p>
			<p className="job__period">
				<T v={job.period} />
			</p>

			{job.note && (
				<p className="job__note">
					<T v={job.note} />
				</p>
			)}
			{job.scope && (
				<p className="job__scope">
					<T v={job.scope} />
				</p>
			)}

			<ul className="job__bullets">
				{job.bullets.map((bullet, i) => (
					<li key={i}>
						<T v={bullet} />
					</li>
				))}
			</ul>

			{job.stack && (
				<p className="job__stack">
					<span className="job__stackLabel">Tech stack</span>
					{job.stack}
				</p>
			)}
		</article>
	);
}

function Body({ section }: { section: Section }) {
	switch (section.kind) {
		case "about":
			return (
				<>
					<p className="about__name">
						<T v={section.name} />
					</p>
					<ul className="links">
						{section.links.map((link) => (
							<li key={link.url}>
								<a
									href={link.url}
									target="_blank"
									rel="noreferrer"
								>
									{link.icon && <Icon name={link.icon} />}
									<T v={link.label} />
								</a>
							</li>
						))}
					</ul>
					<LeetCodeStats />
				</>
			);

		case "skills":
			return (
				<>
					<ul className="skills">
						{section.items.map((skill) => (
							<li className="skill" key={skill.name}>
								<span className="skill__name">
									{skill.name}
								</span>
								<span
									className="skill__years"
									aria-hidden="true"
								>
									{skill.years}
								</span>
								<span className="sr-only">
									<T v={yearsText(skill.years)} />
								</span>
							</li>
						))}
					</ul>
				</>
			);

		case "jobs":
			return (
				<div className="jobs">
					{section.items.map((job) => (
						<JobEntry key={job.company + job.period.EN} job={job} />
					))}
				</div>
			);

		case "links":
			return (
				<ul className="links">
					{section.items.map((link) => (
						<li key={link.url}>
							<a href={link.url} target="_blank" rel="noreferrer">
								{link.icon && <Icon name={link.icon} />}
								<T v={link.label} />
							</a>
						</li>
					))}
				</ul>
			);

		case "study":
			return (
				<div className="entries">
					{section.items.map((item, i) => (
						<article className="entry" key={i}>
							<h3>
								<T v={item.school} />
							</h3>
							{item.faculty && (
								<p className="entry__meta">
									<T v={item.faculty} />
								</p>
							)}
							<p className="entry__period">
								<T v={item.period} />
							</p>
						</article>
					))}
				</div>
			);

		case "papers":
			return (
				<div className="entries">
					{section.items.map((paper, i) => (
						<article className="entry" key={i}>
							<h3>
								<T v={paper.title} />
							</h3>
							<p className="entry__meta">
								<T v={paper.journal} />
							</p>
							<p className="entry__period">
								<T v={paper.period} />
							</p>
							<p className="chips">
								{paper.links.map((link) => (
									<a
										className="chip"
										key={link.url}
										href={link.url}
										target="_blank"
										rel="noreferrer"
									>
										<T v={link.label} />
									</a>
								))}
							</p>
						</article>
					))}
				</div>
			);

		case "tags":
			return (
				<ul className="tags">
					{section.items.map((tag, i) => (
						<li key={i}>
							<T v={tag} />
						</li>
					))}
				</ul>
			);
	}
}

function Card({ section }: { section: Section }) {
	// The unit label rides inside the sticky header rather than sitting above
	// the chips, so it cannot scroll away and leave bare numbers behind.
	const caption = "caption" in section ? section.caption : null;

	return (
		<section className="card" id={section.id}>
			<h2 className="card__title">
				<T v={section.title} />
				{caption && (
					<span className="card__unit">
						<T v={caption} />
					</span>
				)}
			</h2>
			<div className="card__body">
				<Body section={section} />
			</div>
		</section>
	);
}

export function Sections() {
	const [about, ...rest] = SECTIONS;

	// The two columns are separate flex stacks rather than one grid flow: a
	// shared grid would stretch every row in the right column to match the
	// height of the sticky "about" card next to it.
	return (
		<div className="grid">
			<aside className="grid__side">
				<Card section={about} />
			</aside>
			<div className="grid__main">
				{rest.map((section) => (
					<Card key={section.id} section={section} />
				))}
			</div>
		</div>
	);
}
