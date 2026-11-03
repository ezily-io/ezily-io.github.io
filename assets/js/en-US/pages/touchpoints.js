(() => {
  'use strict';
  const page = document.querySelector('.tp-page');
  if (!page) return;
  const modes = {
    group: ["A group chat.\nA reason to buy.", "A little more, together.", "See the group before you join.", "Group progress", "Friends are joining", "Deadline", "With the product", "See the group buy", '#e9def7'],
    sale: ["A closing-soon alert.\nA moment to act.", "Make the moment yours.", "Countdown, stock, and product on one page.", "Offer closes", "With a clear cutoff", "Stock", "Beside the product", "View the flash sale", '#e4edca'],
    vip: ["A member invite.\nA reason to return.", "An invitation for you.", "Member access and a selected product mix.", "Access", "Invited members", "Selection", "Exclusive picks", "View member selections", '#f0e2d3'],
  };
  const tabs = [...page.querySelectorAll('[data-tp-mode]')];
  const fields = ['tp-context-label', 'tp-live-title', 'tp-live-description', 'tp-fact-label-a', 'tp-fact-value-a', 'tp-fact-label-b', 'tp-fact-value-b', 'tp-live-action'];
  const panel = page.querySelector('#tp-scene-panel');
  const select = index => {
    const tab = tabs[(index + tabs.length) % tabs.length];
    const values = modes[tab.dataset.tpMode];
    tabs.forEach(item => { item.setAttribute('aria-selected', String(item === tab)); item.tabIndex = item === tab ? 0 : -1; });
    fields.forEach((id, field) => { const node = page.querySelector('#' + id); if (node) node.textContent = values[field]; });
    page.querySelector('.tp-live-product').style.backgroundColor = values[8];
    panel.setAttribute('aria-labelledby', tab.id);
    return tab;
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(index));
    tab.addEventListener('keydown', event => {
      const next = event.key === 'ArrowRight' ? index + 1 : event.key === 'ArrowLeft' ? index - 1 : event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : null;
      if (next !== null) { event.preventDefault(); select(next).focus(); }
    });
  });
  page.querySelectorAll('[data-tp-need]').forEach(button => {
    button.addEventListener('click', () => {
      const gift = button.dataset.tpNeed === 'gift';
      page.querySelectorAll('[data-tp-need]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      page.querySelector('#tp-pick-title').textContent = gift ? "A thoughtful everyday gift." : "Your everyday edit.";
      page.querySelector('#tp-pick-copy').textContent = gift ? "A set selected for someone you want to treat." : "A set selected for a simple daily routine.";
    });
  });
})();
