/* The Orchestrate hero diagram. A press on one data type marks it pressed,
   drops the three channels out of sync, and brings them back on the new type
   180ms later. The words all come from data- attributes the build wrote from
   content/, so this file holds none. Without JS the diagram still reads, in
   its first state; only the press does nothing. The delay is a state change
   rather than motion, so reduced motion keeps it and CSS drops the movement. */
(function(){
  var root = document.querySelector(".sync");
  if (!root) return;
  var stage = root.querySelector(".sync-stage"),
      btns = Array.prototype.slice.call(root.querySelectorAll(".sync-btn")),
      cards = Array.prototype.slice.call(root.querySelectorAll(".sync-card")),
      name = root.querySelector(".sync-name"),
      state = root.querySelector(".sync-state"), t = null;
  if (!stage || !name || !state || !btns.length) return;
  btns.forEach(function(b){
    b.addEventListener("click", function(){
      btns.forEach(function(x){ x.setAttribute("aria-pressed", String(x === b)); });
      name.textContent = b.getAttribute("data-name");
      stage.setAttribute("data-state", "busy");
      state.textContent = stage.getAttribute("data-busy");
      clearTimeout(t);
      t = setTimeout(function(){
        cards.forEach(function(c){
          var st = c.querySelector(".sync-st");
          if (st) st.textContent = b.getAttribute("data-ok");
        });
        stage.setAttribute("data-state", "done");
        state.textContent = stage.getAttribute("data-done");
      }, 180);
    });
  });
})();