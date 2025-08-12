import "./App.css";
import StatCard from "./components/StatCard";
import TypeCard from "./components/TypeCard";
import { useState, useEffect } from "react";
import { defaultPokemon } from "./constants";

function App() {
	const [activeStat, setActiveStat] = useState(null);
	const [pokemon, setPokemon] = useState(defaultPokemon);

	useEffect(() => {
		getNewPokemon();
	}, []);

	async function getNewPokemon() {
		const response = await fetch("/api/randomPokemon");
		const data = await response.json();

		const imageUrl = data.sprites.other["official-artwork"].front_default;
		const img = new Image();
		img.src = imageUrl;

		img.onload = () => {
			setPokemon(data);
		};
	}

	function onActionButtonClick() {
		getNewPokemon();
	}

	function handleStatCardClick(statName) {
		setActiveStat(statName);
		console.log("Stat active:", activeStat);
	}

	return (
		<div className='outer-container'>
			<h1 className='pokemon-name'>
				{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
			</h1>

			<img
				className='pokemon-image'
				src={pokemon.sprites.other["official-artwork"].front_default}
				alt={pokemon.name}
			/>
			<div className='type-list'>
				{pokemon.types.map((typeInfo) => (
					<TypeCard
						key={typeInfo.type.name}
						typeName={typeInfo.type.name}
					/>
				))}
			</div>
			<div className='stats-table'>
				<StatCard
					statName='💖 HP'
					statValue={pokemon.stats[0].base_stat}
					onStatCardClick={handleStatCardClick}
				/>
				<StatCard
					statName='💨 Speed'
					statValue={pokemon.stats[5].base_stat}
					onStatCardClick={handleStatCardClick}
				/>
				<StatCard
					statName='⚔️ Attack'
					statValue={pokemon.stats[1].base_stat}
					onStatCardClick={handleStatCardClick}
				/>
				<StatCard
					statName='🛡️ Defense'
					statValue={pokemon.stats[2].base_stat}
					onStatCardClick={handleStatCardClick}
				/>
				<StatCard
					statName='✨ Sp. Attack'
					statValue={pokemon.stats[3].base_stat}
					onStatCardClick={handleStatCardClick}
				/>
				<StatCard
					statName='🔷 Sp. Defense'
					statValue={pokemon.stats[4].base_stat}
					onStatCardClick={handleStatCardClick}
				/>
				<StatCard
					statName='⚖️ Weight'
					statValue={pokemon.weight / 10 + " kg"}
					onStatCardClick={handleStatCardClick}
				/>
				<StatCard
					statName='📏 Height'
					statValue={pokemon.height + " m"}
					onStatCardClick={handleStatCardClick}
				/>
			</div>
			<button
				type='button'
				className='action-button'
				onClick={onActionButtonClick}
			>
				Next Pokemon!
			</button>
		</div>
	);
}
export default App;
