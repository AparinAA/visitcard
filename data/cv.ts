/**
 * Single source of truth for the CV content.
 *
 * Every user-facing string is a `Text` pair so the two languages sit next to
 * each other and cannot drift apart. Inline `*emphasis*` and `` `code` `` are
 * rendered by lib/inline.tsx.
 */

export const LANGS = ["EN", "RU"] as const;
export type Lang = (typeof LANGS)[number];

/**
 * Where the chosen language is persisted. It lives here rather than next to the
 * switcher because the pre-paint bootstrap in app/layout.tsx also needs it, and
 * a value imported from a `"use client"` module resolves to a client reference
 * — not the string — when read from a server component.
 */
export const LANG_KEY = "visitcard:lang";

/** A string in both languages. */
export type Text = Record<Lang, string>;

export interface LinkItem {
	label: Text;
	url: string;
	/** Basename of an SVG in /public, inlined at build time. */
	icon?: string;
}

export interface Skill {
	name: string;
	/** Years of hands-on use; the bar caps at 5. */
	years: number;
}

export interface Job {
	role: Text;
	company: string;
	period: Text;
	/** Optional line above the bullets, e.g. an internal promotion. */
	note?: Text;
	/** Optional heading that groups the bullets, e.g. the product worked on. */
	scope?: Text;
	bullets: Text[];
	stack?: string;
}

export interface Study {
	school: Text;
	faculty?: Text;
	period: Text;
}

export interface Paper {
	title: Text;
	journal: Text;
	period: Text;
	links: LinkItem[];
}

export type Section =
	| { id: "about"; title: Text; kind: "about"; name: Text; links: LinkItem[] }
	| { id: "skills"; title: Text; kind: "skills"; items: Skill[] }
	| { id: "experience"; title: Text; kind: "jobs"; items: Job[] }
	| { id: "projects"; title: Text; kind: "links"; items: LinkItem[] }
	| { id: "education"; title: Text; kind: "study"; items: Study[] }
	| { id: "science"; title: Text; kind: "papers"; items: Paper[] }
	| { id: "hobbies"; title: Text; kind: "tags"; items: Text[] };

export const HERO = {
	greeting: {
		EN: "Welcome to my visit card",
		RU: "Добро пожаловать на мою визитку",
	},
	name: { EN: "Aleksandr Aparin", RU: "Александр Апарин" },
	role: {
		EN: "Senior JavaScript Developer · mathematician",
		RU: "Senior JavaScript Developer · математик",
	},
	scrollHint: { EN: "Scroll", RU: "Листайте" },
} satisfies Record<string, Text>;

