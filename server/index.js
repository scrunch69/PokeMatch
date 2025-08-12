const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, "../client/dist")));

app.get("/api", (req, res) => {
	res.json({ message: "Hello from PokeMatch Server!" });
});

app.get("/api/randomPokemon", async (req, res) => {
	let randomPokeId = Math.floor(Math.random() * 600) + 1;
	const response = await fetch(
		"https://pokeapi.co/api/v2/pokemon/" + randomPokeId
	);
	const dataString = await response.text();
	res.setHeader("Content-Type", "application/json");
	res.send(dataString);
});

app.get("/{*any}", (req, res) => {
	res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
});

app.listen(PORT, () => {
	console.log("Server is listening on " + PORT);
});
