(function(){
var d=document,h=d.documentElement;
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
h.classList.add('anim');
function $(s,c){return[].slice.call((c||d).querySelectorAll(s))}
function init(){try{run()}catch(e){h.classList.remove('anim');console.warn(e)}}
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',init);else init();

function run(){
  /* progress bar */
  var bar=d.createElement('div');bar.className='prog';d.body.appendChild(bar);

  /* marquee di bawah hero */
  var hd=$('#home')[0],t='<span>Visual Identity</span><span>Merchandise Racing</span><span>Cartoon Character</span><span>Logo Racing</span>';t+=t;
  var m=d.createElement('div');m.className='marq';m.setAttribute('aria-hidden','true');m.innerHTML='<div>'+t+t+'</div>';
  hd.parentNode.insertBefore(m,hd.nextSibling);

  /* judul hero: tiap baris naik dari bawah */
  var h1=$('.hero h1')[0];
  if(h1){var parts=h1.innerHTML.split(/<br\s*\/?>/i);
    h1.setAttribute('aria-label',parts.join(' '));
    h1.innerHTML=parts.map(function(s){return '<span class="ln" aria-hidden="true"><span>'+s+'</span></span>'}).join('<br>')}

  /* scroll reveal */
  var io=new IntersectionObserver(function(es){var k=0;es.forEach(function(e){
    if(!e.isIntersecting)return;var el=e.target,i=Math.min(k++,8);io.unobserve(el);
    el.style.setProperty('--i',i);el.classList.add('in');
    if(el.classList.contains('rv'))setTimeout(function(){
      el.classList.remove('rv','in','rv-up','rv-pop','rv-left','rv-clip','rv-sw');
      el.style.removeProperty('--i');el.style.removeProperty('--r')},1300+i*80);
  })},{threshold:.15,rootMargin:'0px 0px -6% 0px'});
  [['.about .avatar','rv-up'],['.about h2','rv-up'],['.about p','rv-up'],['.facts','rv-up'],['.skills','rv-up'],
   ['.cat','rv-left'],['.bigtxt','rv-pop'],['.logo-card','rv-pop'],['.merch-card','rv-up'],['.brand-card','rv-up'],
   ['.caricature-card','rv-pop'],['#contact h3','rv-up'],['#contact p','rv-up'],['#contact .btns','rv-up'],['.swoosh','rv-sw']
  ].forEach(function(p){$(p[0]).forEach(function(el,j){
    el.classList.add('rv',p[1]);
    if(p[1]==='rv-pop')el.style.setProperty('--r',(j%2?4:-4)+'deg');
    io.observe(el)})});
  $('.sec h3.st,#portofolio h3.t').forEach(function(el){el.classList.add('hl');io.observe(el)});

  /* count-up: umur & pengalaman */
  function cnt(set,to,ms){var s=null;(function f(t){s=s||t;var p=Math.min((t-s)/ms,1);set(Math.round(to*(1-Math.pow(1-p,3))));if(p<1)requestAnimationFrame(f)})(performance.now())}
  var b=$('.exp b')[0],fa=$('.facts div')[0];
  var an=fa&&[].filter.call(fa.childNodes,function(n){return n.nodeType===3&&n.nodeValue.trim()})[0];
  var ab=$('.about')[0];
  if(ab)new IntersectionObserver(function(es,o){if(!es[0].isIntersecting)return;o.disconnect();
    if(b)cnt(function(v){b.textContent=v+'+'},5,1100);
    if(an)cnt(function(v){an.nodeValue=v},22,1400)},{threshold:.3}).observe(ab);

  /* progress bar + parallax ringan */
  var big=$('.bigtxt')[0],tick=false;
  function onS(){tick=false;var y=scrollY,H=h.scrollHeight-innerHeight;
    bar.style.transform='scaleX('+(H>0?y/H:0)+')';
    if(h1)h1.style.translate='0 '+Math.min(y,700)*.1+'px';
    if(big){var r=big.parentNode.getBoundingClientRect();big.style.translate='0 '+(r.top+r.height/2-innerHeight/2)*-.08+'px'}}
  addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(onS)}},{passive:true});onS();

  /* menu aktif sesuai posisi scroll */
  var links=$('nav a'),mp={'#racing':'#portofolio','#merch':'#portofolio','#branding':'#portofolio','#cartoon':'#portofolio'};
  var so=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;
    var id='#'+e.target.id;id=mp[id]||id;
    links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')===id)})})},{rootMargin:'-45% 0px -50% 0px'});
  $('#home,#profil,#portofolio,#racing,#merch,#branding,#cartoon,#contact').forEach(function(s){so.observe(s)});

  /* kartu miring 3D mengikuti kursor (desktop) */
  if(matchMedia('(hover:hover) and (pointer:fine)').matches)
    $('.logo-card,.merch-card,.brand-card,.caricature-card,.cat').forEach(function(c){
      c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
        c.style.transform='perspective(800px) rotateX('+(-y*9)+'deg) rotateY('+(x*9)+'deg) translateY(-4px)'});
      c.addEventListener('pointerleave',function(){c.style.transform=''})});
}
})();
