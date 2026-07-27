"use client";

import { useEffect, useState } from "react";

/**
 * LeetCode's own GraphQL endpoint answers OPTIONS with 405 and sends no
 * `Access-Control-Allow-Origin`, so a static page cannot call it directly. This
 * public mirror does send `Access-Control-Allow-Origin: *`.
 *
 * It is a best-effort extra: the fetch happens after paint, and if the mirror is
 * down or rate-limiting the whole block removes itself rather than showing an
 * error next to the CV.
 */
const ENDPOINT = "https://leetcode-api-faisalshohag.vercel.app/AparinAA";
const PROFILE = "https://leetcode.com/AparinAA/";

interface Stats {
	easy: number;
	medium: number;
	hard: number;
	total: number;
	ranking: number | null;
}

const LEVELS = [
	{ key: "easy", label: "Easy", color: "#00b8a3" },
	{ key: "medium", label: "Medium", color: "#ffb800" },
	{ key: "hard", label: "Hard", color: "#ff375f" },
] as const;

const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function parse(raw: unknown): Stats | null {
	if (typeof raw !== "object" || raw === null) return null;
	const d = raw as Record<string, unknown>;

	const num = (v: unknown) => (typeof v === "number" && v >= 0 ? v : null);
	const easy = num(d.easySolved);
	const medium = num(d.mediumSolved);
	const hard = num(d.hardSolved);
	if (easy === null || medium === null || hard === null) return null;

	const total = num(d.totalSolved) ?? easy + medium + hard;
	if (total === 0) return null;

	return { easy, medium, hard, total, ranking: num(d.ranking) };
}

export function LeetCodeStats() {
	const [stats, setStats] = useState<Stats | null>(null);
	const [failed, setFailed] = useState(false);

	useEffect(() => {
		const abort = new AbortController();
		const timer = setTimeout(() => abort.abort(), 8000);

		fetch(ENDPOINT, { signal: abort.signal })
			.then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
			.then((json) => {
				const parsed = parse(json);
				if (parsed) setStats(parsed);
				else setFailed(true);
			})
			.catch(() => setFailed(true))
			.finally(() => clearTimeout(timer));

		return () => {
			clearTimeout(timer);
			abort.abort();
		};
	}, []);

	if (failed) return null;

	if (!stats) {
		return (
			<div className="leet" aria-hidden="true">
				<div className="leet__skeleton" />
			</div>
		);
	}

	const solved = stats.easy + stats.medium + stats.hard;
	let offset = 0;

	return (
		<a className="leet" href={PROFILE} target="_blank" rel="noreferrer">
			<svg className="leet__ring" viewBox="0 0 128 128" role="img">
				<title>{`LeetCode: ${stats.total} problems solved`}</title>
				<circle
					className="leet__track"
					cx="64"
					cy="64"
					r={RADIUS}
					fill="none"
					strokeWidth="12"
				/>
				{LEVELS.map(({ key, color }) => {
					const value = stats[key];
					const len = (value / solved) * CIRCUMFERENCE;
					const dash = -offset;
					offset += len;
					return (
						<circle
							key={key}
							cx="64"
							cy="64"
							r={RADIUS}
							fill="none"
							stroke={color}
							strokeWidth="12"
							strokeLinecap="butt"
							strokeDasharray={`${len} ${CIRCUMFERENCE - len}`}
							strokeDashoffset={dash}
							transform="rotate(-90 64 64)"
						/>
					);
				})}
				<text className="leet__total" x="64" y="60">
					{stats.total}
				</text>
				<text className="leet__caption" x="64" y="78">
					solved
				</text>
			</svg>

			<ul className="leet__legend">
				{LEVELS.map(({ key, label, color }) => (
					<li key={key}>
						<i style={{ background: color }} />
						{label}
						<b>{stats[key]}</b>
					</li>
				))}
				{stats.ranking !== null && (
					<li className="leet__rank">
						Rank <b>#{stats.ranking.toLocaleString("en-US")}</b>
					</li>
				)}
			</ul>
		</a>
	);
}
