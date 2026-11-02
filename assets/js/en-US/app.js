(() => {
  const header=document.querySelector('.ez-header');
  const toggle=document.querySelector('.ez-menu-toggle');
  const close=()=>{if(header)header.dataset.menu='closed';toggle?.setAttribute('aria-expanded','false');};
  toggle?.addEventListener('click',()=>{const open=header.dataset.menu!=='open';header.dataset.menu=open?'open':'closed';toggle.setAttribute('aria-expanded',String(open));});
  header?.querySelectorAll('details').forEach(group=>group.addEventListener('toggle',()=>{if(group.open)header.querySelectorAll('details').forEach(other=>{if(other!==group)other.open=false;});}));
  document.addEventListener('click',event=>{if(!header?.contains(event.target)){close();header?.querySelectorAll('details').forEach(d=>d.open=false);}});
  header?.querySelectorAll('a').forEach(link=>link.addEventListener('click',close));
  document.addEventListener('keydown',event=>{if(event.key==='Escape'){const open=header?.dataset.menu==='open';close();header?.querySelectorAll('details').forEach(d=>d.open=false);if(open)toggle?.focus();}});
  document.querySelectorAll('[data-toc]').forEach(nav=>{
    const target=nav.closest('main')?.querySelector('[data-toc-target]');
    const list=nav.querySelector('[data-toc-list]');
    if(!target||!list)return;
    const headings=[...target.querySelectorAll('h2,h3')];
    if(!headings.length){nav.hidden=true;return;}
    headings.forEach((heading,index)=>{
      if(!heading.id)heading.id='section-'+(index+1);
      const li=document.createElement('li');li.dataset.level=heading.tagName.toLowerCase();
      const a=document.createElement('a');a.href='#'+heading.id;a.textContent=heading.textContent.trim();li.append(a);list.append(li);
    });
  });
})();

(function(){
var dlg=document.getElementById('hp-product-dialog'),open=document.getElementById('hp-open-product');
if(!dlg||!open||typeof dlg.showModal!=='function')return;
open.addEventListener('click',function(){dlg.showModal()});
document.getElementById('hp-close-product').addEventListener('click',function(){dlg.close()});
dlg.addEventListener('close',function(){open.focus()});
dlg.addEventListener('click',function(e){if(e.target===dlg){var r=dlg.getBoundingClientRect();
if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dlg.close()}});
})();
(function(){
var items=[{title:"Product data",description:"Manage product data centrally. Update once, and it syncs to every channel."},{title:"Inventory",description:"Hold inventory in one place, so every channel shares the updated count."},{title:"Pricing",description:"No logging into each back office. Adjust once, and it syncs to every channel."},{title:"Orders",description:"Keep every channel's orders together, managed from one place."}];
var tabs=[].slice.call(document.querySelectorAll('.hp-sync-tab'));
function sel(n){var it=items[n];
tabs.forEach(function(t,i){t.setAttribute('aria-selected',String(i===n));t.tabIndex=i===n?0:-1});
document.getElementById('hp-sync-panel').setAttribute('aria-labelledby','hp-sync-tab-'+n);
document.getElementById('hp-sync-resource').textContent=it.title;
document.getElementById('hp-sync-description').textContent=it.description;}
tabs.forEach(function(t,i){t.addEventListener('click',function(){sel(i)});
t.addEventListener('keydown',function(e){var n=i;if(e.key==='ArrowRight')n=(i+1)%tabs.length;
else if(e.key==='ArrowLeft')n=(i+tabs.length-1)%tabs.length;else if(e.key==='Home')n=0;
else if(e.key==='End')n=tabs.length-1;else return;e.preventDefault();sel(n);tabs[n].focus()});});
})();
/* Staggered scroll reveal. Finite, once per element, transform and opacity only.
   Reduced motion is handled in CSS; the observer is skipped outright. */
