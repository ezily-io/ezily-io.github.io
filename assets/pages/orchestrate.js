(() => {
  'use strict';
  const root = document.querySelector('.or-page');
  if (!root) return;
  const tabs = [...root.querySelectorAll('[data-or-mode]')];
  const panel = root.querySelector('#or-workspace');
  const modes = {
    products: {title:'Product data',labels:['Product','Listing','Source'],values:['The Everyday Set','Names, specs and images','One master record'],column:'Product data',channel:'Listing synced'},
    inventory: {title:'Inventory',labels:['Availability','Reservation','Source'],values:['Shared stock','Across channels','One inventory record'],column:'Inventory',channel:'Shared stock synced'},
    pricing: {title:'Pricing',labels:['Price rule','Promotions','Source'],values:['Standard pricing','Per-channel rules','One pricing record'],column:'Pricing',channel:'Pricing rules synced'},
    orders: {title:'Order data',labels:['View','Next step','Source'],values:['One shared order list','Review fulfillment','Connected channels'],column:'Order data',channel:'Orders in one list'}
  };
  function select(index, focus = false) {
    const tab = tabs[(index + tabs.length) % tabs.length];
    const mode = modes[tab.dataset.orMode];
    if (!mode) return;
    tabs.forEach(item => {
      item.setAttribute('aria-selected', String(item === tab));
      item.tabIndex = item === tab ? 0 : -1;
    });
    panel?.setAttribute('aria-labelledby', tab.id);
    root.querySelector('#or-resource').textContent = mode.title;
    root.querySelector('#or-column-label').textContent = mode.column;
    mode.labels.forEach((label, position) => {
      root.querySelector('#or-field-label-' + (position + 1)).textContent = label;
      root.querySelector('#or-field-value-' + (position + 1)).textContent = mode.values[position];
    });
    root.querySelectorAll('.or-channel-value').forEach(value => { value.textContent = mode.channel; });
    root.querySelector('#or-update-note').textContent = mode.title + ' changed once. The example channels share the update.';
    if (focus) tab.focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(index));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = index + 1;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = index - 1;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); select(next, true); }
    });
  });
})();
