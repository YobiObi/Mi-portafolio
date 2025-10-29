// Preferencias de tema
const root = document.documentElement;
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
const savedTheme = localStorage.getItem('theme'); // 'light' | 'dark' | null
if ((savedTheme === 'light') || (!savedTheme && prefersLight)) root.classList.add('light');

const themeBtn = document.getElementById('themeToggle');
if (themeBtn) {
  const setLabel = () => themeBtn.textContent = root.classList.contains('light') ? 'Modo oscuro' : 'Modo claro';
  setLabel();
  themeBtn.addEventListener('click', () => {
    root.classList.toggle('light');
    localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
    setLabel();
  });
}

// Menú móvil
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');
if (hamburger && menu) {
  hamburger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Datos de proyectos
const proyectos = [
  {
    titulo: "Automatización Atención al Estudiante en CIADE UNAB",
    desc: "Plataforma web para gestionar solicitudes de cita a coordinación CIADE.",
    tags: ["React","Node.js","Express","Prisma","PostgreSQL","Firebase Auth","Bootstrap"],
    rol: "Desarrolladora Fullstack",
    res: "Chatbot inteligente, paneles por rol, autenticación y notificaciones.",
    link: "https://github.com/YobiObi/ChatbotCIADE",
    img: "https://elements-resized.envatousercontent.com/elements-cover-images/02e5c2ab-9ce9-4a2c-b907-b97e9890c3c0?w=433&cf_fit=scale-down&q=85&format=auto&s=4910d70b2b2e0fca22ab28fcacf1fd22519a4b6c6fb366d02bfbec669f1496aa"
  },
  {
    titulo: "ComuniRed App",
    desc: "App para conectar comunidades de condominios, villas o edificios.",
    rol: "Dev principal y analista",
    res: "Módulos de reserva, avisos y reportes de gastos comunes.",
    tags: ["React", "Firebase Auth", "Node.js", "MongoDB", "Tailwind"],
    link: "https://github.com/legitpotato/Prototipo-ING-2",
    img: "https://lamarcafincas.com/wp-content/uploads/2024/03/shutterstock_1675703479-scaled-1-1024x727.jpg"
  },
  {
    titulo: "Predicción de Diabetes Tipo II",
    desc: "3° lugar en Olimpiadas de Ciencias de Datos (2024).",
    rol: "Científica de datos",
    res: "Red neuronal capaz de predecir la diabetes tipo II en un conjunto de datos.",
    tags: ["R", "Regresión logística", "Redes Neuronales"],
    link: "https://github.com/YobiObi/Proyecto-Ciencia-de-Datos",
    img: "https://msmk.university/wp-content/uploads/2024/08/shutterstock_587768567.png"
  }
];

// Render tarjetas accesibles
const grid = document.getElementById('cards-proyectos');
if (grid) {
  const html = proyectos.map(p => `
    <article class="card reveal" role="listitem">
      <a href="${p.link}" target="_blank" rel="noopener" aria-label="Abrir repositorio de ${p.titulo}">
        <img src="${p.img}" alt="${p.titulo}" loading="lazy" />
      </a>
      <div class="body">
        <div style="display:flex; align-items:center; justify-content:space-between; gap:8px">
          <h3 style="margin:0; font-size:18px">${p.titulo}</h3>
          <a class="badge" href="${p.link}" target="_blank" rel="noopener" aria-label="Ir al repositorio de ${p.titulo}">Repositorio</a>
        </div>
        <p class="muted" style="margin:8px 0 6px">${p.desc}</p>

        <!-- NUEVO: rol y resultados -->
        <div class="meta">
          <div class="kv"><span class="k">Rol:</span> <span class="v">${p.rol ?? "—"}</span></div>
          <div class="kv"><span class="k">Aporte:</span> <span class="v">${p.res ?? "—"}</span></div>
        </div>
        
        <div class="stack">${p.tags.map(t => `<span class="badge">${t}</span>`).join('')}</div>
      </div>
    </article>
  `).join('');
  grid.innerHTML = html;
}

// Scroll suave con compensación por header fijo
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const headerEl = document.querySelector('.header');
    const headerH = headerEl ? headerEl.getBoundingClientRect().height : 0;
    const y = target.getBoundingClientRect().top + window.pageYOffset - headerH - 8;
    window.scrollTo({ top: y, behavior: 'smooth' });
    history.pushState(null, '', href);
  });
});

// Resaltar menú según sección en viewport
const sectionIds = ['#proyectos','#experiencia','#areas', '#servicios','#certificaciones','#reconocimientos','#skills','#contacto'];
const links = sectionIds.map(id => [id, document.querySelector(`.menu a[href="${id}"]`)]);
const headerEl2 = document.querySelector('.header');

const onScroll = () => {
  let current = null;
  const headerH = headerEl2 ? headerEl2.getBoundingClientRect().height : 0;
  const probe = headerH + 12; // línea virtual debajo del header
  for (const [id] of links) {
    const el = document.querySelector(id);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    if (rect.top <= probe && rect.bottom >= probe) current = id;
  }
  links.forEach(([id, link]) => {
    if (!link) return;
    link.classList.toggle('active', id === current);
  });
};
document.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('load', onScroll);

// Animaciones con IntersectionObserver (respeta reduce-motion)
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReduced) {
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

// === Navbar: aplicar sombra/solidez al hacer scroll ===
const header = document.querySelector('.header');
const setHeaderScrolled = () => {
  if (!header) return;
  const scrolled = window.scrollY > 10;
  header.classList.toggle('scrolled', scrolled);
};
document.addEventListener('scroll', setHeaderScrolled, { passive: true });
window.addEventListener('load', setHeaderScrolled);

// === Botón “Volver arriba” ===
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  const toggleTop = () => {
    const show = window.scrollY > 500;
    backToTop.classList.toggle('show', show);
  };
  document.addEventListener('scroll', toggleTop, { passive: true });
  window.addEventListener('load', toggleTop);

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}