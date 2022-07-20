let pokemonRepository = (function () {
  let repository = [
//My 6 Starters always when playing pokemon growing up
  {name:"Charizard", height:5.6, types:["fire", "flying"],},
  {name:"Alakazam", height:4.9, types:["psychic"],},
  {name:"Dragonite", height:7.2, types:["dragon", "flying"],},
  {name:"Scyther", height:4.9, types:["bug", "flying"],},
  {name:"Gyarados", height:21.3, types:["water", "flying"],},
  {name:"Jolteon", height:2.6, types:["electric"],},
//Honorable mentions:gengar, lapras, articuno, zapdos,
//mewtwo, raichu, pidgeot.

];
	function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "types" in pokemon
    ) {
      repository.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }
  function getAll() {
    return repository;
  }
function addListItem(pokemon){
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener("click", function() {
      showDetails(pokemon);
  });
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
      };
  }

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
