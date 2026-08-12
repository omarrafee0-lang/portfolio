function populateContent() {
  document.getElementById("about-summary").textContent = profile.summary;
  document.getElementById("about-location").textContent = profile.location;
  document.getElementById("about-education").textContent = `${education.degree} — ${education.school}`;

  const skillsGrid = document.getElementById("skills-grid");
  skillsGrid.innerHTML = skills
    .map(
      (group) => `
    <div class="skill-group reveal">
      <h3>${group.category}</h3>
      <div class="skill-tags">
        ${group.items.map((item) => `<span class="skill-tag">${item}</span>`).join("")}
      </div>
    </div>`
    )
    .join("");

  const langBars = document.getElementById("lang-bars");
  langBars.innerHTML = languages
    .map(
      (lang) => `
    <div class="lang-item">
      <span class="lang-name">${lang.name}</span>
      <div class="lang-track"><div class="lang-fill" data-level="${lang.level}"></div></div>
      <span class="lang-pct">${lang.level}%</span>
    </div>`
    )
    .join("");

  const sortedExperience = [...experience].sort((a, b) => b.start.localeCompare(a.start));

  const timeline = document.getElementById("timeline");
  timeline.innerHTML = sortedExperience
    .map(
      (job) => `
    <div class="timeline-item${job.current ? " timeline-item--current" : ""}">
      <div class="timeline-period">${job.period}${job.current ? ' <span class="current-badge">Current</span>' : ""}</div>
      <div class="timeline-role">${job.role}</div>
      <div class="timeline-company">${job.company}${job.subtitle ? ` · <em>${job.subtitle}</em>` : ""} · ${job.location}</div>
      <ul class="timeline-highlights">
        ${job.highlights.map((h) => `<li>${h}</li>`).join("")}
      </ul>
    </div>`
    )
    .join("");

  const projectsGrid = document.getElementById("projects-grid");
  projectsGrid.innerHTML = projects
    .map(
      (p) => `
    <div class="project-card" style="--project-color: ${p.color}">
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="project-tech">
        ${p.tech.map((t) => `<span>${t}</span>`).join("")}
      </div>
    </div>`
    )
    .join("");

  document.getElementById("edu-main").innerHTML = `
    <h3>${education.degree}</h3>
    <div class="edu-school">${education.school}</div>
    <div class="edu-meta">${education.period} · ${education.location}</div>
    <p class="edu-note">${education.note}</p>`;

  document.getElementById("courses-list").innerHTML = courses
    .map(
      (c) => `
    <div class="course-item">
      <h4>${c.title}</h4>
      <p>${c.desc}</p>
    </div>`
    )
    .join("");

  const emailCard = document.getElementById("contact-email");
  emailCard.href = `mailto:${profile.email}`;
  emailCard.querySelector(".contact-value").textContent = profile.email;

  const phoneCard = document.getElementById("contact-phone");
  phoneCard.href = `tel:${profile.phone}`;
  phoneCard.querySelector(".contact-value").textContent = profile.phone;

  document.getElementById("contact-linkedin").href = profile.linkedin;
}

function initHeroCanvas() {
  const canvas = document.getElementById("hero-canvas");
  const ctx = canvas.getContext("2d");
  let particles = [];
  let w, h;

  function resize() {
    w = canvas.offsetWidth;
    h = canvas.offsetHeight;
    canvas.width = w * devicePixelRatio;
    canvas.height = h * devicePixelRatio;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.r = Math.random() * 2 + 0.5;
      this.alpha = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99, 102, 241, ${this.alpha})`;
      ctx.fill();
    }
  }

  resize();
  particles = Array.from({ length: 80 }, () => new Particle());

  function animate() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${0.08 * (1 - dist / 120)})`;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
  window.addEventListener("resize", () => {
    resize();
    particles = Array.from({ length: 80 }, () => new Particle());
  });
}

function initCursorGlow() {
  const glow = document.querySelector(".cursor-glow");
  let x = 0,
    y = 0;
  document.addEventListener("mousemove", (e) => {
    x = e.clientX;
    y = e.clientY;
    gsap.to(glow, { x, y, duration: 0.6, ease: "power2.out" });
  });
}

