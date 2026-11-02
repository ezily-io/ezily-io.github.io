(() => {
  'use strict';
  const hero = document.querySelector('.u-hero');
  if (!hero) return;
  const tabs = [...hero.querySelectorAll('[data-ui-mode]')];
  const panels = [...hero.querySelectorAll('[data-ui-panel]')];
  const card = hero.querySelector('.u-front-card');
  const stage = hero.querySelector('.u-stage');
  const control = hero.querySelector('#ui-motion');
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!tabs.length || !panels.length || !card) return;

  let active = 0;
  let userPaused = false;
  let hovered = false;
  let focusWithin = false;
  let inView = true;
  let timer = 0;
  const interval = 5800;
  const clearTimer = () => { window.clearTimeout(timer); timer = 0; };
  const canRotate = () => !userPaused && !preference.matches && !hovered && !focusWithin && inView && !document.hidden;

  function schedule() {
    clearTimer();
    if (canRotate()) timer = window.setTimeout(() => { select((active + 1) % tabs.length); }, interval);
    hero.dataset.rotationPaused = String(!canRotate());
  }

  function syncControl() {
    if (!control) return;
    control.hidden = preference.matches;
    control.setAttribute('aria-pressed', String(userPaused || preference.matches));
    control.setAttribute('aria-label', userPaused ? "Play automatic previews" : "Pause automatic previews");
  }

  function select(index, focus = false) {
    active = (index + tabs.length) % tabs.length;
    const mode = tabs[active].dataset.uiMode;
    tabs.forEach((tab, position) => {
      tab.setAttribute('aria-selected', String(position === active));
      tab.tabIndex = position === active ? 0 : -1;
    });
    panels.forEach(panel => { panel.hidden = panel.dataset.uiPanel !== mode; });
    card.dataset.activeMode = mode;
    if (focus) tabs[active].focus();
    schedule();
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(index));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = index + 1;
      if (event.key === 'ArrowLeft') next = index - 1;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) {
        event.preventDefault();
        select(next, true);
      }
    });
  });

  control?.addEventListener('click', () => {
    userPaused = !userPaused;
    syncControl();
    schedule();
  });
  stage?.addEventListener('pointerenter', event => {
    if (event.pointerType === 'touch') return;
    hovered = true;
    schedule();
  });
  stage?.addEventListener('pointerleave', event => {
    if (event.pointerType === 'touch') return;
    hovered = false;
    schedule();
  });
  hero.addEventListener('focusin', () => { focusWithin = true; schedule(); });
  hero.addEventListener('focusout', event => {
    focusWithin = Boolean(event.relatedTarget && hero.contains(event.relatedTarget));
    schedule();
  });
  document.addEventListener('visibilitychange', schedule);
  preference.addEventListener('change', () => { syncControl(); schedule(); });
  if (typeof IntersectionObserver !== 'undefined') {
    const observer = new IntersectionObserver(entries => {
      inView = entries.some(entry => entry.isIntersecting);
      schedule();
    }, { threshold: 0.08 });
    observer.observe(hero);
  }
  window.checkoutPreview = {
    pause() { userPaused = true; syncControl(); schedule(); },
    resume() { userPaused = false; syncControl(); schedule(); },
    select(mode) { const index = tabs.findIndex(tab => tab.dataset.uiMode === mode); if (index >= 0) select(index); },
    get activeMode() { return tabs[active].dataset.uiMode; },
    get paused() { return !canRotate(); },
  };
  syncControl();
  select(0);
})();
