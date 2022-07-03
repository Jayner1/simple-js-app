let pokemonList = [
//My 6 Starters always when playing pokemon growing up
  {name:'Charizard', height:5.6, type:['fire', 'flying']},
  {name:'Alakazam', height:4.9, type:['psychic']},
  {name:'Dragonite', height:7.2, type:['dragon', 'flying']},
  {name:'Scyther', height:4.9, type:['bug', 'flying']}.
  {name:'Gyarados', height:21.3, type:['water', 'flying']},
  {name:'Jolteon', height:2.6, type:['electric']},
//Honorable mentions:gengar, lapras, articuno, zapdos,
//mewtwo, raichu, pidgeot.
];

//working on the for part. Feel confused about it.
for (let i=0; i < pokemonList.length; i++){
  if (pokemonList[i].height <8 && pokemonList[i].height >0){
    document.write(pokemonList[i].height + " is a short Pokemon");
  }else if pokemonList[i].height >8){
    document.write(pokemonList[i].height + " is a tall Pokemon");
  }
}
