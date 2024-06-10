import nerdamer from "nerdamer/all";

export const fCuadratica = (expr) => {
	let coeficientes = nerdamer.coeffs(expr, "x").toString();
	console.log(coeficientes);
	coeficientes = coeficientes.replace("[", "").replace("]", "").split(",");
	const verticeX = nerdamer(`(-${coeficientes[1]})/(2*${coeficientes[2]})`)
		.evaluate()
		.toString();
	console.log(verticeX);
	const verticeY = nerdamer(expr).evaluate({ x: verticeX }).toString();
	console.log(verticeY);
	const vertice = { x: verticeX, y: verticeY };
	console.log(vertice);
	const corteY = nerdamer(expr).evaluate({ x: 0 }).toString();
	const coordenadaCorteY = { x: "0", y: corteY };
	console.log(coordenadaCorteY);
	const corteX = nerdamer(expr).solveFor("x").toString().split(",");
	console.log(corteX);
	const coordenadasCorteX = corteX.map((x) => {
		return { x: x, y: "0" };
	});
	console.log(coordenadasCorteX);

	const points = [];

	if (coordenadasCorteX.length === 2) {
		if (
			nerdamer(coordenadasCorteX[0].x).lt(coordenadasCorteX[1].x).toString() ===
			"true"
		) {
			points.push({
				x: Number.parseFloat(
					nerdamer(coordenadasCorteX[0].x).subtract(1).evaluate().text(),
				),
				y: Number.parseFloat(
					nerdamer(expr)
						.evaluate({
							x: nerdamer(coordenadasCorteX[0].x).subtract(1).text(),
						})
						.text(),
				),
			});
			points.push({
				x: Number.parseFloat(
					nerdamer(coordenadasCorteX[0].x).evaluate().text("decimals"),
				),
				y: 0,
			});
			points.push({
				x: Number.parseFloat(nerdamer(vertice.x).evaluate().text("decimals")),
				y: Number.parseFloat(nerdamer(vertice.y).evaluate().text("decimals")),
			});
			points.push({
				x: Number.parseFloat(
					nerdamer(coordenadasCorteX[1].x).evaluate().text("decimals"),
				),
				y: 0,
			});
			points.push({
				x: Number.parseFloat(
					nerdamer(coordenadasCorteX[1].x).add(1).evaluate().text(),
				),
				y: Number.parseFloat(
					nerdamer(expr)
						.evaluate({ x: nerdamer(coordenadasCorteX[1].x).add(1).text() })
						.text(),
				),
			});
		} else {
			points.push({
				x: Number.parseFloat(
					nerdamer(coordenadasCorteX[1].x)
						.subtract(1)
						.evaluate()
						.text("decimals"),
				),
				y: Number.parseFloat(
					nerdamer(expr)
						.evaluate({
							x: nerdamer(coordenadasCorteX[1].x).subtract(1).text(),
						})
						.text("decimals"),
				),
			});
			points.push({
				x: Number.parseFloat(
					nerdamer(coordenadasCorteX[1].x).evaluate().text("decimals"),
				),
				y: 0,
			});
			points.push({
				x: Number.parseFloat(nerdamer(vertice.x).evaluate().text("decimals")),
				y: Number.parseFloat(nerdamer(vertice.y).evaluate().text("decimals")),
			});
			points.push({
				x: Number.parseFloat(
					nerdamer(coordenadasCorteX[0].x).evaluate().text("decimals"),
				),
				y: 0,
			});
			points.push({
				x: Number.parseFloat(
					nerdamer(coordenadasCorteX[0].x).add(1).evaluate().text("decimals"),
				),
				y: Number.parseFloat(
					nerdamer(expr)
						.evaluate({ x: nerdamer(coordenadasCorteX[0].x).add(1).text() })
						.text("decimals"),
				),
			});
		}
	} else {
		if (nerdamer(coordenadasCorteX[0].x).lt(vertice.x).toString() === "true") {
			points.push({
				x: Number.parseFloat(
					nerdamer(coordenadasCorteX[0].x)
						.subtract(1)
						.evaluate()
						.text("decimals"),
				),
				y: Number.parseFloat(
					nerdamer(expr)
						.evaluate({
							x: nerdamer(coordenadasCorteX[0].x).subtract(1).text(),
						})
						.text("decimals"),
				),
			});
			points.push({
				x: Number.parseFloat(
					nerdamer(coordenadasCorteX[0].x).evaluate().text("decimals"),
				),
				y: 0,
			});
			points.push({
				x: Number.parseFloat(nerdamer(vertice.x).evaluate().text("decimals")),
				y: Number.parseFloat(nerdamer(vertice.y).evaluate().text("decimals")),
			});
		} else {
			points.push({
				x: Number.parseFloat(nerdamer(vertice.x).evaluate().text("decimals")),
				y: Number.parseFloat(nerdamer(vertice.y).evaluate().text("decimals")),
			});
			points.push({
				x: Number.parseFloat(
					nerdamer(coordenadasCorteX[0].x).evaluate().text("decimals"),
				),
				y: 0,
			});
			points.push({
				x: Number.parseFloat(
					nerdamer(coordenadasCorteX[0].x).add(1).evaluate().text("decimals"),
				),
				y: Number.parseFloat(
					nerdamer(expr)
						.evaluate({
							x: nerdamer(coordenadasCorteX[0].x).add(1).text(),
						})
						.text("decimals"),
				),
			});
		}
	}

	console.log(points);

	return {
		points,
		vertice: {
			x: Number.parseFloat(nerdamer(vertice.x).evaluate().text("decimals")),
			y: Number.parseFloat(nerdamer(vertice.y).evaluate().text("decimals")),
		},
		coordenadaCorteY: {
			x: 0,
			y: Number.parseFloat(
				nerdamer(coordenadaCorteY.y).evaluate().text("decimals"),
			),
		},
		coordenadasCorteX: coordenadasCorteX.map((c) => {
			return {
				x: Number.parseFloat(nerdamer(c.x).evaluate().text("decimals")),
				y: 0,
			};
		}),
		dominio: "R",
		method: "Cuadrática",
		rango:
			nerdamer(coeficientes[2]).lt("0").toString() === "false"
				? `[${Number.parseFloat(nerdamer(verticeY).evaluate().text("decimals"))}, ∞)`
				: `(-∞, ${Number.parseFloat(nerdamer(verticeY).evaluate().text("decimals"))}]`,
	};
};

