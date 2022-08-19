let pokemonRepository = (function() {
	let pokemonList = [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150';

	function add(pokemon) {
		if (typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon) {
			pokemonList.push(pokemon);
		} else {
			console.log('Pokemon is not correct');
		}
	}

	function getAll() {
		return pokemonList;
	}

	function addListItem(pokemon) {
		let pokemonList = document.querySelector('.pokemon-list');
		let pokemonItem = document.createElement('li');
		pokemonList.classList.add('group-list-item');
		pokemonList.classList.add('col-sm-4', 'col-md-6', 'col-lg-12');
		let buttonItem = document.createElement('button');
		buttonItem.classList.add('pokemonButton');
		buttonItem.innerText = pokemon.name;
		buttonItem.setAttribute('data-toggle', 'modal');
		buttonItem.setAttribute('data-target', '#pokemon-modal');
		(buttonItem).addClass('button-class btn-block btn m1');
		pokemonItem.appendChild(buttonItem);
		pokemonList.appendChild(pokemonItem);
		buttonItem.addEventListener('click', function() {
			showDetails(pokemon);
		});
	}

	function loadList() {
		return fetch(apiUrl)
			.then(function(response) {
				return response.json();
			})
			.then(function(json) {
				json.results.forEach(function(item) {
					let pokemon = {
						name: item.name,
						detailsUrl: item.url,
					};
					add(pokemon);
				});
			})
			.catch(function(e) {
				console.error(e);
			});
	}

	function loadDetails(pokemon) {
		let url = pokemon.detailsUrl;
		return fetch(url)
			.then(function(response) {
				return response.json();
			})
			.then(function(details) {
				pokemon.imageUrl = details.sprites.front_default;
				pokemon.height = details.height;
				pokemon.weight = details.weight;
				pokemon.types = details.types.map(type => type.type.name).join(',');
				pokemon.abilities = details.abilities.map(ability => ability.ability.name).join(',');
			})
			.catch(function(e) {
				console.error(e);
			});
	}
	function showDetails(pokemon) {
		pokemonRepository.loadDetails(pokemon).then(function() {
			showModal(pokemon);
		});
	}

	function showModal(pokemon) {
		let modalBody = ('.modal-body');
		let modalTitle = ('.modal-title');

		modalTitle.empty();
		modalBody.empty();
		let nameElement = ('<h1>' + pokemon.name + '</h1>');
		let imageElement = ('<img class="pokemon-img">');
		imageElement.attr('src', pokemon.imageUrl);
		let heightElement = ('<p>' + 'Height : ' + pokemon.height + '</p>');
		let weightElement = ('<p>' + 'Weight : ' + pokemon.weight + '</p>');
		let typeElement = ('<p>' + 'Types : ' + pokemon.types + '</p>');
		let abilitiesElement = ('<p>' + 'Abilities : ' + pokemon.abilities + '</p>');

		modalTitle.append(nameElement);
		modalBody.append(imageElement);
		modalBody.append(heightElement);
		modalBody.append(weightElement);
		modalBody.append(typeElement);
		modalBody.append(abilitiesElement);
	}

	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem,
		loadList: loadList,
		showDetails: showDetails,
		loadDetails: loadDetails,
	};
})();

pokemonRepository.loadList().then(function() {
	pokemonRepository.getAll().forEach(function(pokemon) {
		pokemonRepository.addListItem(pokemon);
	});
});
// //My 6 Starters always when playing pokemon growing up
// { name: "Charizard", height: 5.6, types: ["fire", "flying"] },
// { name: "Alakazam", height: 4.9, types: ["psychic"] },
// { name: "Dragonite", height: 7.2, types: ["dragon", "flying"] },
// { name: "Scyther", height: 4.9, types: ["bug", "flying"] },
// { name: "Gyarados", height: 21.3, types: ["water", "flying"] },
// { name: "Jolteon", height: 2.6, types: ["electric"] },
// //Honorable mentions:gengar, lapras, articuno, zapdos,
// //mewtwo, raichu, pidgeot.
