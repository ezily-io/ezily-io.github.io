(() => {
  'use strict';
  const hub = document.querySelector('.ca-careers');
  if (hub) {
    const filters = [...hub.querySelectorAll('.cr-filter')];
    const roles = [...hub.querySelectorAll('.cr-role')];
    const count = hub.querySelector('#cr-role-count');
    filters.forEach(button => {
      button.addEventListener('click', () => {
        filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
        let visible = 0;
        roles.forEach(role => {
          role.hidden = button.dataset.filter !== 'all' && role.dataset.category !== button.dataset.filter;
          if (!role.hidden) visible++;
        });
        if (count) count.textContent = (count.dataset.fmt || 'Showing {n} roles').replace('{n}', String(visible));
      });
    });
  }
  const page = document.querySelector('.cj-job');
  if (!page) return;
  const role = page.dataset.cjRole;
  const tabs = [...page.querySelectorAll('[data-cj-stage]')];
  const work = {
    csm: [
      ["看得見的第一個成果。", "確認交接內容、對齊計畫，建立這個客戶的營運節奏。", ["確認範圍、客戶簽核", "看得見的第一個成果", "固定的營運節奏"]],
      ["讓用量變成成效。", "找出卡住的地方，協調對的團隊，把有根據的提案變成範圍明確的實驗。", ["平台被穩定使用", "跨團隊問題一路追到底", "下一個實驗的依據"]],
      ["把關係延續下去。", "持續為客戶關係和長期價值負責，帶出一場清楚的續約對話。", ["回顧已交付的價值", "摸清這個客戶", "談定下一步的承諾"]],
    ],
    frontend: [
      ["不只顧好順利的情況。", "元件基礎、視覺判斷、無障礙互動，都是前端的事。", ["下一步很清楚。", "你的購物體驗準備好了。", "可以開始"]],
      ["回應途中，也要好用。", "串流回應、延遲和載入狀態，都當成產品體驗的一部分來處理。", ["回覆正在產生。", "下一段出來之前，前面的內容都還在。", "串流中"]],
      ["留一條清楚的退路。", "設計備援行為，從容接住不完美的模型輸出。", ["還有路可走。", "剛才的內容都還在，看看接下來可以怎麼做。", "錯誤復原"]],
    ],
    fullstack: [
      ["交到客戶手上的，由你負責。", "把介面決策和 API 合約、資料、正式環境的結果連在一起。"],
      ["讓 API 合約守得住。", "設計並交付好維護的服務，協調各方整合，把取捨講清楚。"],
      ["上線之後，也是你的責任。", "搞懂你寫的服務：用到哪些資料、在正式環境裡怎麼運作。"],
    ],
    product: [
      ["從商家出發。", "訪談、資料和通路回饋，收斂成一個清楚的判斷：該做什麼。"],
      ["讓團隊的力氣有方向。", "排定優先順序、寫清楚需求，和工程一起做有根據的取捨。"],
      ["上線和事後學到的，都由你負責。", "規劃上線節奏、讓團隊準備好、和商家溝通，上線後再回頭檢討。"],
    ],
    sales: [
      ["找到對的客戶。", "評估客戶的痛點、急迫程度、採購準備度，以及導入的可能性。"],
      ["提出做得到的提案。", "在議定的範圍內談判，把範圍、條件和例外講清楚。"],
      ["答應的事要接得上。", "用有結構的交接把案子交給客戶成功團隊，客戶需求和承諾一項不漏。"],
    ],
  };
  if (!work[role] || !tabs.length) return;
  function select(index) {
    const active = (index + tabs.length) % tabs.length;
    const data = work[role][active];
    tabs.forEach((tab, position) => { tab.setAttribute('aria-selected', String(position === active)); tab.tabIndex = position === active ? 0 : -1; });
    page.querySelector('#cj-work-title').textContent = data[0];
    page.querySelector('#cj-work-copy').textContent = data[1];
    page.querySelector('#cj-work-panel').setAttribute('aria-labelledby', tabs[active].id);
    if (role === 'csm') page.querySelectorAll('[data-cj-item]').forEach((node, position) => { node.textContent = data[2][position]; });
    if (role === 'frontend') {
      page.querySelector('[data-cj-preview]').dataset.cjPreview = ['default', 'streaming', 'recovery'][active];
      ['cj-preview-title', 'cj-preview-copy', 'cj-preview-action'].forEach((id, position) => { page.querySelector('#' + id).textContent = data[2][position]; });
    }
    return tabs[active];
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(index));
    tab.addEventListener('keydown', event => {
      const next = event.key === 'ArrowRight' ? index + 1 : event.key === 'ArrowLeft' ? index - 1 : event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : null;
      if (next !== null) { event.preventDefault(); select(next).focus(); }
    });
  });
})();
