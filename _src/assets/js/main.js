'use strict';

const urlDefaultImage = `url("https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB")`;
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
        newLi.style.backgroundImage = urlDefaultImage;
        newLi.dataset['url'] = `url('${pokemon.image}')`;
        newLi.dataset['pair'] = pokemon.pair;
        pokemonList.appendChild(newLi);

        newLi.addEventListener('click', selectPokemon);
      }
    }
    );
}

function selectPokemon(event) {
  const card = event.currentTarget;
  console.log(card.style.backgroundImage);
  console.log(urlDefaultImage);
  card.style.backgroundImage = card.style.backgroundImage === urlDefaultImage
    ? card.dataset['url']
    : urlDefaultImage;
}

choiceForm.addEventListener('submit', pokemonChoice);
