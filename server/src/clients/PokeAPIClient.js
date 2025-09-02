import NoAPIResponseException from "../exceptions/NoAPIResponseException.js";

/**
 * A client for interacting with the public PokeAPI (pokeapi.co).
 * This class abstracts the logic for fetching Pokémon data.
 */
export default class PokeApiClient {
    /**
     * Fetches data for a single random Pokémon.
     * @returns {Promise<object>} A promise that resolves to the Pokémon's JSON data.
     * @throws {NoAPIResponseException} If the API request fails.
     */
    async getRandomPokemon() {
        const randomPokeId = Math.floor(Math.random() * 600) + 1;
        const url = "https://pokeapi.co/api/v2/pokemon/" + randomPokeId;
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (e) {
            throw new NoAPIResponseException(url);
        }
    }
}