(function(){
  var rv = document.querySelectorAll("[data-rv]");
  if (!rv.length) return;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion:reduce)").matches;
  if (!("IntersectionObserver" in window) || reduce) {
    Array.prototype.forEach.call(rv, function(e){ e.classList.add("rv-in"); });
    return;
  }
  var io = new IntersectionObserver(function(rows, obs){
    rows.forEach(function(r){
      if (r.isIntersecting) { r.target.classList.add("rv-in"); obs.unobserve(r.target); }
    });
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0.08 });
  Array.prototype.forEach.call(rv, function(e){ io.observe(e); });
  requestAnimationFrame(function(){
    Array.prototype.forEach.call(rv, function(e){
      if (e.getBoundingClientRect().top < innerHeight * 0.9) e.classList.add("rv-in");
    });
  });
})();
(function(){
  var bar = document.querySelector(".bar"), btn = document.querySelector(".navtoggle");
  if(!bar || !btn) return;
  function set(open){
    bar.setAttribute("data-nav", open ? "open" : "closed");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  }
  set(false);
  btn.addEventListener("click", function(){
    set(bar.getAttribute("data-nav") !== "open");
  });
  document.addEventListener("keydown", function(e){
    if(e.key === "Escape" && bar.getAttribute("data-nav") === "open"){ set(false); btn.focus(); }
  });
  // A resize past the breakpoint must not leave the desktop nav in a closed state.
  addEventListener("resize", function(){ if(innerWidth > 768) set(false); });

  /* Language picker. <details> already gives the open state, the keyboard and
     the accessibility tree, so this only adds the two behaviours a native
     disclosure has no opinion about: a click outside closes it, and Escape
     closes it and returns focus to the trigger. With no JS it still opens,
     still switches language, and simply stays open until it is clicked again --
     which is why it is a <details> and not a scripted menu. */
  var lp = document.querySelector(".langpick");
  if(lp){
    document.addEventListener("click", function(e){
      if(lp.open && !lp.contains(e.target)) lp.open = false;
    });
    lp.addEventListener("keydown", function(e){
      if(e.key === "Escape" && lp.open){
        lp.open = false;
        var sm = lp.querySelector("summary");
        if(sm) sm.focus();
      }
    });
  }
})();
/* The hairline under the sticky bar, only once content is under it. §7 bans any
   listener on the raw scroll event, so this watches a one-pixel sentinel at the
   top of the document with the same observer the reveal uses. The sentinel is
   created here rather than emitted into every page: with no JS there is no
   sentinel, no attribute, and the rule simply stays drawn. */
(function(){
  var bar = document.querySelector(".bar");
  if (!bar || !("IntersectionObserver" in window)) return;
  var s = document.createElement("div");
  s.setAttribute("aria-hidden", "true");
  s.style.cssText = "position:absolute;top:0;left:0;width:1px;height:1px;pointer-events:none";
  document.body.prepend(s);
  /* Seed the state from the scroll position rather than from the observer. The
     first callback can arrive before the sentinel has been laid out, and it
     then reports a zero rect as "not intersecting" - the rule was drawn on a
     page sitting at the top until the reader's first scroll. Reading scrollY
     once at startup is not a scroll listener. */
  function set(atTop){ bar.setAttribute("data-scrolled", atTop ? "false" : "true"); }
  set((window.pageYOffset || document.documentElement.scrollTop || 0) === 0);
  var io = new IntersectionObserver(function(r){ set(r[0].isIntersecting); }, { threshold: 0 });
  /* One frame later, so the observer's own first callback measures a laid-out
     element instead of an empty rect. */
  requestAnimationFrame(function(){ io.observe(s); });
})();
(function(){
  var w = document.querySelector("[data-entries]");
  if (!w) return;
  var entries = JSON.parse(w.dataset.entries);
  var tabs = w.querySelectorAll(".entry-tab");
  var badge = w.querySelector(".destination-badge");
  var time = w.querySelector(".destination-time");
  var heading = w.querySelector(".destination-heading");
  var copy = w.querySelector(".destination-copy");
  var proof = w.querySelector(".destination-proof");
  var avatars = w.querySelector(".avatars");
  function select(idx) {
    var d = entries[idx];
    tabs.forEach(function(t, i) { t.setAttribute("aria-selected", String(i === idx)); });
    badge.textContent = d.badge;
    time.textContent = d.time;
    heading.textContent = d.heading;
    copy.textContent = d.body;
    proof.textContent = d.proof;
    if (avatars) {
      if (d.avatars && d.avatars.length) {
        avatars.innerHTML = d.avatars.map(function(a) {
          return '<span class="avatar">' + a + '</span>';
        }).join("");
        avatars.style.display = "";
      } else { avatars.style.display = "none"; }
    }
  }
  tabs.forEach(function(tab, i) {
    tab.addEventListener("click", function() { select(i); });
    tab.addEventListener("keydown", function(e) {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      var next = e.key === "ArrowRight" ? (i + 1) % tabs.length : (i - 1 + tabs.length) % tabs.length;
      tabs[next].focus(); select(next);
    });
  });
})();
/* The Talk-with-us buttons open the code rather than the Mini App link.
   If <dialog> is unsupported the handler never binds and the anchors navigate. */
