import styles from "./App.module.css";
import "//unpkg.com/mathlive";
import { useState, useRef, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import fxIcon from "./assets/fx.png";
import InfoIcon from "@mui/icons-material/Info";
import nerdamer from "nerdamer/all";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { fCuadratica, fAfin } from "./formulas";
import CartesianPlane from "./components/CartesianPlane";
import TextField from "@mui/material/TextField";

const regex = /^-?\d+(\.\d+)?$/;

function insertarCoordenadaOrdenada(coordenada, array) {
	const newArray = [...array];
	const index = newArray.findIndex((punto) => punto.x === coordenada.x);

	if (index === -1) {
		const insertIndex = newArray.findIndex((punto) => punto.x > coordenada.x);

		if (insertIndex === -1) {
			newArray.push(coordenada);
		} else {
			newArray.splice(insertIndex, 0, coordenada);
		}
	} else {
		alert("Ya existe un punto con esa coordenada x");
	}

	return newArray;
}

function App() {
	const [value, setValue] = useState("");
	const [results, setResults] = useState({
		points: [],
		vertice: { x: "0", y: "0" },
		coordenadasCorteX: [],
		coordenadaCorteY: { x: "0", y: "0" },
		dominio: "",
		rango: "",
		method: "",
	});

	//modal
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	//select
	const [f, setF] = useState("Cuadrática");

	const handleChange = (event) => {
		setF(event.target.value);
	};

	//agregar numero
	const [addXError, setAddXError] = useState(false);
	const [newX, setNewX] = useState("");

	const addX = () => {
		if (addXError || newX === "") return;

		const newPoint = {
			x: Number.parseFloat(newX),
			y: Number.parseFloat(
				nerdamer
					.convertFromLaTeX(mf.current.value)
					.evaluate({ x: newX })
					.text("decimals"),
			),
		};

		setResults((prev) => ({
			...prev,
			points: insertarCoordenadaOrdenada(newPoint, prev.points),
		}));
	};

	//calculadora
	const calcular = () => {
		const expr = nerdamer.convertFromLaTeX(mf.current.value).toString();
		if (f === "Cuadrática") {
			const result = fCuadratica(expr);
			console.log(result);
			setResults(result);
		}
		if (f === "Afín") {
			const result = fAfin(expr);
			console.log(result);
			setResults(result);
		}
	};

	//mathfield
	const mf = useRef();
	useEffect(() => {
		mf.current.smartFence = true;
		mf.current.focus();

		mf.current.addEventListener("input", (evt) => {
			evt.preventDefault();
			evt.stopPropagation();

			if (evt.inputType === "insertLineBreak") {
				evt.target.executeCommand("plonk");
			}
		});
	}, []);

	useEffect(() => {
		mf.current.value = value;
	}, [value]);

	return (
		<div className={styles.App}>
			<div className={styles.Header}>
				<div className={styles.title}>
					<img src={fxIcon} alt="fxIcon" width={50} height={50} />
					<h1>Calculadora</h1>
				</div>

				<Button onClick={handleOpen}>
					<InfoIcon fontSize="large" color="primary" />
				</Button>
			</div>
			<math-field ref={mf} onInput={(evt) => setValue(evt.target.value)}>
				{value}
			</math-field>

			<div className={styles.controls}>
				<FormControl sx={{ m: 1, minWidth: 120 }}>
					<Select
						value={f}
						onChange={handleChange}
						displayEmpty
						inputProps={{ "aria-label": "Without label" }}
					>
						<MenuItem value={"Cuadrática"}>Cuadrática</MenuItem>
						<MenuItem value={"Afín"}>Afín</MenuItem>
					</Select>
				</FormControl>
				<Button color="primary" variant="outlined" onClick={calcular}>
					Calcular
				</Button>
			</div>

			{results.points.length > 0 && (
				<div className={styles.chart}>
					<div className={styles.chartControls}>
						<CartesianPlane points={results.points} />
						<div>
							<TextField
								value={newX}
								error={addXError}
								label="Número"
								onChange={(e) => {
									setNewX(e.target.value);
									if (!regex.test(e.target.value) && e.target.value !== "") {
										setAddXError(true);
									} else {
										setAddXError(false);
									}
								}}
								sx={{ width: 100 }}
							/>
							<Button onClick={addX} sx={{ whiteSpace: "nowrap" }}>
								Agregar X
							</Button>
						</div>
					</div>

					<div className={styles.results}>
						<Typography>Dominio: {results.dominio}</Typography>
						<Typography>Rango: {results.rango}</Typography>
						{results.method === "Cuadrática" && (
							<>
								<Typography>
									Vértice:
									{`(${results.vertice.x}, ${results.vertice.y})`}
								</Typography>{" "}
								<Typography>
									Corte X:
									{results.coordenadasCorteX.map((c) => `(${c.x}, ${c.y}) `)}
								</Typography>
							</>
						)}
						{results.method === "Afin" && (
							<Typography>
								Corte X:
								{`(${results.coordenadaCorteX.x}, ${results.coordenadaCorteX.y})`}
							</Typography>
						)}

						<Typography>
							Corte Y:
							{`(${results.coordenadaCorteY.x}, ${results.coordenadaCorteY.y})`}
						</Typography>
					</div>
				</div>
			)}

			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={modalStyle}>
					<Typography
						color="primary"
						id="modal-modal-title"
						variant="h6"
						component="h2"
					>
						Desarrollado por
					</Typography>
					<Typography sx={{ mt: 2 }}>George Torres</Typography>
					<Typography sx={{ mt: 2 }}>Jhon Díaz</Typography>
					<Typography sx={{ mt: 2 }}>Andrey Garzón</Typography>
				</Box>
			</Modal>
		</div>
	);
}

const modalStyle = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
};

export default App;
