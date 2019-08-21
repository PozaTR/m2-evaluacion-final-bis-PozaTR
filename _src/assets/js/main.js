'use strict';

const urlDefaultImage = `url("https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB")`;
const choiceForm = document.querySelector('.js__pairs__choice');
const pokemonList = document.querySelector('.js__pairs__list');
const radioNumbers = document.querySelectorAll('.js__pairs__choice [name="pokemon-choice"]');
let arrCards = [];

const defaultValue = '4';

const numberCards = localStorage.getItem('numberCards')
  ? localStorage.getItem('numberCards')
  : defaultValue;

for (const radioNumber of radioNumbers) {
  radioNumber.checked = radioNumber.value === numberCards;
}

function pokemonChoice(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const valueRadio = formData.get('pokemon-choice');
  localStorage.setItem('numberCards', valueRadio);

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

function flipCard(cardToFlip) {
  cardToFlip.style.backgroundImage = cardToFlip.style.backgroundImage === urlDefaultImage
    ? cardToFlip.dataset['url']
    : urlDefaultImage;
}

function selectPokemon(event) {
  const card = event.currentTarget;
  if(!card.classList.contains('pairs__list__element--find')) {
    arrCards.push(card);
    flipCard(card);
    if(arrCards.length === 2) {
      if(arrCards[0].dataset['pair'] === arrCards[1].dataset['pair']) {
        arrCards[0].classList.add('pairs__list__element--find');
        arrCards[1].classList.add('pairs__list__element--find');
        arrCards = [];
      } else {
        const removeCard = () => {
          flipCard(arrCards[0]);
          flipCard(arrCards[1]);
          arrCards = [];
        };
        setTimeout(removeCard, 1000);
      }
    }
  }
}

choiceForm.addEventListener('submit', pokemonChoice);
