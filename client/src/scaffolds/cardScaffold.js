/**
 * Generates an array of stat objects for a given Pokémon.
 * Used as a helper in SelectStatPage
 * @param {Object} pokemon - The Pokémon object containing stats.
 * @returns {Array<Object>} Array of stat objects with statName and baseStat.
 */
export default function cardScaffold(pokemon) {
    return [
        {
            statName: "💖 HP",
            baseStat: pokemon.stats.hp,
        },
        {
            statName: "⚔️ ATTACK",
            baseStat: pokemon.stats.attack,
        },
        {
            statName: "🛡️ DEFENSE",
            baseStat: pokemon.stats.defense,
        },
        {
            statName: "✨ SP. ATK",
            baseStat: pokemon.stats.specialAttack,
        },
        {
            statName: "🔷 SP. DEF",
            baseStat: pokemon.stats.specialDefense,
        },
        {
            statName: "💨 SPEED",
            baseStat: pokemon.stats.speed,
        },
        {
            statName: "⚖️ WEIGHT",
            baseStat: pokemon.stats.weight / 10 + " kg",
        },
        {
            statName: "📏 HEIGHT",
            baseStat: pokemon.stats.height / 10 + " m",
        },
    ];
}