export const SECTIONS: Section[] = [
	{
		id: "about",
		kind: "about",
		title: { EN: "About me", RU: "Личные данные" },
		name: {
			EN: "Aleksandr Aparin",
			RU: "Александр Апарин",
		},
		links: [
			{
				label: { EN: "@alxaparin", RU: "@alxaparin" },
				url: "https://t.me/alxaparin",
				icon: "telegram",
			},
			{
				label: { EN: "alxaparin@gmail.com", RU: "alxaparin@gmail.com" },
				url: "mailto:alxaparin@gmail.com",
				icon: "email",
			},
			{
				label: { EN: "LinkedIn", RU: "LinkedIn" },
				url: "https://www.linkedin.com/in/alxaparin",
				icon: "linkedin",
			},
			{
				label: { EN: "LeetCode profile", RU: "Профиль LeetCode" },
				url: "https://leetcode.com/AparinAA/",
				icon: "leetcode",
			},
		],
	},

	{
		id: "skills",
		kind: "skills",
		title: { EN: "Proficient", RU: "Навыки / Тех-стек" },
		items: [
			{ name: "JavaScript", years: 7 },
			{ name: "TypeScript", years: 6 },
			{ name: "Node.js", years: 6 },
			{ name: "React", years: 6 },
			{ name: "Next.js", years: 5 },
			{ name: "Redux / Zustand", years: 5 },
			{ name: "Fastify", years: 2 },
			{ name: "Prisma", years: 2 },
			{ name: "PostgreSQL", years: 3 },
			{ name: "Docker", years: 4 },
			{ name: "CI/CD", years: 4 },
			{ name: "HTML/CSS", years: 7 },
			{ name: "Git", years: 7 },
			{ name: "AI workflows (SDD)", years: 2 },
			{ name: "TeX", years: 9 },
		],
	},

	{
		id: "experience",
		kind: "jobs",
		title: { EN: "Work experience", RU: "Опыт работы" },
		items: [
			{
				role: {
					EN: "Senior JavaScript Developer",
					RU: "Senior JavaScript Developer",
				},
				company: "OnClickA",
				period: {
					EN: "August 2023 — present",
					RU: "Август 2023 — по настоящее время",
				},
				note: {
					EN: "Promoted internally from JavaScript Developer to Senior JavaScript Developer",
					RU: "Внутреннее повышение с JavaScript Developer до Senior JavaScript Developer",
				},
				scope: {
					EN: "Development of Ad Delivery Service",
					RU: "Разработка сервиса доставки рекламы (Ad Delivery Service)",
				},
				bullets: [
					{
						EN: "Introduced specification-driven AI workflows and designed AI-agent architecture for a multi-platform TV application",
						RU: "Внедрил spec-driven AI-workflow и спроектировал архитектуру AI-агентов для мультиплатформенного TV-приложения",
					},
					{
						EN: "System design & architecture decisions for the JavaScript libraries of the advertising integration core app, reducing bundle size by 15–20%",
						RU: "System design и архитектурные решения для JavaScript-библиотек ядра рекламной интеграции — размер бандла сокращён на 15–20%",
					},
					{
						EN: "System design & architecture decisions for an anti-fraud detection system",
						RU: "System design и архитектурные решения для системы антифрод-детекции",
					},
					{
						EN: "Advertising integration into a website / webView / Telegram Mini App",
						RU: "Интеграция рекламы в веб-сайт / webView / Telegram Mini App",
					},
					{
						EN: "Integrated SSR, improving content delivery speed by up to 40%",
						RU: "Интегрировал SSR, скорость доставки контента улучшена до 40%",
					},
					{
						EN: "Set up GitLab CI/CD pipelines, Docker and Docker Compose, decreasing deployment time by 50%",
						RU: "Настроил GitLab CI/CD пайплайны, Docker и Docker Compose — время деплоя сокращено на 50%",
					},
					{
						EN: "System design & architecture decisions for a CRM app using React and Next.js (SSR)",
						RU: "System design и архитектурные решения для CRM-приложения на React и Next.js (SSR)",
					},
					{
						EN: "Ownership of backend services and APIs",
						RU: "Ownership backend-сервисов и API",
					},
					{
						EN: "Mentoring junior/middle developers",
						RU: "Менторинг junior/middle разработчиков",
					},
				],
				stack: "SDD AI-workflow, TypeScript, Node.js, React, Next.js, Redux/Zustand, Fastify, Prisma, PostgreSQL, Docker",
			},
			{
				role: { EN: "Frontend Developer", RU: "Frontend-разработчик" },
				company: "Gazprom Innovation Laboratory",
				period: {
					EN: "June 2022 — August 2023 (contract)",
					RU: "Июнь 2022 — Август 2023 (контракт)",
				},
				bullets: [
					{
						EN: "Developed personal accounts and customisable dashboards using *react-chart.js*",
						RU: "Разработка личных кабинетов и кастомизация дашбордов с использованием *react-chart.js*",
					},
					{
						EN: "Built a RAG chat with an AI bot using *React*, *Redux/RTK Query* and *HTTP streaming*",
						RU: "Создание чата с AI-ботом для RAG на *React*, *Redux/RTK Query* и *HTTP-streaming*",
					},
					{
						EN: "Built and configured CI/CD pipelines and deploys with *Git*, *Docker*, *Yandex.Cloud*, *Nginx*",
						RU: "Настройка CI/CD пайплайнов и деплоя с *Git*, *Docker*, *Yandex.Cloud*, *Nginx*",
					},
					{
						EN: "REST API design",
						RU: "Проектирование REST API",
					},
				],
			},
			{
				role: {
					EN: "Data analyst / developer",
					RU: "Дата-аналитик, разработчик",
				},
				company:
					"National Research University Higher School of Economics (HSE)",
				period: { EN: "2019 — 2022", RU: "2019 — 2022" },
				bullets: [
					{
						EN: "Took part in the technical setup of «Я — профессионал», the largest Russian student competition",
						RU: "Участие в техническом создании крупнейшей студенческой олимпиады «Я — профессионал»",
					},
					{
						EN: "Wrote the methodology for authoring contests in Yandex.Contest, trained authors and ran technical support using *Python*, *C++*",
						RU: "Создание методических правил и обучение созданию контестов в системе Yandex.Contest, техническая поддержка на *Python*, *C++*",
					},
					{
						EN: "Built and analysed reports with pivot tables in *Python*, *Excel*",
						RU: "Создание и анализ отчётов со сводными таблицами в *Python*, *Excel*",
					},
				],
			},
			{
				role: {
					EN: "Web developer, data analyst / developer",
					RU: "Web-разработчик, дата-аналитик, разработчик",
				},
				company: "Yandex",
				period: {
					EN: "2019 — 2022 (part-time)",
					RU: "2019 — 2022 (part-time)",
				},
				bullets: [
					{
						EN: "Automated report generation on participant activity using *Python*",
						RU: "Автоматизация загрузки данных и создание отчётов о действиях участников на *Python*",
					},
					{
						EN: "Created interfaces to manage user data across multiple APIs",
						RU: "Создание интерфейсов для управления данными пользователей через несколько API",
					},
					{
						EN: "Built a web application for internal voting using *JavaScript*, *React*, *HTML/CSS*",
						RU: "Веб-приложение для внутреннего голосования на *JavaScript*, *React*, *HTML/CSS*",
					},
				],
			},
		],
	},

	{
		id: "projects",
		kind: "links",
		title: { EN: "Projects", RU: "Проекты" },
		items: [
			{
				label: { EN: "GitHub", RU: "GitHub" },
				url: "https://github.com/AparinAA",
				icon: "github",
			},
			{
				label: { EN: "npm packages", RU: "npm-пакеты" },
				url: "https://www.npmjs.com/~x6p",
				icon: "npm",
			},
			{
				label: { EN: "SpreadMeta", RU: "SpreadMeta" },
				url: "https://aparinaa.github.io/monitor",
				icon: "spread",
			},
			{
				label: {
					EN: "KoronaPay calculator",
					RU: "Калькулятор KoronaPay",
				},
				url: "https://coronacheck.vercel.app",
				icon: "exchange",
			},
			{
				label: {
					EN: "NDA project at Yandex Frontend School",
					RU: "NDA-проект в Школе разработки интерфейсов Яндекса",
				},
				url: "https://ya.ru",
				icon: "ya",
			},
		],
	},

	{
		id: "education",
		kind: "study",
		title: { EN: "Education", RU: "Образование" },
		items: [
			{
				school: {
					EN: "Lomonosov Moscow State University (MSU)",
					RU: "МГУ имени М. В. Ломоносова",
				},
				faculty: {
					EN: "Faculty of Mechanics and Mathematics, Department of Probability Theory",
					RU: "Механико-математический факультет, кафедра теории вероятностей",
				},
				period: {
					EN: "2021 — present (PhD student)",
					RU: "2021 — по настоящее время (аспирантура)",
				},
			},
			{
				school: {
					EN: "Lomonosov Moscow State University (MSU)",
					RU: "МГУ имени М. В. Ломоносова",
				},
				faculty: {
					EN: "Faculty of Mechanics and Mathematics, Department of Probability Theory",
					RU: "Механико-математический факультет, кафедра теории вероятностей",
				},
				period: {
					EN: "2015 — 2021 (Specialist / Master)",
					RU: "2015 — 2021 (специалитет)",
				},
			},
			{
				school: {
					EN: "Yandex Frontend School",
					RU: "Школа разработки интерфейсов Яндекса",
				},
				period: { EN: "2023 (student)", RU: "2023 (студент)" },
			},
		],
	},

	{
		id: "science",
		kind: "papers",
		title: { EN: "Science work", RU: "Научная деятельность" },
		items: [
			{
				title: {
					EN: "On the sojourn time distribution of a random walk at a multidimensional lattice point",
					RU: "О распределении времени пребывания случайного блуждания в точке многомерной решётки",
				},
				journal: {
					EN: "Theory of Probability and Its Applications",
					RU: "Теория вероятностей и её применения",
				},
				period: { EN: "October 2021", RU: "Октябрь 2021" },
				links: [
					{
						label: { EN: "RU version", RU: "RU-версия" },
						url: "http://www.mathnet.ru/php/archive.phtml?wshow=paper&jrnid=tvp&paperid=5517&option_lang=rus",
					},
					{
						label: { EN: "EN version", RU: "EN-версия" },
						url: "https://epubs.siam.org/doi/pdf/10.1137/S0040585X97T990599",
					},
				],
			},
		],
	},

	{
		id: "hobbies",
		kind: "tags",
		title: { EN: "Hobbies", RU: "Интересы" },
		items: [
			{ EN: "Psychology", RU: "Психология" },
			{ EN: "Skiing", RU: "Лыжи" },
			{ EN: "Finance", RU: "Финансы" },
			{ EN: "Crypto & smart contracts", RU: "Криптовалюта и смартконтракты" },
		],
	},
];
