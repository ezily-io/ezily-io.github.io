(() => {
  'use strict';
  const root = document.querySelector('.or-page');
  if (!root) return;
  const tabs = [...root.querySelectorAll('[data-or-mode]')];
  const panel = root.querySelector('#or-workspace');
  const modes = {
    products: {title:"商品資料",labels:["商品","上架內容","來源"],values:["The Everyday Set","名稱、規格、圖片","同一份主檔"],column:"商品資料",channel:"已同步上架"},
    inventory: {title:"庫存",labels:["可售量","預留方式","來源"],values:["共用庫存","全通路共用","同一份庫存主檔"],column:"庫存",channel:"共用庫存已同步"},
    pricing: {title:"價格",labels:["價格規則","促銷活動","來源"],values:["標準售價","各通路另設規則","同一份價格主檔"],column:"價格",channel:"價格規則已同步"},
    orders: {title:"訂單資料",labels:["檢視","下一步","來源"],values:["同一份訂單列表","確認出貨進度","已串接的通路"],column:"訂單資料",channel:"訂單已集中"}
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
    root.querySelector('#or-update-note').textContent = "{x}只改一次，範例通路同步更新。".replace('{x}', mode.title);
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
