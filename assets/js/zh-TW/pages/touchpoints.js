(() => {
  'use strict';
  const page = document.querySelector('.tp-page');
  if (!page) return;
  const modes = {
    group: ["朋友在群組揪團，\n買的理由就來了。", "揪朋友，一起買。", "先看團況，再決定跟團。", "跟團進度", "朋友陸續加入", "截止時間", "和商品放一起", "看這團", '#e9def7'],
    sale: ["活動快結束的提醒，\n現在就是下手時機。", "這一波，別錯過。", "倒數、庫存、商品，都在同一頁。", "活動結束", "時間標得清楚", "庫存", "就在商品旁", "看限時搶購", '#e4edca'],
    vip: ["收到會員邀請，\n就有理由再回來。", "這是給你的邀請。", "會員資格，加上精選商品。", "資格", "受邀會員", "選品", "會員專屬精選", "看會員精選", '#f0e2d3'],
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
      page.querySelector('#tp-pick-title').textContent = gift ? "一份貼心的日常小禮。" : "你的日常選物。";
      page.querySelector('#tp-pick-copy').textContent = gift ? "為想好好對待的人挑好的一組。" : "為簡單的日常保養挑好的一組。";
    });
  });
})();
