document.addEventListener('DOMContentLoaded',()=>{
 const projectGrid=document.getElementById('projects-grid');
 if(projectGrid) projectGrid.innerHTML=projects.map(p=>`<article class="project-card tilt-card"><div class="project-dot" style="background:${p.color}"></div><h3>${p.title}</h3><p>${p.desc}</p><div class="tags">${p.tech.map(t=>`<span>${t}</span>`).join('')}</div></article>`).join('');
 const exp=document.getElementById('experience-list');
 if(exp) exp.innerHTML=experience.map(e=>`<article class="experience-item"><div><h3>${e.role}</h3><p class="company">${e.company}${e.subtitle?` · ${e.subtitle}`:''}</p><p class="muted">${e.period} · ${e.location}</p></div><ul>${e.highlights.map(h=>`<li>${h}</li>`).join('')}</ul></article>`).join('');
 const skillsEl=document.getElementById('skills-list');
 if(skillsEl) skillsEl.innerHTML=skills.flatMap(s=>s.items).map(x=>`<span>${x}</span>`).join('');

 const words=['websites','web apps','AI tools','automations'];let wi=0;const word=document.getElementById('rotating-word');
 if(word&&window.gsap){gsap.to(word,{opacity:0,duration:.25,repeat:-1,yoyo:true,repeatDelay:1.6,onRepeat:()=>{wi=(wi+1)%words.length;word.textContent=words[wi]}})}
 if(window.gsap){gsap.registerPlugin(ScrollTrigger);gsap.from('.reveal',{y:35,opacity:0,duration:.8,stagger:.08,ease:'power3.out'});gsap.utils.toArray('.section').forEach(s=>gsap.from(s.querySelectorAll('.eyebrow,.section h2,.service-card,.project-card,.ai-shell,.experience-item,.skills span,.contact-box'),{scrollTrigger:{trigger:s,start:'top 78%'},y:28,opacity:0,duration:.65,stagger:.06,ease:'power2.out'}));gsap.to('.hero-card',{y:-12,repeat:-1,yoyo:true,duration:2.5,ease:'sine.inOut'});gsap.to('.chip-ai',{y:-12,repeat:-1,yoyo:true,duration:1.8,ease:'sine.inOut'});gsap.to('.chip-gsap',{y:10,repeat:-1,yoyo:true,duration:2.1,ease:'sine.inOut'})}
 document.querySelectorAll('.magnetic').forEach(el=>el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.12}px,${(e.clientY-r.top-r.height/2)*.12}px)`}));
 document.querySelectorAll('.magnetic').forEach(el=>el.addEventListener('mouseleave',()=>el.style.transform=''));
 const glow=document.querySelector('.cursor-glow');document.addEventListener('mousemove',e=>{if(glow){glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'}});
 const botAnswers=[['build','I can build business websites, web apps, backend systems, AI features and automation tools.'],['technology','I work with React, JavaScript, PHP, Node.js, databases, APIs and AI tools.'],['freelance','Yes. I am open to freelance projects and collaborations. Send me your idea and timeline.'],['experience','I am a Software Engineer with experience in web development, IT and building real projects.'],['ai','I like using AI when it solves a real problem — assistants, automation, smart search and useful product features.']];
 function answer(q){const l=q.toLowerCase();for(const [k,a] of botAnswers)if(l.includes(k))return a;return 'I can tell you about Omar’s projects, skills, experience, AI work or freelance availability. Try asking one of those.'}
 const messages=document.getElementById('chat-messages'),form=document.getElementById('chat-form'),input=document.getElementById('chat-input');
 function send(q){if(!q||!messages)return;messages.insertAdjacentHTML('beforeend',`<div class="message user">${q.replace(/[<>]/g,'')}</div>`);setTimeout(()=>{messages.insertAdjacentHTML('beforeend',`<div class="message bot">${answer(q)}</div>`);messages.scrollTop=messages.scrollHeight},350);messages.scrollTop=messages.scrollHeight}
 if(form)form.addEventListener('submit',e=>{e.preventDefault();const q=input.value.trim();input.value='';send(q)});
 document.querySelectorAll('.suggestions button').forEach(b=>b.addEventListener('click',()=>send(b.dataset.question)));
});
