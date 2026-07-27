"use client";

import { useEffect, useRef } from "react";

/**
 * A soft ribbon that trails the pointer.
 *
 * Each node chases the one in front of it, so the tail arrives late and curls
 * through corners instead of following the raw polyline the pointer draws. The
 * stroke tapers and fades to nothing at the tail, gets slightly fatter the
 * faster you move, and dissolves once the pointer sits still — enough motion to
 * be worth watching, not enough to compete with the text.
 *
 * The canvas sits behind the cards, so the effect plays over the hero and the
 * page margins and never crosses anything you are reading.
 */
const NODES = 26;
const HEAD_EASE = 0.42;
const TAIL_EASE = 0.34;
const IDLE_MS = 900;
const MAX_SPEED = 60;

export function CursorTrail() {
	const ref = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = ref.current;
		if (!canvas) return;

		const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
		if (!fine.matches || reduce.matches) return;

		const ctx = canvas.getContext("2d", { alpha: true });
		if (!ctx) return;

		let w = 0;
		let h = 0;
		// Kept in sync with the --trail-rgb token so the ribbon follows the
		// light/dark palette instead of hard-coding an accent.
		let rgb = "0, 113, 243";

		const readColor = () => {
			const token = getComputedStyle(document.documentElement)
				.getPropertyValue("--trail-rgb")
				.trim();
			if (token) rgb = token;
		};

		const resize = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			w = window.innerWidth;
			h = window.innerHeight;
			canvas.width = Math.round(w * dpr);
			canvas.height = Math.round(h * dpr);
			canvas.style.width = `${w}px`;
			canvas.style.height = `${h}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			ctx.lineCap = "round";
			ctx.lineJoin = "round";
		};

		const xs = new Float32Array(NODES);
		const ys = new Float32Array(NODES);
		let seeded = false;
		let mx = 0;
		let my = 0;
		let speed = 0;
		let alpha = 0;
		let lastMove = 0;
		let raf = 0;

		const draw = () => {
			const width = 4.5 + speed * 0.085;

			for (let i = 1; i < NODES - 1; i++) {
				const t = i / (NODES - 1);
				const fade = (1 - t) ** 1.6;

				ctx.beginPath();
				ctx.moveTo((xs[i - 1] + xs[i]) / 2, (ys[i - 1] + ys[i]) / 2);
				ctx.quadraticCurveTo(
					xs[i],
					ys[i],
					(xs[i] + xs[i + 1]) / 2,
					(ys[i] + ys[i + 1]) / 2
				);
				ctx.lineWidth = width * fade;
				ctx.strokeStyle = `rgba(${rgb}, ${0.3 * fade * alpha})`;
				ctx.stroke();
			}

			// A small bright head keeps the ribbon anchored to the cursor.
			ctx.beginPath();
			ctx.arc(xs[0], ys[0], 2.6, 0, Math.PI * 2);
			ctx.fillStyle = `rgba(${rgb}, ${0.42 * alpha})`;
			ctx.fill();
		};

		const frame = (now: number) => {
			const idle = now - lastMove > IDLE_MS;

			xs[0] += (mx - xs[0]) * HEAD_EASE;
			ys[0] += (my - ys[0]) * HEAD_EASE;
			for (let i = 1; i < NODES; i++) {
				xs[i] += (xs[i - 1] - xs[i]) * TAIL_EASE;
				ys[i] += (ys[i - 1] - ys[i]) * TAIL_EASE;
			}

			speed *= 0.9;
			alpha += ((idle ? 0 : 1) - alpha) * 0.08;

			ctx.clearRect(0, 0, w, h);
			if (alpha > 0.01) draw();

			const slack = Math.hypot(xs[NODES - 1] - mx, ys[NODES - 1] - my);
			if (idle && alpha <= 0.01 && slack < 0.5) {
				ctx.clearRect(0, 0, w, h);
				raf = 0;
				return;
			}

			raf = requestAnimationFrame(frame);
		};

		const onMove = (e: PointerEvent) => {
			if (e.pointerType !== "mouse") return;

			if (seeded) {
				speed = Math.min(
					Math.hypot(e.clientX - mx, e.clientY - my),
					MAX_SPEED
				);
			}
			mx = e.clientX;
			my = e.clientY;

			if (!seeded) {
				xs.fill(mx);
				ys.fill(my);
				seeded = true;
			}

			lastMove = performance.now();
			if (!raf) raf = requestAnimationFrame(frame);
		};

		const onLeave = () => {
			lastMove = 0;
		};

		const scheme = window.matchMedia("(prefers-color-scheme: dark)");

		readColor();
		resize();
		window.addEventListener("resize", resize);
		window.addEventListener("pointermove", onMove, { passive: true });
		document.addEventListener("pointerleave", onLeave);
		scheme.addEventListener("change", readColor);

		return () => {
			window.removeEventListener("resize", resize);
			window.removeEventListener("pointermove", onMove);
			document.removeEventListener("pointerleave", onLeave);
			scheme.removeEventListener("change", readColor);
			if (raf) cancelAnimationFrame(raf);
		};
	}, []);

	return <canvas ref={ref} className="trail" aria-hidden="true" />;
}
