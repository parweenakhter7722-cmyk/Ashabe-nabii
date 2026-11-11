
const lang = document.documentElement.lang || 'en';
const d = window.SEERAT_DATA[lang] || window.SEERAT_DATA.en;
const $ = s => document.querySelector(s);
const isRTL = lang === 'ur' || lang === 'ar';
document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
document.title = `${d.brand} | ${d.tagline}`;
const params = new URLSearchParams(location.search);
const selected = params.get('person');
const cardData = d.cards;
function header(){
 return `<header><div class="wrap nav"><a class="brand" href="./"><span class="brand-mark">۞</span><span>${d.brand}</span></a><div class="nav-right"><select class="lang" aria-label="Language" onchange="location.href='../'+this.value+'/'"><option value="en" ${lang==='en'?'selected':''}>English</option><option value="ur" ${lang==='ur'?'selected':''}>اردو</option><option value="ar" ${lang==='ar'?'selected':''}>العربية</option></select><button class="theme" id="theme" aria-label="Toggle dark mode">◐</button></div></div></header>`;
}
function footer(){return `<footer><div class="wrap footer-inner"><span>© ${new Date().getFullYear()} ${d.brand}</span><span>${d.footer}</span></div></footer>`}
function card(c,i){return `<article class="person" data-id="${c[0]}" data-type="${c[4]}" style="animation-delay:${i*55}ms"><div class="avatar" aria-hidden="true">۞</div><span class="tag">${c[4]}</span><h3>${c[1]}</h3><p>${c[2]}</p><div class="read"><a href="?person=${c[0]}">${d.read} →</a></div></article>`}
function render(){
 const app=$('#app');
 if(selected){
  const c=cardData.find(x=>x[0]===selected);
  if(!c){app.innerHTML=`<main class="wrap detail"><p>${d.noResults}</p><a class="btn primary" href="./">${d.back}</a></main>`}
  else app.innerHTML=`<main class="wrap"><article class="detail"><a class="read" href="./">← ${d.back}</a><div class="avatar">۞</div><span class="tag">${c[4]}</span><h1>${c[1]}</h1><p>${c[2]}</p><div class="known"><strong>${d.known}</strong><br>${c[3]}</div><p>${d.purposeText}</p></article></main>`;
 } else {
  app.innerHTML=`<section class="hero"><div class="wrap"><div class="hero-inner"><div class="eyebrow">${d.eyebrow}</div><h1>${d.heroTitle}</h1><p>${d.heroText}</p><div class="actions"><a class="btn primary" href="#companions">${d.explore} ↓</a><a class="btn secondary" href="#purpose">${d.learn}</a></div></div></div></section>
  <section class="section" id="companions"><div class="wrap"><div class="section-head"><div><h2>${d.featured}</h2><p>${d.featuredText}</p></div></div><div class="tools"><input class="search" id="search" placeholder="${d.search}" aria-label="${d.search}"><div class="filters"><button class="filter active" data-filter="all">${d.all}</button><button class="filter" data-filter="caliph">${d.caliphs}</button><button class="filter" data-filter="women">${d.women}</button><button class="filter" data-filter="companion">${d.companions}</button></div></div><div class="cards" id="cards">${cardData.map(card).join('')}</div></div></section>
  <section class="section" id="purpose"><div class="wrap"><div class="purpose"><div><h2>${d.purposeTitle}</h2><p>${d.purposeText}</p></div><div class="note"><strong>${d.note}</strong><p>${d.noteText}</p></div></div></div></section>`;
  setupFilters();
 }
 app.insertAdjacentHTML('afterbegin',header());
 app.insertAdjacentHTML('beforeend',footer());
 $('#theme').addEventListener('click',()=>{document.body.classList.toggle('dark');localStorage.setItem('seer-dark',document.body.classList.contains('dark')?'1':'0')});
 if(localStorage.getItem('seer-dark')==='1')document.body.classList.add('dark');
}
function setupFilters(){
 let active='all';const input=$('#search');
 function apply(){const q=input.value.toLocaleLowerCase();let count=0;document.querySelectorAll('.person').forEach(el=>{const c=cardData.find(x=>x[0]===el.dataset.id);const group = ['abu-bakr','umar','uthman','ali'].includes(c[0]) ? 'caliph' : (['khadijah','aisha'].includes(c[0]) ? 'women' : 'companion');const matches=(active==='all'||group===active)&&c.slice(1).join(' ').toLocaleLowerCase().includes(q);el.hidden=!matches;if(matches)count++});let empty=$('.empty');if(!count&&!empty)$('#cards').insertAdjacentHTML('beforeend',`<div class="empty">${d.noResults}</div>`);if(count&&empty)empty.remove()}
 input.addEventListener('input',apply);
 document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');active=b.dataset.filter;apply()}));
}
render();
