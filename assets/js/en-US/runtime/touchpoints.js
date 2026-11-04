(function(){
var slides=[{src:"/assets/checkout-manager.png",title:"Checkout group buy manager interface",alt:"Checkout group buy manager interface",width:2370,height:1982},{src:"/assets/checkout-type-selector.png",title:"Create Checkout type selector interface",alt:"Create Checkout type selector interface",width:2400,height:1982}],i=0,total=slides.length;
var tabs=[].slice.call(document.querySelectorAll('.tp-gallery-tab'));
var shot=document.getElementById('tp-gimg'),dlg=document.getElementById('tp-gdialog'),exp=document.getElementById('tp-gexpanded');
function pad(n){return String(n).padStart(2,'0')}
function set(n){i=(n+total)%total;var s=slides[i];
shot.src=s.src;shot.alt=s.alt;shot.width=s.width;shot.height=s.height;
document.getElementById('tp-gtitle').textContent=s.title;
document.getElementById('tp-gcount').textContent=pad(i+1)+' / '+pad(total);
tabs.forEach(function(t,x){t.setAttribute('aria-selected',String(x===i));t.tabIndex=x===i?0:-1});
document.getElementById('tp-gpanel').setAttribute('aria-labelledby','tp-gtab-'+i);}
tabs.forEach(function(t,x){t.addEventListener('click',function(){set(x)});
t.addEventListener('keydown',function(e){var n=x;if(e.key==='ArrowRight')n=(x+1)%total;
else if(e.key==='ArrowLeft')n=(x+total-1)%total;else if(e.key==='Home')n=0;
else if(e.key==='End')n=total-1;else return;e.preventDefault();set(n);tabs[n].focus()});});
document.getElementById('tp-gprev').addEventListener('click',function(){set(i-1)});
document.getElementById('tp-gnext').addEventListener('click',function(){set(i+1)});
var ex=document.getElementById('tp-gexpand');
if(ex&&dlg&&typeof dlg.showModal==='function'){
ex.addEventListener('click',function(){var s=slides[i];exp.src=s.src;exp.alt=s.alt;exp.width=s.width;exp.height=s.height;
document.getElementById('tp-gdtitle').textContent=s.title;dlg.showModal()});
document.getElementById('tp-gclose').addEventListener('click',function(){dlg.close()});
dlg.addEventListener('close',function(){ex.focus()});
dlg.addEventListener('click',function(e){if(e.target===dlg){var r=dlg.getBoundingClientRect();
if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dlg.close()}});}
})();