import React, { useEffect } from "react";
import { drawMagicLine } from "../lib/helpFunction";

function MagicField() {
	useEffect(() => {
		let id = drawMagicLine();

		return () => clearTimeout(id);
	}, []);

	return (
		<canvas
			id="mouseTrailCanvas"
			style={{
				display: "block",
				position: "absolute",
				top: 0,
				left: 0,
			}}
		></canvas>
	);
}

export default MagicField;
