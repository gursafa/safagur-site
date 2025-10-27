// ---- Config ----
const HERO_PHOTO = "https://media.licdn.com/dms/image/v2/C4D03AQFVQoeC8geR7A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1601264736507?e=1762992000&v=beta&t=8D0w55K2Ul-PQFdW9Dje3p0yNG2TaiOHw-MeYzQCoKA";

// Gallery via manifest.json (fallback list if not found)
const GALLERY_FALLBACK = ["assets/gallery/bali.jpeg", "assets/gallery/canada.jpeg", "assets/gallery/istanbul.jpeg", "assets/gallery/morocco.jpeg", "assets/gallery/newyork.jpeg", "assets/gallery/paris.jpeg", "assets/gallery/tbilisi.jpeg", "assets/gallery/uk.jpeg"];

// I18N dictionaries
const I18N = {
  tr: {
    'nav.about': 'Hakkımda',
    'nav.projects': 'Projeler',
    'nav.gallery': 'Galeri',
    'nav.contact': 'İletişim',
    'hero.subtitle': 'Endüstri Mühendisi • Operasyon & Süreç İyileştirme • AI',
    'hero.ctaProjects': 'Projeler',
    'hero.ctaGallery': 'Fotoğraf Galerisi',
    'highlights.title': 'Öne Çıkanlar',
    'highlights.desc': 'Endüstri mühendisliği, analitik ve AI ile veri odaklı, ölçeklenebilir ve dayanıklı iş sistemleri kuruyorum.',
    'about.title': 'Hakkımda',
    'about.body': 'İstanbul merkezli Endüstri Mühendisiyim. Odak alanlarım: operasyonlar, süreç optimizasyonu ve AI destekli otomasyon. Sürekli iyileştirme ve uluslararası projelerde deneyim sahibiyim.',
    'about.tags.0': 'Süreç İyileştirme',
    'about.tags.1': 'Operasyonlar',
    'about.tags.2': 'Otomasyon',
    'about.tags.3': 'Veri & Analitik',
    'links.title': 'Bağlantılar',
    'links.email': 'E‑posta',
    'projects.title': 'Projeler',
    'gallery.title': 'Fotoğraf Galerisi',
    'contact.title': 'İletişim',
    'contact.desc': 'İş birlikleri ve projeler için:'
  },
  en: {
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.gallery': 'Gallery',
    'nav.contact': 'Contact',
    'hero.subtitle': 'Industrial Engineer • Operations & Process Improvement • AI',
    'hero.ctaProjects': 'Projects',
    'hero.ctaGallery': 'Photo Gallery',
    'highlights.title': 'Highlights',
    'highlights.desc': 'I combine IE, analytics and AI to build data‑driven, scalable and resilient business systems.',
    'about.title': 'About',
    'about.body': 'Industrial Engineer based in Istanbul. Focused on operations, process optimization and AI‑assisted automation. Experienced in continuous improvement and cross‑border delivery.',
    'about.tags.0': 'Process Improvement',
    'about.tags.1': 'Operations',
    'about.tags.2': 'Automation',
    'about.tags.3': 'Data & Analytics',
    'links.title': 'Links',
    'links.email': 'E‑mail',
    'projects.title': 'Projects',
    'gallery.title': 'Photo Gallery',
    'contact.title': 'Contact',
    'contact.desc': 'For collaborations and projects:'
  }
};

// ---- Helpers ----
const $ = (sel, ctx=document)=>ctx.querySelector(sel);
const $$ = (sel, ctx=document)=>Array.from(ctx.querySelectorAll(sel));

function setTheme(t){
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('sg_theme', t);
  $('#themeToggle').textContent = t==='dark' ? '🌙' : '☀️';
}

function setLang(l){
  localStorage.setItem('sg_lang', l);
  document.documentElement.setAttribute('lang', l);
  $$('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    const t = I18N[l]?.[key];
    if(typeof t === 'string'){ el.textContent = t; }
  });
  renderProjects(l);
}

