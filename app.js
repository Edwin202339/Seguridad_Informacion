// State management
let currentSlide = 1;
const totalSlides = 8;

// DOM elements
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentSlideEl = document.getElementById('currentSlide');
const totalSlidesEl = document.getElementById('totalSlides');
const progressFill = document.getElementById('progressFill');
const slideNumbers = document.querySelectorAll('.slide-number');

// Initialize
function init() {
  totalSlidesEl.textContent = totalSlides;
  updateSlide();
  attachEventListeners();
}

// Update slide display
function updateSlide() {
  // Remove active class from all slides
  slides.forEach((slide, index) => {
    slide.classList.remove('active', 'prev');
    if (index + 1 < currentSlide) {
      slide.classList.add('prev');
    }
  });

  // Add active class to current slide
  slides[currentSlide - 1].classList.add('active');

  // Update counter
  currentSlideEl.textContent = currentSlide;

  // Update progress bar
  const progress = (currentSlide / totalSlides) * 100;
  progressFill.style.width = `${progress}%`;

  // Update navigation buttons state
  prevBtn.disabled = currentSlide === 1;
  nextBtn.disabled = currentSlide === totalSlides;

  // Update slide numbers
  slideNumbers.forEach((btn, index) => {
    if (index + 1 === currentSlide) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// Navigate to specific slide
function goToSlide(slideNumber) {
  if (slideNumber >= 1 && slideNumber <= totalSlides) {
    currentSlide = slideNumber;
    updateSlide();
  }
}

// Go to next slide
function nextSlide() {
  if (currentSlide < totalSlides) {
    currentSlide++;
    updateSlide();
  }
}

// Go to previous slide
function prevSlide() {
  if (currentSlide > 1) {
    currentSlide--;
    updateSlide();
  }
}

// Attach event listeners
function attachEventListeners() {
  // Navigation buttons
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    } else if (e.key >= '1' && e.key <= '8') {
      goToSlide(parseInt(e.key));
    }
  });

  // Slide number buttons
  slideNumbers.forEach((btn) => {
    btn.addEventListener('click', () => {
      const slideNum = parseInt(btn.getAttribute('data-goto'));
      goToSlide(slideNum);
    });
  });

  // Touch support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left - next slide
      nextSlide();
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right - previous slide
      prevSlide();
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Modal functionality
const modalData = {
  iso27001: {
    icon: '<i class="fas fa-certificate"></i>',
    title: 'ISO/IEC 27001:2013',
    content: `
      <div class="modal-section">
        <h3><i class="fas fa-info-circle"></i> Descripción General</h3>
        <p>ISO/IEC 27001 es el estándar internacional para la gestión de la seguridad de la información. Especifica los requisitos para establecer, implementar, mantener y mejorar continuamente un Sistema de Gestión de Seguridad de la Información (SGSI).</p>
      </div>
      <div class="modal-section">
        <h3><i class="fas fa-bullseye"></i> Objetivos Principales</h3>
        <ul>
          <li>Proteger la confidencialidad, integridad y disponibilidad de la información</li>
          <li>Gestionar riesgos de seguridad de manera sistemática</li>
          <li>Cumplir con requisitos legales y contractuales</li>
          <li>Mejorar continuamente los procesos de seguridad</li>
        </ul>
      </div>
      <div class="modal-section">
        <h3><i class="fas fa-cogs"></i> Componentes Clave</h3>
        <ul>
          <li><strong>Contexto de la organización:</strong> Comprender necesidades internas y externas</li>
          <li><strong>Liderazgo:</strong> Compromiso de la alta dirección</li>
          <li><strong>Planificación:</strong> Evaluación de riesgos y oportunidades</li>
          <li><strong>Soporte:</strong> Recursos, competencia y documentación</li>
          <li><strong>Operación:</strong> Implementación de controles</li>
          <li><strong>Evaluación:</strong> Auditorías y revisiones</li>
          <li><strong>Mejora:</strong> Acciones correctivas y preventivas</li>
        </ul>
      </div>
      <div class="modal-highlight">
        <p><strong>Beneficio clave:</strong> La certificación ISO 27001 demuestra el compromiso de una organización con la seguridad de la información y genera confianza en clientes y socios.</p>
      </div>
    `
  },
  iso27002: {
    icon: '<i class="fas fa-shield-alt"></i>',
    title: 'ISO/IEC 27002:2022',
    content: `
      <div class="modal-section">
        <h3><i class="fas fa-info-circle"></i> Descripción General</h3>
        <p>ISO/IEC 27002:2022 es el código de prácticas para controles de seguridad de la información. Proporciona directrices detalladas para implementar, mantener y mejorar los controles de seguridad seleccionados en un SGSI.</p>
      </div>
      <div class="modal-section">
        <h3><i class="fas fa-list-ol"></i> Estructura Actualizada (2022)</h3>
        <p>La versión 2022 reorganizó completamente los controles en 4 categorías principales con 93 controles:</p>
        <ul>
          <li><strong>Organizacionales (37 controles):</strong> Políticas, roles, gestión de activos</li>
          <li><strong>Personas (8 controles):</strong> Concienciación, capacitación, responsabilidades</li>
          <li><strong>Físicos (14 controles):</strong> Perímetros, acceso físico, protección de equipos</li>
          <li><strong>Tecnológicos (34 controles):</strong> Gestión de acceso, criptografía, desarrollo seguro</li>
        </ul>
      </div>
      <div class="modal-section">
        <h3><i class="fas fa-star"></i> Controles Destacados</h3>
        <ul>
          <li>Control de acceso y gestión de identidades</li>
          <li>Criptografía y protección de datos</li>
          <li>Seguridad en desarrollo y mantenimiento de sistemas</li>
          <li>Gestión de incidentes de seguridad</li>
          <li>Continuidad del negocio</li>
          <li>Cumplimiento legal y contractual</li>
        </ul>
      </div>
      <div class="modal-highlight">
        <p><strong>Nota importante:</strong> ISO 27002 complementa a ISO 27001, proporcionando las mejores prácticas para implementar cada control.</p>
      </div>
    `
  },
  nist: {
    icon: '<i class="fas fa-network-wired"></i>',
    title: 'NIST Cybersecurity Framework 2.0',
    content: `
      <div class="modal-section">
        <h3><i class="fas fa-info-circle"></i> Descripción General</h3>
        <p>El Marco de Ciberseguridad del NIST es un conjunto de directrices voluntarias para gestionar riesgos de ciberseguridad. Desarrollado por el Instituto Nacional de Estándares y Tecnología de EE.UU., es ampliamente adoptado globalmente.</p>
      </div>
      <div class="modal-section">
        <h3><i class="fas fa-diagram-project"></i> Las 6 Funciones del Framework 2.0</h3>
        <ul>
          <li><strong>GOBERNAR (GOVERN):</strong> Establecer contexto organizacional, gestión de riesgos y políticas</li>
          <li><strong>IDENTIFICAR (IDENTIFY):</strong> Comprender activos, vulnerabilidades y riesgos</li>
          <li><strong>PROTEGER (PROTECT):</strong> Implementar salvaguardas para servicios críticos</li>
          <li><strong>DETECTAR (DETECT):</strong> Identificar ocurrencias de eventos de ciberseguridad</li>
          <li><strong>RESPONDER (RESPOND):</strong> Tomar acciones ante incidentes detectados</li>
          <li><strong>RECUPERAR (RECOVER):</strong> Restaurar servicios y capacidades afectadas</li>
        </ul>
      </div>
      <div class="modal-section">
        <h3><i class="fas fa-chart-line"></i> Niveles de Implementación</h3>
        <ul>
          <li><strong>Nivel 1 - Parcial:</strong> Gestión de riesgos ad hoc</li>
          <li><strong>Nivel 2 - Informado:</strong> Conciencia pero sin políticas formales</li>
          <li><strong>Nivel 3 - Repetible:</strong> Políticas formales establecidas</li>
          <li><strong>Nivel 4 - Adaptativo:</strong> Mejora continua basada en lecciones aprendidas</li>
        </ul>
      </div>
      <div class="modal-highlight">
        <p><strong>Ventaja clave:</strong> El NIST CSF es flexible y escalable, adecuado para organizaciones de cualquier tamaño y sector.</p>
      </div>
    `
  },
  cwe: {
    icon: '<i class="fas fa-bug"></i>',
    title: 'CWE - Common Weakness Enumeration',
    content: `
      <div class="modal-section">
        <h3><i class="fas fa-info-circle"></i> Descripción General</h3>
        <p>CWE es un sistema comunitario de categorización de debilidades de seguridad en software y hardware. Mantenido por MITRE, proporciona un lenguaje común para describir vulnerabilidades.</p>
      </div>
      <div class="modal-section">
        <h3><i class="fas fa-layer-group"></i> Estructura de CWE</h3>
        <ul>
          <li><strong>CWE Top 25:</strong> Las 25 debilidades más peligrosas del software</li>
          <li><strong>Vistas (Views):</strong> Agrupaciones de debilidades por perspectiva</li>
          <li><strong>Categorías:</strong> Clasificaciones de tipos similares de debilidades</li>
          <li><strong>Debilidades Base:</strong> Descripciones concretas de vulnerabilidades</li>
        </ul>
      </div>
      <div class="modal-section">
        <h3><i class="fas fa-exclamation-triangle"></i> Top 5 CWE más Críticas</h3>
        <ul>
          <li><strong>CWE-787:</strong> Escritura fuera de límites (Out-of-bounds Write)</li>
          <li><strong>CWE-79:</strong> Cross-site Scripting (XSS)</li>
          <li><strong>CWE-89:</strong> Inyección SQL</li>
          <li><strong>CWE-416:</strong> Uso después de liberar memoria (Use After Free)</li>
          <li><strong>CWE-78:</strong> Neutralización incorrecta de elementos especiales en comandos OS</li>
        </ul>
      </div>
      <div class="modal-section">
        <h3><i class="fas fa-tools"></i> Uso Práctico</h3>
        <ul>
          <li>Identificación de vulnerabilidades en código</li>
          <li>Capacitación de desarrolladores</li>
          <li>Configuración de herramientas SAST/DAST</li>
          <li>Comunicación entre equipos de seguridad</li>
        </ul>
      </div>
      <div class="modal-highlight">
        <p><strong>Recurso esencial:</strong> CWE es fundamental para comprender y mitigar vulnerabilidades desde la fase de desarrollo.</p>
      </div>
    `
  },
  cis: {
    icon: '<i class="fas fa-list-check"></i>',
    title: 'CIS Controls v8',
    content: `
      <div class="modal-section">
        <h3><i class="fas fa-info-circle"></i> Descripción General</h3>
        <p>Los CIS Controls son un conjunto priorizado de acciones de ciberseguridad desarrollado por el Centro para la Seguridad en Internet. La versión 8 incluye 18 controles críticos basados en amenazas reales.</p>
      </div>
      <div class="modal-section">
        <h3><i class="fas fa-layer-group"></i> Grupos de Implementación</h3>
        <ul>
          <li><strong>IG1 (Implementation Group 1):</strong> Para pequeñas organizaciones con recursos limitados</li>
          <li><strong>IG2:</strong> Para medianas empresas con mayor exposición a riesgos</li>
          <li><strong>IG3:</strong> Para grandes organizaciones con datos sensibles</li>
        </ul>
      </div>
      <div class="modal-section">
        <h3><i class="fas fa-shield-alt"></i> Los 18 Controles CIS</h3>
        <ul>
          <li><strong>1-2:</strong> Inventario y control de activos empresariales y software</li>
          <li><strong>3-4:</strong> Protección y configuración segura de datos y activos</li>
          <li><strong>5-6:</strong> Gestión de cuentas y control de acceso</li>
          <li><strong>7-8:</strong> Gestión continua de vulnerabilidades y auditoría</li>
          <li><strong>9-11:</strong> Protección de correo, navegación web y datos</li>
          <li><strong>12-14:</strong> Defensa de redes, concienciación y gestión de servicios</li>
          <li><strong>15-16:</strong> Gestión de proveedores y seguridad en aplicaciones</li>
          <li><strong>17-18:</strong> Respuesta a incidentes y pruebas de penetración</li>
        </ul>
      </div>
      <div class="modal-highlight">
        <p><strong>Enfoque práctico:</strong> Los CIS Controls están diseñados para ser implementados de forma incremental, priorizando las acciones de mayor impacto.</p>
      </div>
    `
  },
  soc2: {
    icon: '<i class="fas fa-users"></i>',
    title: 'SOC 2 - Service Organization Control',
    content: `
      <div class="modal-section">
        <h3><i class="fas fa-info-circle"></i> Descripción General</h3>
        <p>SOC 2 es un marco de auditoría desarrollado por el AICPA (American Institute of CPAs) para evaluar la gestión de datos de clientes basándose en cinco Trust Services Criteria (TSC).</p>
      </div>
      <div class="modal-section">
        <h3><i class="fas fa-star"></i> Los 5 Trust Services Criteria</h3>
        <ul>
          <li><strong>Seguridad (Security):</strong> Protección contra acceso no autorizado (obligatorio)</li>
          <li><strong>Disponibilidad (Availability):</strong> Sistemas accesibles según acuerdos</li>
          <li><strong>Integridad del Procesamiento:</strong> Procesamiento completo, válido y autorizado</li>
          <li><strong>Confidencialidad:</strong> Protección de información confidencial</li>
          <li><strong>Privacidad:</strong> Recopilación, uso y divulgación según políticas</li>
        </ul>
      </div>
      <div class="modal-section">
        <h3><i class="fas fa-file-alt"></i> Tipos de Reportes SOC 2</h3>
        <ul>
          <li><strong>Tipo I:</strong> Evaluación de controles en un momento específico</li>
          <li><strong>Tipo II:</strong> Evaluación de la efectividad operativa durante un período (típicamente 6-12 meses)</li>
        </ul>
      </div>
      <div class="modal-section">
        <h3><i class="fas fa-building"></i> Quién Necesita SOC 2</h3>
        <ul>
          <li>Proveedores de servicios en la nube (SaaS, PaaS, IaaS)</li>
          <li>Centros de datos y hosting</li>
          <li>Empresas que procesan datos sensibles de clientes</li>
          <li>Organizaciones que requieren demostrar compliance a clientes</li>
        </ul>
      </div>
      <div class="modal-highlight">
        <p><strong>Valor comercial:</strong> La certificación SOC 2 Tipo II es frecuentemente requerida por clientes empresariales para establecer relaciones comerciales.</p>
      </div>
    `
  },
  iso27701: {
    icon: '<i class="fas fa-user-shield"></i>',
    title: 'ISO/IEC 27701:2019',
    content: `
      <div class="modal-section">
        <h3><i class="fas fa-info-circle"></i> Descripción General</h3>
        <p>ISO/IEC 27701 es una extensión de ISO 27001 e ISO 27002 específicamente diseñada para la gestión de privacidad de la información. Establece requisitos y directrices para un Sistema de Gestión de Información de Privacidad (PIMS).</p>
      </div>
      <div class="modal-section">
        <h3><i class="fas fa-puzzle-piece"></i> Relación con Otros Estándares</h3>
        <ul>
          <li>Extiende ISO 27001 con requisitos adicionales de privacidad</li>
          <li>Complementa ISO 27002 con controles específicos de privacidad</li>
          <li>Mapea con GDPR, CCPA y otras regulaciones de privacidad</li>
          <li>Compatible con el marco de ISO 29100 (Privacy Framework)</li>
        </ul>
      </div>
      <div class="modal-section">
        <h3><i class="fas fa-balance-scale"></i> Roles Cubiertos</h3>
        <ul>
          <li><strong>Controlador de PII:</strong> Determina los propósitos y medios del procesamiento</li>
          <li><strong>Procesador de PII:</strong> Procesa PII en nombre del controlador</li>
        </ul>
      </div>
      <div class="modal-section">
        <h3><i class="fas fa-shield-alt"></i> Controles Clave de Privacidad</h3>
        <ul>
          <li>Condiciones para recopilación y procesamiento de PII</li>
          <li>Derechos de los interesados (acceso, rectificación, eliminación)</li>
          <li>Gestión de consentimiento</li>
          <li>Minimización y limitación de propósito de datos</li>
          <li>Transferencias transfronterizas de PII</li>
          <li>Evaluaciones de impacto de privacidad (PIA)</li>
        </ul>
      </div>
      <div class="modal-highlight">
        <p><strong>Compliance global:</strong> ISO 27701 ayuda a las organizaciones a cumplir con múltiples regulaciones de privacidad globales de manera sistemática.</p>
      </div>
    `
  },
  owasp: {
    icon: '<i class="fas fa-triangle-exclamation"></i>',
    title: 'OWASP Top 10',
    content: `
      <div class="modal-section">
        <h3><i class="fas fa-info-circle"></i> Descripción General</h3>
        <p>El OWASP Top 10 es un documento de concienciación estándar para desarrolladores y profesionales de seguridad de aplicaciones web. Representa un amplio consenso sobre los riesgos de seguridad más críticos.</p>
      </div>
      <div class="modal-section">
        <h3><i class="fas fa-exclamation-triangle"></i> OWASP Top 10 - 2021</h3>
        <ul>
          <li><strong>A01:2021 - Broken Access Control:</strong> Escalada a 1er lugar desde la 5ta posición</li>
          <li><strong>A02:2021 - Cryptographic Failures:</strong> Anteriormente "Sensitive Data Exposure"</li>
          <li><strong>A03:2021 - Injection:</strong> Descendió a la 3ra posición pero sigue crítico</li>
          <li><strong>A04:2021 - Insecure Design:</strong> Nueva categoría enfocada en fallas de diseño</li>
          <li><strong>A05:2021 - Security Misconfiguration:</strong> Configuraciones inseguras</li>
          <li><strong>A06:2021 - Vulnerable Components:</strong> Componentes con vulnerabilidades conocidas</li>
          <li><strong>A07:2021 - Identification & Authentication Failures:</strong> Fallas en autenticación</li>
          <li><strong>A08:2021 - Software and Data Integrity Failures:</strong> Nueva categoría</li>
          <li><strong>A09:2021 - Security Logging & Monitoring Failures:</strong> Crítico para detección</li>
          <li><strong>A10:2021 - Server-Side Request Forgery (SSRF):</strong> Nueva entrada al Top 10</li>
        </ul>
      </div>
      <div class="modal-section">
        <h3><i class="fas fa-tools"></i> Cómo Usar OWASP Top 10</h3>
        <ul>
          <li>Capacitación de desarrolladores en riesgos comunes</li>
          <li>Priorización de esfuerzos de seguridad</li>
          <li>Revisión de código enfocada</li>
          <li>Configuración de herramientas de análisis de seguridad</li>
          <li>Definición de requisitos de seguridad</li>
        </ul>
      </div>
      <div class="modal-highlight">
        <p><strong>Actualización:</strong> El OWASP Top 10 se actualiza cada 3-4 años basándose en datos de la industria y retroalimentación de la comunidad.</p>
      </div>
    `
  }
};

// Modal elements
const modal = document.getElementById('standardModal');
const modalIcon = document.getElementById('modalIcon');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalClose = document.querySelector('.modal-close');

// Open modal
function openModal(standardKey) {
  const data = modalData[standardKey];
  if (!data) return;

  modalIcon.innerHTML = data.icon;
  modalTitle.textContent = data.title;
  modalBody.innerHTML = data.content;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Event listeners for standard cards
document.addEventListener('click', (e) => {
  const card = e.target.closest('.standard-card');
  if (card) {
    const modalKey = card.getAttribute('data-modal');
    if (modalKey) {
      openModal(modalKey);
    }
  }
});

// Close modal on button click
modalClose.addEventListener('click', closeModal);

// Close modal on overlay click
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});