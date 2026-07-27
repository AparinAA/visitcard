"use client";

import { useEffect } from "react";

/**
 * Publishes a single smoothed scroll progress value as the `--p` custom
 * property on <html>; every hero transition in globals.css is derived from it.
 *
 * The value is not the raw scroll position: it eases toward the target each
 * frame, so the hero keeps moving for a beat after the wheel stops. That lag is
 * what makes the transition feel continuous instead of scroll-locked.
 */
const EASE = 0.12;
const SETTLED = 0.0008;

export function ScrollMotion() {
	useEffect(() => {
		const root = document.documentElement;
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

		let raf = 0;
		let current = 0;
		let target = 0;

		const write = (v: number) => root.style.setProperty("--p", v.toFixed(4));

		const measure = () => {
			const span = Math.max(window.innerHeight * 0.85, 1);
			target = Math.min(Math.max(window.scrollY / span, 0), 1);
		};

		const tick = () => {
			current += (target - current) * EASE;
			const settled = Math.abs(target - current) < SETTLED;
			if (settled) current = target;
			write(current);
			raf = settled ? 0 : requestAnimationFrame(tick);
		};

		const onScroll = () => {
			measure();
			if (reduce.matches) {
				current = target;
				write(current);
				return;
			}
			if (!raf) raf = requestAnimationFrame(tick);
		};

		measure();
		current = target;
		write(current);
		// Gates the animated rules: without JS the page renders fully visible.
		root.dataset.motion = "on";

		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);

		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
			if (raf) cancelAnimationFrame(raf);
			delete root.dataset.motion;
			root.style.removeProperty("--p");
		};
	}, []);

	return null;
}