// ---- Init ----
window.addEventListener('DOMContentLoaded', async ()=>{
  // Avatar
  $('#hero-avatar').src = HERO_PHOTO;

  // Theme & Lang
  const savedTheme = localStorage.getItem('sg_theme') || 'light';
  const savedLang = localStorage.getItem('sg_lang') || 'tr';
  setTheme(savedTheme);
  setLang(savedLang);

  // Events
  $('#themeToggle').addEventListener('click', ()=> setTheme(document.documentElement.getAttribute('data-theme')==='light'?'dark':'light'));
  $('#langToggle').addEventListener('click', ()=> setLang(localStorage.getItem('sg_lang')==='tr'?'en':'tr'));

  // Gallery
  await renderGallery();

  // Footer year
  $('#y').textContent = new Date().getFullYear();

  // Lightbox events
  const lb = $('#lightbox');
  $('#lbClose').addEventListener('click', closeLightbox);
  lb.addEventListener('click', e=>{ if(e.target===lb) closeLightbox(); });
  window.addEventListener('keydown', e=>{ if(e.key==='Escape') closeLightbox(); });
});

// ---- Projects ----

const PROJECTS = [
  {
    title: { tr: 'Süreç İyileştirme (Samsung)', en: 'Process Improvement (Samsung)' },
    desc: {
      tr: 'Endüstri mühendisliği yöntemleri ile kalite ve verimliliği artıran, raporlama ve standardizasyon içeren sürekli iyileştirme çalışmaları.',
      en: 'Process improvements using IE methods; reporting and standardization driving quality and efficiency.'
    }
  },
  {
    title: { tr: 'Operasyon & Analitik', en: 'Operations & Analytics' },
    desc: {
      tr: 'Veri temelli karar alma, KPI takibi, maliyet azaltma ve kapasite planlama için analitik panolar ve iş akışları.',
      en: 'Data-driven decisioning, KPI tracking, cost reduction and capacity planning via analytics dashboards and workflows.'
    }
  },
  {
    title: { tr: 'AI Destekli Otomasyon', en: 'AI‑Assisted Automation' },
    desc: {
      tr: 'Tekrarlı görevleri azaltan; özetleme, metin sınıflandırma ve görev önceliklendirme araçlarıyla operasyonları hızlandırma.',
      en: 'Automation that reduces repetitive work; summarization, classification and prioritization tools to accelerate ops.'
    }
  },
  {
    title: { tr: 'Uluslararası Projeler', en: 'Cross‑Border Projects' },
    desc: {
      tr: 'Farklı coğrafyalarda paydaş yönetimi; proje planlama, risk takibi ve teslimat kalitesinin güvence altına alınması.',
      en: 'Stakeholder management across regions; planning, risk tracking and ensuring delivery quality.'
    }
  }
];


function renderProjects(lang){
  const grid = $('#projectsGrid');
  grid.innerHTML = '';
  PROJECTS.forEach(p=>{
    const card = document.createElement('div');
    card.className = 'card proj';
    const h3 = document.createElement('h3');
    h3.textContent = p.title[lang];
    const desc = document.createElement('p');
    desc.textContent = p.desc[lang];
    card.append(h3, desc);
    grid.append(card);
  });
}

// ---- Gallery ----
async function renderGallery(){
  const grid = $('#galleryGrid');
  let list = [];
  try{
    const res = await fetch('assets/gallery/manifest.json', {cache:'no-store'});
    if(res.ok){ list = await res.json(); }
  }catch(e){ /* manifest yok */ }
  if(!Array.isArray(list) || !list.length){ list = GALLERY_FALLBACK; }
  if(!list.length){
    grid.innerHTML = '<p style="color:var(--muted);margin:8px 0">Add your photos under <code>assets/gallery/</code> and list them in <code>manifest.json</code>.</p>';
    return;
  }
  const frag = document.createDocumentFragment();
  list.forEach(src=>{
    const img = new Image();
    img.loading = 'lazy'; img.decoding='async';
    img.src = src; img.alt = 'Safa Gür photo';
    img.addEventListener('click',()=>openLightbox(src));
    frag.appendChild(img);
  });
  grid.appendChild(frag);
}

// ---- Lightbox ----
function openLightbox(src){ $('#lbImg').src = src; $('#lightbox').classList.add('open'); document.body.style.overflow='hidden'; }
function closeLightbox(){ $('#lightbox').classList.remove('open'); $('#lbImg').src=''; document.body.style.overflow=''; }
