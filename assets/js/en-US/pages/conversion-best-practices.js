(() => {
  'use strict';
  const page = document.querySelector('.cv-page');
  if (!page) return;
  const tabs = [...page.querySelectorAll('[data-cv-select]')];
  const modes = {
    group: ["A friend's invitation", "The Everyday Set. Shall we get one together?", "Open the group buy", "The reason to buy travels with the link.", "Should I join?", "Put group progress and the deadline beside the product.", "Group progress", "With the product"],
    drop: ["A launch reminder", "The daily edit is about to drop. Be there for the moment.", "Open the limited drop", "The cutoff belongs in the buying experience.", "What if I wait?", "Make the launch, stock, and cutoff clear before checkout.", "Offer window", "A clear start and finish"],
    gift: ["A reason to give", "A little something, just for you. Make this one personal.", "Open the gifting experience", "The intention to give carries into checkout.", "Who is it for?", "Keep the recipient and gift message together with the order.", "Gift message", "A little something, just for you."],
    vip: ["An invitation for members", "Your member edit is ready. A selection chosen for you.", "Open the member event", "Membership shapes the products and the message.", "What is for me?", "Let member tags guide access, selections, and the buying context.", "Member access", "An invited selection"],
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
