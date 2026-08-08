/**
 * Marcado 1:1 con sophia-tech-corp.vercel.app (mismos ids/clases que
 * consumen public/vendor/script.js, earth-hero.js y tr-*.js — ver
 * useVendorScripts.ts). No es un componente "idiomático" a propósito:
 * cualquier cambio de estructura acá tiene que reflejarse en esos scripts.
 */
export function SophiaPage() {
  return (
    <>
      {/* ============ NAV — Desktop ============ */}
      <div className="nav-wrapper">
        <header className="dfy-nav">
          <a className="dfy-nav__logo" href="#inicio">
            SOPH<span className="logo-accent">IA</span>
          </a>

          <button
            className="dfy-nav__toggle"
            type="button"
            id="dfyNavToggle"
            aria-expanded="false"
            aria-controls="dfyNavPanel"
            aria-label="Abrir menú de navegación"
          >
            <span className="dfy-nav__grid" aria-hidden="true">
              <span className="dfy-nav__dot" />
              <span className="dfy-nav__dot" />
              <span className="dfy-nav__dot" />
              <span className="dfy-nav__dot" />
              <span className="dfy-nav__dot" />
            </span>
          </button>

          <button className="dfy-nav__menu-label" type="button" id="dfyNavMenuLabel" aria-expanded="false" aria-controls="dfyNavPanel">
            MENU
          </button>
        </header>

        <div className="dfy-nav__panel" id="dfyNavPanel">
          <nav className="dfy-nav__list" aria-label="Navegación principal">
            <a className="dfy-nav__row" href="#s3-caps">
              <span className="dfy-nav__num">01</span>
              <span className="dfy-nav__label">Capacidades</span>
            </a>
            <a className="dfy-nav__row" href="#s4-intro">
              <span className="dfy-nav__num">02</span>
              <span className="dfy-nav__label">Productos</span>
            </a>
            <a className="dfy-nav__row" href="#idi-timeline">
              <span className="dfy-nav__num">03</span>
              <span className="dfy-nav__label">I+D+i</span>
            </a>
            <a className="dfy-nav__row" href="#trayectoria">
              <span className="dfy-nav__num">04</span>
              <span className="dfy-nav__label">Trayectoria</span>
            </a>
            <a className="dfy-nav__row" href="#contacto">
              <span className="dfy-nav__num">05</span>
              <span className="dfy-nav__label">Contacto</span>
            </a>
            <div className="dfy-nav__row dfy-nav__row--brand" aria-hidden="true">
              <img className="dfy-nav__brand-logo" src="/recursos/imagenes/Logo Cadipel.png" alt="Cadipel" loading="lazy" />
            </div>
          </nav>
        </div>
      </div>

      {/* ============ NAV — Mobile (island) ============ */}
      <div className="island">
        <div className="island-logo--cont">
          <span className="island-logo">
            SOPH<span className="logo-accent">IA</span>
          </span>
        </div>
        <button className="menu-btn" id="menuToggle" aria-expanded="false" aria-controls="menu-overlay" aria-label="Abrir menú de navegación">
          <div className="button-cont">
            <svg id="menuIcon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <line className="bar bar-top" x1="2" y1="5" x2="14" y2="5" strokeWidth="1.5" strokeLinecap="round" />
              <line className="bar bar-mid" x1="2" y1="8" x2="14" y2="8" strokeWidth="1.5" strokeLinecap="round" />
              <line className="bar bar-bot" x1="2" y1="11" x2="14" y2="11" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </button>
      </div>

      <div className="menu-overlay" id="menu-overlay" role="dialog" aria-modal="true" aria-label="Menú de navegación">
        <div className="menu-backdrop" />
        <div className="menu-panel">
          <nav>
            <a className="menu-link" href="#s3-caps" tabIndex={-1}>
              <span>Capacidades</span>
              <span className="link-num">01</span>
            </a>
            <a className="menu-link" href="#s4-intro" tabIndex={-1}>
              <span>Productos</span>
              <span className="link-num">02</span>
            </a>
            {/* El original apunta a "#divisiones", una sección que no existe en ninguna
                versión del sitio (ni siquiera está en el nav de escritorio) — es un link
                muerto heredado. Lo mandamos a Clarity (para no duplicar el ancla de
                Trayectoria, que ya tiene su propio ítem más abajo). */}
            <a className="menu-link" href="#clarity" tabIndex={-1}>
              <span>Divisiones</span>
              <span className="link-num">03</span>
            </a>
            <a className="menu-link" href="#idi-timeline" tabIndex={-1}>
              <span>I+D+i</span>
              <span className="link-num">04</span>
            </a>
            <a className="menu-link" href="#trayectoria" tabIndex={-1}>
              <span>Trayectoria</span>
              <span className="link-num">05</span>
            </a>
            <a className="menu-link" href="#contacto" tabIndex={-1}>
              <span>Contacto</span>
              <span className="link-num">06</span>
            </a>
            <div className="menu-brand" aria-hidden="true">
              <img src="/recursos/imagenes/Logo Cadipel.png" alt="Cadipel" loading="lazy" />
            </div>
          </nav>
        </div>
      </div>

      {/* ============ HERO ============ */}
      <header className="hero" id="inicio">
        <div className="hero-3d" id="hero3d" aria-hidden="true">
          <canvas id="earth-canvas" />
          <div id="hud-container" />
          <div id="loader">
            <div className="loader-bg-glow" />
            <div className="loader-grid" />
            <div className="loader-content">
              <div className="spinner-outer" />
              <div className="spinner-inner" />
              <div className="loader-counter">
                <span className="loader-percent">
                  <span id="loader-progress-val">0</span>
                  <span className="loader-percent-symbol">%</span>
                </span>
              </div>
              <div className="loader-title">System Boot</div>
              <div id="loader-message-val" className="loader-message">
                Initializing WebGPU Renderer
              </div>
              <div className="loader-bar-bg">
                <div id="loader-progress-bar" className="loader-bar-fill" />
              </div>
            </div>
          </div>
        </div>

        <div className="hero__title-wrap">
          <h1 className="hero__title">[ SOPHIA TECH CORP ]</h1>
        </div>

        <div className="hero__texts">
          <div className="hero__socials" aria-label="Redes sociales">
            <a className="hero__social-link" href="https://www.instagram.com/sophiatechcorp" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <img src="/icons/icon-insta.png" alt="" />
            </a>
            <a className="hero__social-link" href="https://www.linkedin.com/company/sophia-tech-corp" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <img src="/icons/icon-in.png" alt="" />
            </a>
            <button className="hero__social-link" type="button" id="shareBtn" aria-label="Compartir">
              <img src="/icons/icon-share.png" alt="" />
            </button>
          </div>
        </div>
      </header>

      {/* ============ CAPACIDADES ============ */}
      <section className="pa" id="s3-caps">
        <div className="pa__inner">
          <span className="pa__eyebrow decode-text">[ CAPACIDADES ]</span>

          <div className="pa__grid">
            {CAPACIDADES.map((c) => (
              <article className="pa__card" key={c.tag}>
                <div className="pa__card-head">
                  <span className="pa__card-tag decode-text">{c.tag}</span>
                  <span className="pa__card-arrow" aria-hidden="true">
                    <img className="pa__card-icon" src="/icons/icons8-núcleo-48.png" alt="" loading="lazy" />
                  </span>
                </div>

                <div className="pa__card-media">
                  <video className="pa__video" muted loop playsInline autoPlay preload="metadata">
                    <source src={`/video/${c.video}`} type="video/mp4" />
                  </video>
                </div>

                <div className="pa__card-foot">
                  <h3 className="pa__card-title">{c.titulo}</h3>
                  <p className="pa__card-desc">{c.descripcion}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ VALOR / CLARITY ============ */}
      <section className="clarity" id="clarity">
        <div className="clarity-content">
          <span className="clarity-eyebrow" aria-hidden="true">
            Definidos por la experiencia, diseñados para el futuro
          </span>
          <span className="sr-only">Definidos por la experiencia, diseñados para el futuro</span>
          <h2 className="clarity-title" aria-hidden="true">
            Reunimos experiencia, tecnología y talento para desarrollar soluciones que resuelven los desafíos más
            complejos de la actualidad
          </h2>
          <h2 className="sr-only">
            Reunimos experiencia, tecnología y talento para desarrollar soluciones que resuelven los desafíos más
            complejos de la actualidad
          </h2>
        </div>
      </section>

      {/* ============ PRODUCTOS ============ */}
      <section id="s4-intro">
        <div className="prod-container">
          <span className="prod__eyebrow decode-text">[ Productos ]</span>
          <div className="prod-tabs" id="prod-tabs">
            <button className="prod-tab active" data-filter="all" type="button">
              Todo
            </button>
            {PRODUCTOS.map((p) => (
              <button className="prod-tab" data-filter={p.filtro} type="button" key={p.filtro}>
                {p.tabLabel ?? p.nombre}
              </button>
            ))}
          </div>

          <div className="prod-list" id="prod-list">
            {PRODUCTOS.map((p) => (
              <div className="prod-row" data-category={p.filtro} key={p.filtro}>
                <div className="prod-row-num" aria-hidden="true" />
                <div className="prod-row-title">{p.nombre}</div>
                <div className="prod-row-desc">{p.descripcion}</div>
                <div className="prod-row-tag">{p.categoria}</div>
                <div className="prod-row-icon" aria-hidden="true">
                  <span className="prod-row-icon-glyph">❱❱</span>
                </div>
              </div>
            ))}

            <div className="prod-presentation" id="prod-presentation" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* ============ I+D+i ============ */}
      <section className="idi-timeline" id="idi-timeline">
        <canvas className="reunimos-canvas" aria-hidden="true" />
        <div className="spotlight-grain" />
        <div className="idi-caption">
          <span className="idi-caption__eyebrow decode-text">[ I+D+i ]</span>
          <p className="idi-caption__text">PARA NOSOTROS LA INNOVACIÓN ES UN PROCESO, NO UN RESULTADO.</p>
        </div>
        <div className="idi__process" aria-hidden="true">
          <div className="idi__timeline">
            <svg className="idi__path-svg" viewBox="0 0 200 900" preserveAspectRatio="none">
              <path
                className="idi__path-track"
                d="M100,40 C170,150 170,200 100,310 C30,420 30,470 100,580 C170,690 170,740 100,860"
              />
              <path
                className="idi__path-progress"
                stroke="#077DB3"
                d="M100,40 C170,150 170,200 100,310 C30,420 30,470 100,580 C170,690 170,740 100,860"
              />
            </svg>
            <div className="idi__indicator" />
            {[0, 1, 2, 3].map((i) => (
              <div className="idi__node" data-index={i} key={i}>
                <span className="idi__node-num">{String(i + 1).padStart(2, '0')}</span>
                <div className="circles">
                  <div />
                  <div />
                  <div />
                  <span />
                </div>
              </div>
            ))}
          </div>

          <div className="idi__stages">
            {FASES_IDI.map((f, i) => (
              <article className="idi__stage" data-index={i} key={f.titulo}>
                <span className="idi__stage-num">FASE {String(i + 1).padStart(2, '0')}</span>
                <h3 className="idi__stage-title">{f.titulo}</h3>
                <p className="idi__stage-desc">{f.descripcion}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TRAYECTORIA ============ */}
      <section className="tr" id="trayectoria">
        <div className="spotlight-grain" />
        <div className="tr__inner">
          <span className="tr__eyebrow decode-text">[ Cadipel ]</span>

          <div className="tr__grid">
            <div className="tr__cards" id="trCards">
              <div className="tr__cards-track" id="trCardsTrack">
                <div className="tr__card" data-index="0">
                  <div className="tr__card-top">
                    <h3 className="tr__card-title decode-text">Quiénes somos</h3>
                    <span className="tr__card-accent" aria-hidden="true" />
                  </div>
                  <div className="tr__pcb" aria-hidden="true">
                    <canvas className="tr__pcb-canvas" />
                    <div className="tr__pcb-loader" id="trPcbLoader">
                      <span className="tr__pcb-spinner" />
                    </div>
                  </div>
                  <p className="tr__card-text">
                    Compañía internacional desarrolladora y fabricante de tecnología en electrónica y software, con
                    soluciones para industria, agro, fintech, seguridad y más.
                  </p>
                </div>
                <div className="tr__card" data-index="1">
                  <div className="tr__card-top">
                    <h3 className="tr__card-title decode-text">De la idea a la producción</h3>
                    <span className="tr__card-accent" aria-hidden="true" />
                  </div>
                  <div className="tr__arm" aria-hidden="true">
                    <canvas className="tr__arm-canvas" />
                    <div className="tr__arm-loader" id="trArmLoader">
                      <span className="tr__arm-spinner" />
                    </div>
                  </div>
                  <p className="tr__card-text">
                    Acompañamos todo el ciclo de producto: diseño, prototipado rápido, DFM y fabricación en serie, con
                    alianza estratégica con Assisi SRL para escalar sin fricción.
                  </p>
                </div>
                <div className="tr__card" data-index="2">
                  <div className="tr__card-top">
                    <h3 className="tr__card-title decode-text">Nace Sophia</h3>
                    <span className="tr__card-accent" aria-hidden="true" />
                  </div>
                  <div className="tr__planet" aria-hidden="true">
                    <canvas className="tr__planet-canvas" />
                    <div className="tr__planet-loader" id="trPlanetLoader">
                      <span className="tr__planet-spinner" />
                    </div>
                  </div>
                  <p className="tr__card-text">
                    Con esa misma base, Cadipel impulsa a Sophia: su unidad de Inteligencia Artificial e innovación,
                    para llevar ese estándar de ingeniería al terreno de la IA aplicada.
                  </p>
                </div>
                <div className="tr__card" data-index="3">
                  <div className="tr__card-top">
                    <h3 className="tr__card-title decode-text">Hoy</h3>
                    <span className="tr__card-accent" aria-hidden="true" />
                  </div>
                  <div className="tr__hud" aria-hidden="true">
                    <canvas className="tr__hud-canvas" />
                    <div className="tr__hud-loader" id="trHudLoader">
                      <span className="tr__hud-spinner" />
                    </div>
                  </div>
                  <p className="tr__card-text">
                    Sophia y Cadipel comparten equipo, cultura y estándar de calidad: hardware y software a medida de
                    un lado, Inteligencia Artificial aplicada del otro.
                  </p>
                </div>
              </div>
            </div>

            <div className="tr__intro">
              <p className="tr__desc">
                SophIA nace dentro de Cadipel, compañía internacional que diseña, desarrolla y fabrica tecnología en
                electrónica y software. Somos su unidad de Inteligencia Artificial e innovación: el mismo estándar de
                ingeniería, ahora aplicado a la IA.
              </p>

              <a className="tr__link" href="https://www.cadipel.com.ar/" target="_blank" rel="noopener noreferrer">
                <span>Conocé Cadipel</span>
                <span className="tr__link-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M9 7h8v8" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CONTACTO ============ */}
      <section className="contact" id="contacto">
        <div className="contact__inner">
          <div className="contact__intro">
            <span className="contact__eyebrow decode-text">[ Contacto ]</span>
            <h2 className="contact__title" aria-hidden="true">
              Tenés un proyecto en mente?
            </h2>
            <h2 className="sr-only">Tenés un proyecto en mente?</h2>
          </div>

          <form className="contact__form" id="contactForm" noValidate>
            <div className="contact__row">
              <div className="contact__field">
                <label htmlFor="contactFirstName">Nombre *</label>
                <input type="text" id="contactFirstName" name="firstName" autoComplete="given-name" required />
              </div>
              <div className="contact__field">
                <label htmlFor="contactLastName">Apellido *</label>
                <input type="text" id="contactLastName" name="lastName" autoComplete="family-name" required />
              </div>
            </div>

            <div className="contact__row">
              <div className="contact__field">
                <label htmlFor="contactEmail">Email *</label>
                <input type="email" id="contactEmail" name="email" autoComplete="email" required />
              </div>
              <div className="contact__field">
                <label htmlFor="contactCompany">Empresa</label>
                <input type="text" id="contactCompany" name="company" autoComplete="organization" />
              </div>
            </div>

            <div className="contact__field">
              <label htmlFor="contactTopic">¿En qué podemos ayudarte? *</label>
              <select id="contactTopic" name="topic" required defaultValue="">
                <option value="" disabled>
                  Seleccioná una opción
                </option>
                <option value="producto">Producto</option>
                <option value="alianzas">Alianzas / Partnerships</option>
                <option value="prensa">Prensa</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div className="contact__field">
              <label htmlFor="contactMessage">Mensaje *</label>
              <textarea id="contactMessage" name="message" rows={4} required />
            </div>

            <div className="contact__submit-row">
              <button className="contact__submit" type="submit">
                <span>Enviar</span>
                <span className="contact__submit-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M9 7h8v8" />
                  </svg>
                </span>
              </button>
              <p className="contact__status" id="contactStatus" role="status" aria-live="polite" />
            </div>
          </form>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="site-footer" id="footer">
        <div className="site-footer__wordmark reveal-section" aria-hidden="true">
          <div className="site-footer__wordmark-track">
            <span className="site-footer__wordmark-item">SOPHIA TECH CORP</span>
            <span className="site-footer__wordmark-item">SOPHIA TECH CORP</span>
          </div>
        </div>

        <div className="site-footer__bar">
          <p className="site-footer__copy">
            Sophia Tech Corp © Todos los derechos reservados <span id="footerYear">2026</span>
          </p>

          <div className="site-footer__socials" aria-label="Redes sociales">
            <a className="site-footer__social" href="https://www.instagram.com/sophiatechcorp" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a className="site-footer__social" href="https://www.linkedin.com/company/sophia-tech-corp" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>

      <div className="globe-cursor" id="globeCursor" aria-hidden="true">
        <span className="globe-cursor__label">Click me</span>
      </div>
    </>
  );
}

const CAPACIDADES = [
  {
    tag: 'IA',
    titulo: 'Inteligencia Artificial',
    video: 'capacidades1.mp4',
    descripcion:
      'Desarrollamos modelos y asistentes inteligentes capaces de automatizar tareas, analizar información y mejorar la toma de decisiones.',
  },
  {
    tag: 'SOFTWARE',
    titulo: 'Desarrollo de Software',
    video: 'software.mp4',
    descripcion:
      'Diseñamos y construimos plataformas web, aplicaciones móviles y sistemas a medida adaptados a las necesidades de cada organización.',
  },
  {
    tag: 'IOT',
    titulo: 'Internet de las Cosas (IoT)',
    video: 'iot.mp4',
    descripcion:
      'Integramos dispositivos y sensores para capturar información en tiempo real y optimizar el monitoreo de procesos e infraestructura.',
  },
  {
    tag: 'DATOS',
    titulo: 'Analítica de Datos',
    video: 'datos.mp4',
    descripcion:
      'Transformamos grandes volúmenes de información en indicadores, visualizaciones y modelos que facilitan decisiones estratégicas.',
  },
  {
    tag: 'AUTOMATIZACIÓN',
    titulo: 'Automatización',
    video: 'automatizacion.mp4',
    descripcion:
      'Optimizamos procesos operativos y administrativos mediante flujos inteligentes que reducen tiempos, errores y costos.',
  },
  {
    tag: 'SISTEMAS',
    titulo: 'Integración de Sistemas',
    video: 'integracion.mp4',
    descripcion:
      'Conectamos aplicaciones, bases de datos y plataformas para crear ecosistemas tecnológicos unificados y escalables.',
  },
];

interface Producto {
  filtro: string;
  nombre: string;
  tabLabel?: string;
  descripcion: string;
  categoria: string;
}

const PRODUCTOS: Producto[] = [
  {
    filtro: 'timbrame24',
    nombre: 'TimbraMe24',
    descripcion:
      'Sistema de intercomunicación inteligente con acceso mediante QR, gestión remota y control de ingresos sin instalaciones complejas.',
    categoria: 'Smart Access',
  },
  {
    filtro: 'avatares',
    nombre: 'Avatares',
    descripcion:
      'Atiende clientes, recomienda productos y gestiona pedidos mediante conversaciones naturales, mejorando la experiencia gastronómica.',
    categoria: 'Servicios',
  },
  {
    filtro: 'empleados-virtuales',
    nombre: 'Empleados Virtuales',
    descripcion: 'Agentes inteligentes especializados que automatizan tareas, responden consultas y colaboran con equipos de trabajo.',
    categoria: 'Inteligencia Artificial',
  },
  {
    filtro: 'smart-meter',
    nombre: 'Smart Meter++',
    descripcion: 'Captura y analiza datos en tiempo real para optimizar el consumo energético y mejorar la eficiencia operativa.',
    categoria: 'IoT · Energía',
  },
  {
    filtro: 'domotica',
    nombre: 'Domótica',
    descripcion:
      'Integra automatización, control de accesos, seguridad y monitoreo para crear edificios más eficientes y preparados para el futuro.',
    categoria: 'Smart Buildings',
  },
  {
    filtro: 'pet24',
    nombre: 'Pet24',
    descripcion: 'Plataforma inteligente que conecta mascotas, familias y veterinarios mediante identificación QR e historial digital.',
    categoria: 'PetTech',
  },
  {
    filtro: 'gestion-riesgos',
    nombre: 'Gestión de Riesgos',
    tabLabel: 'Riesgos y Desastres',
    descripcion: 'Plataforma para monitorear incidentes, coordinar respuestas y emitir alertas tempranas mediante datos en tiempo real.',
    categoria: 'Smart Cities',
  },
];

const FASES_IDI = [
  {
    titulo: 'Investigación',
    descripcion: 'Analizamos necesidades, identificamos oportunidades y exploramos tecnologías emergentes para comprender cada desafío.',
  },
  {
    titulo: 'Diseño y Desarrollo',
    descripcion:
      'Transformamos las ideas en plataformas, dispositivos y soluciones inteligentes mediante software, Inteligencia Artificial e IoT.',
  },
  {
    titulo: 'Validación',
    descripcion: 'Probamos cada desarrollo en escenarios reales para garantizar rendimiento, seguridad y escalabilidad.',
  },
  {
    titulo: 'Evolución',
    descripcion: 'Nuestros productos continúan creciendo con nuevas funcionalidades, mejoras e innovación constante.',
  },
];
