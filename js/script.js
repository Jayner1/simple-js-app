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

	const search = document.getElementById('search')
	search.addEventListener('input', searchList);

	function searchList() {
		let searchInput = document.getElementById('search').value;
		searchInput = searchInput.toLowerCase();
		const listItems = ('button');
		listItems.each(function() {
		const item = (this);
		const name = item.text();
		if (name.includes(searchInput)) {
		item.show();
		} else {
		item.hide();
		}});
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
