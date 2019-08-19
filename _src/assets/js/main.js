'use strict';

const choiceForm = document.querySelector('.js__pairs__choice');
const pokemonList = document.querySelector('.js__pairs__list');

function pokemonChoice(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const valueRadio = formData.get('pokemon-choice');

  fetch(`https://raw.githubusercontent.com/Adalab/cards-data/master/${valueRadio}.json`)
    .then(response => response.json())
    .then(pokemons => {
      pokemonList.innerHTML = '';
      pokemonList.classList.remove('pairs__list--layout-4');
      pokemonList.classList.remove('pairs__list--layout-6');
      pokemonList.classList.remove('pairs__list--layout-8');
      pokemonList.classList.add(`pairs__list--layout-${valueRadio}`);
      for (const pokemon of pokemons) {
        const newLi = document.createElement('li');
        newLi.classList.add('js__pairs__list__element');
        newLi.classList.add('pairs__list__element');
        newLi.dataset['url'] = `url('${pokemon.image}')`;
        newLi.dataset['pair'] = pokemon.pair;
        pokemonList.appendChild(newLi);

        newLi.addEventListener('click', selectPokemon);
      }
    }
    );
}

function selectPokemon(event) {
  console.log('funciono');
}

choiceForm.addEventListener('submit', pokemonChoice);
