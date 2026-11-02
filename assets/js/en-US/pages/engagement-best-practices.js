(() => {
  'use strict';
  const root = document.querySelector('.eg-page');
  if (!root) return;
  const choices = [...root.querySelectorAll('[data-eg-choice]')];
  choices.forEach(button => {
    button.addEventListener('click', () => {
      const gift = button.dataset.egChoice === 'gift';
      choices.forEach(choice => { choice.setAttribute('aria-pressed', String(choice === button)); });
      const tag = gift ? "Intent · thoughtful gift" : "Interest · daily care";
      const next = gift ? "Show a personal gift journey" : "Show the daily ritual";
      root.querySelector('#eg-trace-tag').textContent = tag;
      root.querySelector('#eg-trace-next').textContent = next;
      root.querySelector('#eg-trace-status').textContent = "Your choice now shapes the next moment.";
      root.querySelector('#eg-live-interest').textContent = tag;
      root.querySelector('#eg-live-action').textContent = gift ? "A more thoughtful gift experience." : "A more relevant daily ritual.";
    });
  });
})();
