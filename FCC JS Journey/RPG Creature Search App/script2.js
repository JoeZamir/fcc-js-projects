// Search elements
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

// Creature info elements
const creatureInfoIds = [
  "creature-name",
  "creature-id",
  "weight",
  "height",
  "types"
];
const creatureInfo = {};
creatureInfoIds.forEach(id => (creatureInfo[id] = document.getElementById(id)));

// Stats elements
const statIds = [
  "hp",
  "attack",
  "defense",
  "special-attack",
  "special-defense",
  "speed"
];
const stats = {};
statIds.forEach(id => (stats[id] = document.getElementById(id)));

// Fetch and populate creature data
async function fetchCreature(query) {
    try {
        const res = await fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${query}`);

        if (!res.ok) {
            throw new Error("Creature not found!");
        }
        const data = await res.json();
        populateCreatureData(data);
    }
    catch(err) {
        alert("Creature not found!");
    }
}
const populateCreatureData = (data) => {
    //basic info
    creatureInfo["creature-name"].textContent = data.name.toUpperCase();
    creatureInfo["creature-id"].textContent = `# ${data.id}`;
    creatureInfo["weight"].textContent = `Weight: ${data.weight}`;
    creatureInfo["height"].textContent = `Height: ${data.height}`;
    //types
    creatureInfo["types"].innerHTML = ""; //clearing types element
    data.types.forEach((typeObj) => {
        const span = document.createElement("span");
        span.textContent = typeObj.name.toUpperCase();
        creatureInfo["types"].appendChild(span);
    });

    //span info
    data.stats.forEach((statObj) => {
        if (statObj.name) {
            stats[statObj.name].textContent = statObj.base_stat;
        }
    })
};
searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (!query) {
        return;
    }
    fetchCreature(query);
});
