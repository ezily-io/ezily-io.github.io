(() => {
  'use strict';
  const root = document.querySelector('.eg-page');
  if (!root) return;
  const choices = [...root.querySelectorAll('[data-eg-choice]')];
  choices.forEach(button => {
    button.addEventListener('click', () => {
      const gift = button.dataset.egChoice === 'gift';
      choices.forEach(choice => { choice.setAttribute('aria-pressed', String(choice === button)); });
      const tag = gift ? "意圖 · 送禮" : "興趣 · 日常保養";
      const next = gift ? "帶他走一趟送禮流程" : "推薦日常保養組合";
      root.querySelector('#eg-trace-tag').textContent = tag;
      root.querySelector('#eg-trace-next').textContent = next;
      root.querySelector('#eg-trace-status').textContent = "你現在的選擇，決定下一刻看到什麼。";
      root.querySelector('#eg-live-interest').textContent = tag;
      root.querySelector('#eg-live-action').textContent = gift ? "更用心的送禮體驗。" : "更貼近你的日常保養。";
    });
  });
})();
