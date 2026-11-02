(() => {
  'use strict';
  const page = document.querySelector('.bl-page');
  if (!page || page.dataset.blogReady) return;
  page.dataset.blogReady = 'true';
  const cards = [...page.querySelectorAll('.bl-card')];
  const filters = [...page.querySelectorAll('[data-filter]')];
  const search = page.querySelector('#bl-search');
  const more = page.querySelector('#bl-more');
  const empty = page.querySelector('#bl-empty');
  const bottom = page.querySelector('#bl-bottom');
  const count = page.querySelector('#bl-count');
  const shown = page.querySelector('#bl-shown');
  let filter = 'all';
  let limit = 6;
  function render() {
    const words = (search?.value || '').trim().toLowerCase().split(/\s+/).filter(Boolean);
    const matched = cards.filter(card => (filter === 'all' || card.dataset.cats.split(/\s+/).includes(filter)) && words.every(word => card.dataset.text.includes(word)));
    cards.forEach(card => { card.hidden = true; });
    matched.forEach((card, index) => { card.hidden = index >= limit; });
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === filter)));
    if (count) count.textContent = `${matched.length} ${matched.length === 1 ? 'post' : 'posts'}`;
    if (shown) shown.textContent = `Showing ${Math.min(limit, matched.length)} / ${matched.length} posts`;
    if (empty) empty.hidden = matched.length > 0;
    if (bottom) bottom.hidden = matched.length === 0;
    if (more) more.hidden = matched.length <= limit;
  }
  filters.forEach(button => button.addEventListener('click', () => { filter = button.dataset.filter; limit = 6; render(); }));
  search?.addEventListener('input', () => { limit = 6; render(); });
  more?.addEventListener('click', () => { limit += 6; render(); });
  page.querySelector('#bl-reset')?.addEventListener('click', () => { filter = 'all'; if (search) search.value = ''; limit = 6; render(); search?.focus({preventScroll:true}); });
  render();
})();
