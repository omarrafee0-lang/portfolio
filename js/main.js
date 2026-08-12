document.addEventListener('DOMContentLoaded', () => {
  const projectGrid = document.getElementById('projects-grid');
  if (projectGrid) {
    projectGrid.innerHTML = projects.map(p => `<article class="project-card"><div class="project-dot" style="background:${p.color}"></div><h3>${p.title}</h3><p>${p.desc}</p><div class="tags">${p.tech.map(t => `<span>${t}</span>`).join('')}</div></article>`).join('');
  }
  const exp = document.getElementById('experience-list');
  if (exp) {
    exp.innerHTML = experience.map(e => `<article class="experience-item"><div><h3>${e.role}</h3><p class="company">${e.company}${e.subtitle ? ` · ${e.subtitle}` : ''}</p><p class="muted">${e.period} · ${e.location}</p></div><ul>${e.highlights.map(h => `<li>${h}</li>`).join('')}</ul></article>`).join('');
  }
  const skillsEl = document.getElementById('skills-list');
  if (skillsEl) skillsEl.innerHTML = skills.flatMap(s => s.items).map(x => `<span>${x}</span>`).join('');
});
