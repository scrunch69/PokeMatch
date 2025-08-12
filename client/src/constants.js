import pikachuImg from "./assets/pikachu.png";

export const defaultPokemon = {
	name: "Loading...",
	stats: [
		{ base_stat: 0 },
		{ base_stat: 0 },
		{ base_stat: 0 },
		{ base_stat: 0 },
		{ base_stat: 0 },
		{ base_stat: 0 },
	],
	weight: 0,
	height: 0,
	sprites: {
		other: {
			"official-artwork": {
				front_default: pikachuImg,
			},
		},
	},
	types: [{ type: { name: "unknown" } }],
};
