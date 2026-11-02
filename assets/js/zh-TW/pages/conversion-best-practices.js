(() => {
  'use strict';
  const page = document.querySelector('.cv-page');
  if (!page) return;
  const tabs = [...page.querySelectorAll('[data-cv-select]')];
  const modes = {
    group: ["朋友的邀請", "The Everyday Set，要不要一起團？", "打開團購頁", "購買的理由，跟著連結一起來。", "我要不要跟？", "團購進度和截止時間，就放在商品旁邊。", "團購進度", "跟商品放一起"],
    drop: ["開賣提醒", "今日選品快開賣了，準時來搶。", "打開限量開賣頁", "截止時間，要放進購買體驗裡。", "晚點再買會怎樣？", "結帳前，先把開賣時間、庫存和截止條件說清楚。", "優惠時段", "何時開始、何時結束，一看就懂"],
    gift: ["想送禮的理由", "一點小心意，送給你。這一份，寫上你自己的話。", "打開送禮頁", "送禮的心意，一路帶到結帳。", "要送給誰？", "收禮人和祝福小卡，跟訂單放在一起。", "祝福小卡", "一點小心意，送給你。"],
    vip: ["給會員的邀請", "你的會員選品準備好了，每一件都替你挑過。", "打開會員專場", "會員身分決定看到的商品和訊息。", "哪些是給我的？", "用會員標籤決定誰能進來、看到哪些選品、在什麼情境下購買。", "會員限定", "受邀才看得到的選品"],
  };
  const ids = ['cv-entry-label', 'cv-entry-message', 'cv-entry-link', 'cv-entry-context', 'cv-order-title', 'cv-order-description'];
  function select(index) {
    const tab = tabs[(index + tabs.length) % tabs.length];
    const mode = tab.dataset.cvSelect;
    const data = modes[mode];
    tabs.forEach(item => { item.setAttribute('aria-selected', String(item === tab)); item.tabIndex = item === tab ? 0 : -1; });
    ids.forEach((id, position) => {
      const node = page.querySelector('#' + id);
      if (id === 'cv-entry-link') node.firstChild.textContent = data[position] + ' ';
      else node.textContent = data[position];
    });
    const detail = page.querySelector('#cv-mode-detail');
    detail.querySelector('span').textContent = data[6];
    detail.querySelector('strong').textContent = data[7];
    page.querySelector('.cv-checkout-board').dataset.cvMode = mode;
    page.querySelector('#cv-mode-panel').setAttribute('aria-labelledby', tab.id);
    return tab;
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(index));
    tab.addEventListener('keydown', event => {
      const next = event.key === 'ArrowRight' ? index + 1 : event.key === 'ArrowLeft' ? index - 1 : event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : null;
      if (next !== null) { event.preventDefault(); select(next).focus(); }
    });
  });
})();