export const fAfin = (expr) => {
	let coeficientes = nerdamer.coeffs(expr, "x").toString();
	console.log(coeficientes);
	coeficientes = coeficientes.replace("[", "").replace("]", "").split(",");
	console.log(coeficientes);
	const corteX = nerdamer(expr).solveFor("x").toString();
	console.log(corteX);
	const coordenadaCorteX = { x: corteX, y: "0" };
	const corteY = nerdamer(expr).evaluate({ x: 0 }).toString();
	const coordenadaCorteY = { x: "0", y: corteY };

	const points = [];

	if (nerdamer(coordenadaCorteX.x).lt(0).toString() === "true") {
		points.push({
			x: Number.parseFloat(
				nerdamer(coordenadaCorteX.x).subtract(1).evaluate().text("decimals"),
			),
			y: Number.parseFloat(
				nerdamer(expr)
					.evaluate({ x: nerdamer(coordenadaCorteX.x).subtract(1).text() })
					.text("decimals"),
			),
		});
		points.push({
			x: Number.parseFloat(
				nerdamer(coordenadaCorteX.x).evaluate().text("decimals"),
			),
			y: 0,
		});
		points.push({
			x: 0,
			y: Number.parseFloat(
				nerdamer(coordenadaCorteY.y).evaluate().text("decimals"),
			),
		});
	} else {
		points.push({
			x: 0,
			y: Number.parseFloat(
				nerdamer(coordenadaCorteY.y).evaluate().text("decimals"),
			),
		});
		points.push({
			x: Number.parseFloat(
				nerdamer(coordenadaCorteX.x).evaluate().text("decimals"),
			),
			y: 0,
		});
		points.push({
			x: Number.parseFloat(
				nerdamer(coordenadaCorteX.x).add(1).evaluate().text("decimals"),
			),
			y: Number.parseFloat(
				nerdamer(expr)
					.evaluate({ x: nerdamer(coordenadaCorteX.x).add(1).text() })
					.text("decimals"),
			),
		});
	}

	return {
		points,
		coordenadaCorteY: {
			x: 0,
			y: Number.parseFloat(
				nerdamer(coordenadaCorteY.y).evaluate().text("decimals"),
			),
		},
		coordenadaCorteX: {
			x: Number.parseFloat(
				nerdamer(coordenadaCorteX.x).evaluate().text("decimals"),
			),
			y: 0,
		},
		dominio: "R",
		rango: "R",
		method: "Afin",
	};
};
