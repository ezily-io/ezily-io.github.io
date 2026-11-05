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
      ["A visible first outcome.", "Validate the handoff, agree on the plan, and establish the account's operating rhythm.", ["Scope and customer sign-off", "A visible first outcome", "An operating rhythm"]],
      ["Turn usage into results.", "Find friction, coordinate the right teams, and turn an evidenced proposal into a scoped experiment.", ["Active platform use", "Cross-team issue ownership", "Evidence for the next experiment"]],
      ["Carry the relationship forward.", "Stay accountable for the customer relationship, ongoing value, and a clear renewal conversation.", ["Review delivered value", "Understand the account", "Coordinate the next commitment"]],
    ],
    csmtp: [
      ["One use case, live first.", "Learn the brand's goals, its LINE Official Account, and its commerce setup, then plan the first launch.", ["Goals and success criteria", "Current LINE and commerce setup", "A first launch plan"]],
      ["Clear the blockers to launch.", "Turn the need into an interaction flow, line up content and data, and test it to launch with the brand and our teams.", ["Flow and content requirements", "Pre-launch testing", "Agreed responsibilities"]],
      ["Let the results set the next step.", "Read the funnel from exposure to conversion, and say plainly what worked and where people dropped off.", ["Funnel and drop-offs", "A performance review", "Feedback for the product team"]],
    ],
    frontend: [
      ["Build beyond the happy path.", "Component foundations, visual judgment, and accessible interactions all belong in the frontend.", ["A clear next step.", "Your buying experience, ready to use.", "Ready"]],
      ["Stay useful mid-response.", "Handle streaming responses, latency, and loading states as part of the product experience.", ["The response is arriving.", "Keep context visible while the next part arrives.", "Streaming"]],
      ["Leave a clear recovery path.", "Design fallback behavior and handle imperfect model output gracefully.", ["A way forward.", "Keep the context and explain what can happen next.", "Recovery state"]],
    ],
    fullstack: [
      ["Own what reaches the customer.", "Connect interface decisions to API contracts, data, and production outcomes."],
      ["Make the contract hold.", "Design and deliver maintainable services, coordinate integrations, and make the trade-offs explicit."],
      ["Stay responsible in production.", "Understand the data and the operational behavior of the services you build."],
    ],
    product: [
      ["Start with the merchant.", "Interviews, data, and channel feedback become a clear point of view on what to build."],
      ["Give the team's effort a direction.", "Choose priorities, write clear requirements, and make informed trade-offs with engineering."],
      ["Own the launch and the learning.", "Plan rollout, enable the team, communicate with merchants, and review what happened after launch."],
    ],
    sales: [
      ["Find the right fit.", "Qualify customer pain, urgency, buying readiness, and the likelihood of adoption."],
      ["Make a proposal that can be delivered.", "Negotiate within the agreed guardrails and make scope, terms, and exceptions explicit."],
      ["Carry the promise through the handoff.", "Create a structured handoff to Customer Success, with the customer need and commitments intact."],
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
    if (role === 'csm' || role === 'csmtp') page.querySelectorAll('[data-cj-item]').forEach((node, position) => { node.textContent = data[2][position]; });
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