function initNav() {
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("nav-toggle");
  const links = document.querySelector(".nav-links");

  ScrollTrigger.create({
    start: "top -80",
    onUpdate: (self) => nav.classList.toggle("scrolled", self.scroll() > 50),
  });

  toggle.addEventListener("click", () => links.classList.toggle("open"));

  document.querySelectorAll("[data-nav]").forEach((link) => {
    link.addEventListener("click", () => links.classList.remove("open"));
  });

  const sections = document.querySelectorAll("section[id]");
  sections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom center",
      onEnter: () => setActiveNav(section.id),
      onEnterBack: () => setActiveNav(section.id),
    });
  });
}

function setActiveNav(id) {
  document.querySelectorAll("[data-nav]").forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
  });
}

function initHeroAnimations() {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.from(".hero-eyebrow", { opacity: 0, y: 20, duration: 0.6 })
    .from(".hero-title .word", { y: "110%", duration: 0.9, stagger: 0.12 }, "-=0.3")
    .from(".hero-cta", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
    .from(".hero-stats .stat", { opacity: 0, y: 30, duration: 0.5, stagger: 0.1 }, "-=0.3")
    .from(".scroll-indicator", { opacity: 0, duration: 0.5 }, "-=0.2");

  const roles = [
    "Presales Engineer",
    "Full-Stack Developer",
    "AI Automation Engineer",
    "Backend Architect",
  ];
  const el = document.getElementById("typewriter");
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function type() {
    const current = roles[roleIndex];
    if (!deleting) {
      el.innerHTML =
        current.substring(0, charIndex + 1) + '<span class="cursor-blink">|</span>';
      charIndex++;
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(type, 2000);
        return;
      }
    } else {
      el.innerHTML =
        current.substring(0, charIndex - 1) + '<span class="cursor-blink">|</span>';
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(type, deleting ? 40 : 80);
  }
  setTimeout(type, 1200);

  document.querySelectorAll("[data-count]").forEach((el) => {
    const target = parseInt(el.dataset.count, 10);
    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(el, {
          innerText: target,
          duration: 2,
          snap: { innerText: 1 },
          ease: "power2.out",
        });
      },
    });
  });
}

function initScrollAnimations() {
  gsap.utils.toArray(".reveal").forEach((el) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power3.out",
    });
  });

  gsap.utils.toArray(".timeline-item").forEach((item, i) => {
    gsap.to(item, {
      scrollTrigger: { trigger: item, start: "top 85%", toggleActions: "play none none reverse" },
      opacity: 1,
      x: 0,
      duration: 0.7,
      delay: i * 0.1,
      ease: "power3.out",
    });
  });

  gsap.utils.toArray(".project-card").forEach((card, i) => {
    gsap.to(card, {
      scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none reverse" },
      opacity: 1,
      y: 0,
      duration: 0.7,
      delay: (i % 3) * 0.1,
      ease: "power3.out",
    });
  });

  document.querySelectorAll(".skill-group").forEach((group) => {
    const tags = group.querySelectorAll(".skill-tag");
    gsap.to(tags, {
      scrollTrigger: { trigger: group, start: "top 85%", toggleActions: "play none none reverse" },
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.04,
      ease: "power2.out",
    });
  });

  document.querySelectorAll(".lang-fill").forEach((fill) => {
    const level = fill.dataset.level;
    gsap.to(fill, {
      scrollTrigger: { trigger: fill, start: "top 90%", toggleActions: "play none none reverse" },
      width: `${level}%`,
      duration: 1.2,
      ease: "power2.out",
    });
  });

  gsap.utils.toArray(".section-title").forEach((title) => {
    gsap.from(title, {
      scrollTrigger: { trigger: title, start: "top 85%", toggleActions: "play none none reverse" },
      opacity: 0,
      x: -30,
      duration: 0.7,
      ease: "power3.out",
    });
  });
}

function initTiltCards() {
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotateY: x * 8,
        rotateX: -y * 8,
        transformPerspective: 800,
        duration: 0.4,
        ease: "power2.out",
      });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "power2.out" });
    });
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (href === "#") return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const y = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
  populateContent();
  initHeroCanvas();
  initCursorGlow();
  initNav();
  initHeroAnimations();
  initScrollAnimations();
  initTiltCards();
  initSmoothScroll();
  initAIAssistant();
});
