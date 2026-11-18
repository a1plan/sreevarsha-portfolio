/* Lightweight public renderer; data remains editable via admin.html */
(function(){
'use strict';
var data=window.PORTFOLIO_DATA||{},p=data.profile||{};
function $(s,root){return(root||document).querySelector(s)}
function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function url(v){v=String(v||'').trim();return /^(https?:\/\/|mailto:)/i.test(v)||/^(?!\/|\\|\.\.)[a-z0-9_][a-z0-9_./%+\-]*$/i.test(v)?v:''}
try{if(new URLSearchParams(location.search).get('preview')==='1'){var s=localStorage.getItem('sv_portfolio_draft_v1');if(s){var d=JSON.parse(s);if(d&&d.profile&&Array.isArray(d.categories)){data=d;p=data.profile;$('#preview-banner').hidden=false}}}}catch(e){console.warn('Preview unavailable',e)}
if($('#year'))$('#year').textContent=new Date().getFullYear();
if($('#nav-cv')&&url(p.resume))$('#nav-cv').href=url(p.resume);
var menu=$('#mobile-menu');if(menu)menu.onclick=function(){var nav=$('#main-nav'),expanded=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(expanded))};
function home(){
if(document.body.dataset.page!=='home')return;
if($('#hero-role'))$('#hero-role').textContent=p.role||'Instructional Designer';
if($('#hero-intro'))$('#hero-intro').textContent=p.intro||p.about||'';
if($('#hero-photo')&&url(p.photo))$('#hero-photo').src=url(p.photo);
var career=data.career||[];
function row(c){return '<article class="timeline-row"><span class="timeline-period">'+esc(c.period)+'</span><div><h3 class="timeline-title">'+esc(c.title)+'</h3><div class="timeline-org">'+esc(c.organization)+'</div></div><p class="timeline-desc">'+esc(c.description)+'</p></article>'}
$('#career-timeline').innerHTML=career.slice(0,4).map(row).join('')+(career.length>4?'<details class="timeline-older"><summary>Earlier roles · '+(career.length-4)+' more ↓</summary>'+career.slice(4).map(row).join('')+'</details>':'');
$('#skills-list').innerHTML=(p.skills||[]).slice(0,18).map(function(s){return '<span class="skill-tag">'+esc(s)+'</span>'}).join('');
$('#education-text').textContent=p.education||'';
var hobbies=Array.isArray(p.hobbies)?p.hobbies:[];if(!hobbies.length)hobbies=['Learning games','Creative experiments','Exploring AI'];
$('#hobby-list').innerHTML=hobbies.map(function(s){return '<span class="hobby-pill">'+esc(s)+'</span>'}).join('');
}
var icons=['▣','◇','▶','▤','◎','✎','◈','✳','◉','⌘'];
function links(files){return(files||[]).filter(function(f){return url(f.url)}).map(function(f){return '<a class="file-link" href="'+esc(url(f.url))+'" '+(/^https?:\/\//.test(f.url)?'target="_blank" rel="noopener noreferrer"':'')+'>'+esc(f.label||'View sample')+' ↗</a>'}).join(' ')}
function categories(query){
var q=(query||'').trim().toLowerCase(),count=0,cats=data.categories||[];
$('#category-grid').innerHTML=cats.map(function(c,i){
var its=c.items||[],match=!q||[c.name,c.description].concat(its.map(function(it){return it.name})).join(' ').toLowerCase().includes(q);if(!match)return '';count++;
var shown=its.filter(function(it){return !q||[c.name,c.description,it.name].join(' ').toLowerCase().includes(q)});
return '<details class="category-card" '+(q?'open':'')+'><summary><div class="category-header"><span class="category-index">'+String(i+1).padStart(2,'0')+' / '+String(cats.length).padStart(2,'0')+'</span><span class="category-icon" aria-hidden="true">'+icons[i%icons.length]+'</span></div><h2>'+esc(c.name)+'</h2><p class="category-desc">'+esc(c.description||'')+'</p><div class="category-foot"><span>'+its.length+' learning materials</span><span class="category-open">Explore materials ↗</span></div></summary><div class="category-materials"><p class="materials-title">MATERIALS & DELIVERABLES</p>'+shown.map(function(it){return '<div class="category-material"><span>'+esc(it.name)+'</span>'+links(it.files)+'</div>'}).join('')+'</div></details>';
}).join('');$('#category-empty').hidden=!!count;
}
function projects(all){
var items=data.projects||[],shown=all?items:items.slice(0,3);
$('#project-list').innerHTML=shown.map(function(pr,i){return '<div class="project-row" tabindex="0" role="button" data-project="'+esc(pr.id)+'"><span class="project-num">'+String(i+1).padStart(2,'0')+'</span><div><div class="project-title">'+esc(pr.title)+'</div><div class="project-sub">'+esc(pr.subtitle||'')+'</div></div><span class="project-year">'+esc(pr.year||'')+'</span><span class="project-arrow" aria-hidden="true">↗</span></div>'}).join('');
var b=$('#show-more-projects');b.hidden=all||items.length<=3;b.onclick=function(){projects(true)};
}
function openProject(id){
var pr=(data.projects||[]).find(function(x){return x.id===id}),dialog=$('#project-dialog');if(!pr||!dialog)return;
$('#project-dialog-content').innerHTML='<span class="kicker">'+esc(pr.subtitle||'PROJECT STORY')+' · '+esc(pr.year||'')+'</span><h2>'+esc(pr.title)+'</h2><p>'+esc(pr.summary||'')+'</p><p>'+esc(pr.details||'')+'</p><div class="dialog-meta"><strong>MY CONTRIBUTION</strong><p>'+esc(pr.role||'Instructional design')+'</p><strong>TOOLS & METHODS</strong><p>'+esc((pr.tools||[]).join(' · '))+'</p><strong>WORK SAMPLES</strong><div class="dialog-files">'+((pr.files||[]).length?links(pr.files):'<p>Public samples can be added when approved for sharing.</p>')+'</div></div>';
dialog.showModal();
}
function portfolio(){
if(document.body.dataset.page!=='portfolio')return;
categories();$('#category-search').addEventListener('input',function(e){categories(e.target.value)});projects(false);
var dialog=$('#project-dialog');$('#dialog-close').onclick=function(){dialog.close()};dialog.onclick=function(e){if(e.target===dialog)dialog.close()};
var list=$('#project-list');list.addEventListener('click',function(e){var row=e.target.closest('[data-project]');if(row)openProject(row.dataset.project)});
list.addEventListener('keydown',function(e){var row=e.target.closest('[data-project]');if(row&&(e.key==='Enter'||e.key===' ')){e.preventDefault();openProject(row.dataset.project)}});
}
function contact(){
if(document.body.dataset.page!=='contact')return;
var mail=p.email||'Sreevarsha.prakhash@gmail.com';$('#contact-email').href='mailto:'+mail;$('#contact-email-text').textContent=mail;$('#contact-linkedin').href=url(p.linkedin)||'https://www.linkedin.com/in/sreewar/';
$('#contact-form').addEventListener('submit',function(e){e.preventDefault();var f=new FormData(e.currentTarget);var subject='Learning design collaboration inquiry';var body='Hello '+(p.shortName||'Sreevarsha')+',\n\n'+f.get('message')+'\n\nFrom: '+f.get('name')+'\nEmail: '+f.get('email');location.href='mailto:'+encodeURIComponent(mail)+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body)});
}
home();portfolio();contact();
})();