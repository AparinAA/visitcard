//PieChart Pie uses this function for custom label
export const renderCustomizedLabel = ({
	cx,
	cy,
	midAngle,
	innerRadius,
	outerRadius,
	percent,
	value,
	index,
}) => {
	const RADIAN = Math.PI / 180;
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);
	return (
		<text
			x={x}
			y={y}
			fill="black"
			textAnchor={x > cx ? "start" : "end"}
			dominantBaseline="central"
		>
			{value}
		</text>
	);
};

export const renderCustomizedLabelOutside = ({
	cx,
	cy,
	midAngle,
	innerRadius,
	outerRadius,
	percent,
	value,
	index,
}) => {
	const RADIAN = Math.PI / 180;
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	// const x = cx + radius * Math.cos(-midAngle * RADIAN);
	// const y = cy + radius * Math.sin(-midAngle * RADIAN);
	const x = 50;
	const y = 8;
	return (
		<text
			x={x}
			y={y}
			fill="black"
			textAnchor={x > cx ? "start" : "end"}
			dominantBaseline="central"
		>
			{value}
		</text>
	);
};

export function drawMagicLine() {
	const canvas = document.getElementById("mouseTrailCanvas");
	const ctx = canvas.getContext("2d");

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	const mouseCoordinates = [];

	function drawLine() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.strokeStyle = "rgba(248,0,0,0.7)";
		ctx.lineWidth = 4;
		ctx.beginPath();

		mouseCoordinates.forEach(({ x, y }) => {
			ctx.lineTo(x, y);
		});

		ctx.stroke();
	}

	function onMouseMove(event) {
		const mouseX = event.clientX;
		const mouseY = event.clientY;

		mouseCoordinates.push({ x: mouseX, y: mouseY });

		let id = setTimeout(function tick() {
			if (id) {
				if (mouseCoordinates.length) {
					mouseCoordinates.shift();
					drawLine();
				}
			}
		}, 300);

		if (mouseCoordinates.length > 50) {
			mouseCoordinates.shift();
		}

		drawLine();
	}

	function onWindowResize() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		drawLine();
	}

	window.addEventListener("mousemove", onMouseMove);
	window.addEventListener("resize", onWindowResize);

	drawLine();
}
