let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function (e) {
        console.error(e);
      });
    };

    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
          console.log(item);
        });
      }

      return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails
    };
  })();


pokemonRepository.loadList().then(function() {
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
});

//THIS WAS THE PART THAT WAS MESSING UP MY CODE I BELIEVE!!!

//   function showDetails(pokemon) {
//     loadDetails(pokemon).then(function () {
//       console.log(pokemon);
//     });
//   };
// };
// console.log(pokemonRepository.getAll());


// //My 6 Starters always when playing pokemon growing up
// { name: "Charizard", height: 5.6, types: ["fire", "flying"] },
// { name: "Alakazam", height: 4.9, types: ["psychic"] },
// { name: "Dragonite", height: 7.2, types: ["dragon", "flying"] },
// { name: "Scyther", height: 4.9, types: ["bug", "flying"] },
// { name: "Gyarados", height: 21.3, types: ["water", "flying"] },
// { name: "Jolteon", height: 2.6, types: ["electric"] },
// //Honorable mentions:gengar, lapras, articuno, zapdos,
// //mewtwo, raichu, pidgeot.