(function(){
  var d = document.getElementById("contact-modal");
  if (!d || typeof d.showModal !== "function") return;
  var opener = null;
  document.addEventListener("click", function(e){
    var t = e.target;
    if (!t || !t.closest) return;
    var a = t.closest("a[data-contact]");
    if (a) {
      /* A phone cannot scan a QR code on its own screen, and the href is a
         working miniapp.line.me deep link that opens LINE natively. So coarse
         pointers follow the link and only pointer devices get the code.
         Tested at click rather than at bind: an input mode can change under a
         tab, and the modal was a dead end on the product's primary device. */
      if (window.matchMedia && window.matchMedia("(pointer:coarse)").matches) return;
      e.preventDefault();
      opener = a;
      d.showModal();
      /* Focus the dialog rather than the close button, so opening does not
         land a focus ring on the X. Tab from here still reaches it. */
      d.focus();
    }
  });
  /* Focusing the dialog above opts out of the UA's own focus restore, so put
     the caret back on the button that opened it. */
  d.addEventListener("close", function(){
    if (opener && opener.focus) opener.focus();
    opener = null;
  });
  d.addEventListener("click", function(e){
    /* e.target is the dialog itself only for clicks on the backdrop. */
    if (e.target === d || (e.target.closest && e.target.closest("[data-close]"))) d.close();
  });
  /* Escape is the UA's job on a modal dialog, but it does not fire everywhere.
     A modal has to be dismissable from the keyboard, so this does not assume. */
  document.addEventListener("keydown", function(e){
    if (d.open && (e.key === "Escape" || e.key === "Esc")) { e.preventDefault(); d.close(); }
  });
})();
/* First-visit card + footer control + settings dialog, all reading and
   writing one versioned localStorage key. A missing or unreadable value is
   treated as "necessary only" (analytics: false) rather than as consent. */
(function(){
  if (window.__ezilyConsentBound) return;
  window.__ezilyConsentBound = true;

  var STORAGE_KEY = "ezily.cookie-consent.v1";
  var banner = document.getElementById("cc-banner");
  var dialog = document.getElementById("cc-settings");
  var openBtn = document.querySelector("[data-cc-open]");
  var analyticsBox = dialog ? dialog.querySelector("#cc-analytics") : null;

  function read(){
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var v = JSON.parse(raw);
      if (v && typeof v.analytics === "boolean") return v;
    } catch (e) {}
    return null;
  }

  function write(analytics){
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
        analytics: analytics,
        updatedAt: new Date().toISOString()
      }));
    } catch (e) {}
  }

  /* The integration point: a future analytics loader reads this once and
     listens for it after, instead of this file knowing anything about GA. */
  function apply(analytics){
    document.dispatchEvent(new CustomEvent("ezily:consent", { detail: { analytics: analytics } }));
  }

  window.ezilyConsent = {
    get: function(){ var v = read(); return { analytics: !!(v && v.analytics) }; },
    set: function(analytics){ write(!!analytics); apply(!!analytics); }
  };

  var stored = read();
  apply(stored ? stored.analytics : false);
  if (banner) banner.hidden = !!stored;

  function save(analytics){
    write(analytics);
    apply(analytics);
    if (banner) banner.hidden = true;
  }

  document.addEventListener("click", function(e){
    var t = e.target;
    if (!t || !t.closest) return;
    if (t.closest("[data-cc-necessary]")) save(false);
    else if (t.closest("[data-cc-accept]")) save(true);
  });

  if (!dialog || typeof dialog.showModal !== "function") return;

  var opener = null;
  if (openBtn) {
    openBtn.addEventListener("click", function(){
      var v = read();
      if (analyticsBox) analyticsBox.checked = !!(v && v.analytics);
      opener = openBtn;
      dialog.showModal();
    });
  }
  /* Closing via X, backdrop, or Escape is a dismissal, not a save. */
  dialog.addEventListener("close", function(){
    if (opener && opener.focus) opener.focus();
    opener = null;
  });
  dialog.addEventListener("click", function(e){
    if (e.target === dialog || (e.target.closest && e.target.closest("[data-cc-close]"))) dialog.close();
  });
  document.addEventListener("keydown", function(e){
    if (dialog.open && (e.key === "Escape" || e.key === "Esc")) { e.preventDefault(); dialog.close(); }
  });
  var saveBtn = dialog.querySelector("[data-cc-save]");
  if (saveBtn) {
    saveBtn.addEventListener("click", function(){
      save(!!(analyticsBox && analyticsBox.checked));
      dialog.close();
    });
  }
})();