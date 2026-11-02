(() => {
  'use strict';
  const root = document.querySelector('.lm-page');
  if (!root) return;
  const tabs = [...root.querySelectorAll('[data-lm-mode]')];
  const panels = [...root.querySelectorAll('[data-lm-panel]')];
  function select(mode, focus = false) {
    const selected = tabs.find(tab => tab.dataset.lmMode === mode);
    if (!selected) return;
    tabs.forEach(tab => {
      tab.setAttribute('aria-selected', String(tab === selected));
      tab.tabIndex = tab === selected ? 0 : -1;
    });
    panels.forEach(panel => { panel.hidden = panel.dataset.lmPanel !== mode; });
    if (focus) selected.focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(tab.dataset.lmMode));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = index + 1;
      if (event.key === 'ArrowLeft') next = index - 1;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) {
        event.preventDefault();
        select(tabs[(next + tabs.length) % tabs.length].dataset.lmMode, true);
      }
    });
  });
  root.querySelectorAll('[data-lm-next]').forEach(button => {
    button.addEventListener('click', () => select(button.dataset.lmNext, true));
  });
  const choices = [...root.querySelectorAll('[data-lm-preference]')];
  choices.forEach(button => {
    button.addEventListener('click', () => {
      choices.forEach(choice => { choice.setAttribute('aria-pressed', String(choice === button)); });
      const gift = button.dataset.lmPreference === 'gift';
      root.querySelector('#lm-preference-note').textContent = gift ? "Context: thoughtful gift" : "Context: daily routine";
      root.querySelector('#lm-order-context').textContent = gift ? "Thoughtful gift" : "Daily routine";
    });
  });
})();
