'use strict';

const choiceForm = document.querySelector('.js__pairs__choice');

function pokemonChoice(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const valueRadio = formData.get('pokemon-choice');
}

choiceForm.addEventListener('submit', pokemonChoice);
