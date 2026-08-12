const SUGGESTIONS = [
  "What are Omar's top skills?",
  "Where does Omar work now?",
  "Tell me about his experience",
  "What projects has he built?",
  "What's his education background?",
];

function getSortedExperience() {
  return [...experience].sort((a, b) => b.start.localeCompare(a.start));
}

function getCurrentJob() {
  return getSortedExperience().find((job) => job.current) || getSortedExperience()[0];
}

const knowledgeBase = [
  {
    keywords: ["current", "now", "today", "present", "employer", "smart vision", "presales", "dell", "titanium"],
    answer: () => {
      const job = getCurrentJob();
      return `Omar is currently a **${job.role}** at **${job.company}** (${job.subtitle || "Cairo, Egypt"}), ${job.period}. ${job.highlights[0]}`;
    },
  },
  {
    keywords: ["skill", "tech", "stack", "programming", "know", "expert", "technologies", "tools"],
    exclude: ["speak", "arabic", "english", "german", "deutsch", "fluent", "multilingual"],
    answer: () => {
      const allSkills = skills.flatMap((s) => s.items).join(", ");
      return `Omar's technical skills include ${allSkills}. His core strengths are Full-Stack Development (React, PHP, Node.js), AI Workflow Automation, Presales Engineering, and Backend Engineering with PostgreSQL/MySQL. He also has low-level experience with VHDL/FPGA programming.`;
    },
  },
  {
    keywords: ["experience", "career", "professional", "background", "roles", "history", "timeline"],
    answer: () => {
      const jobs = getSortedExperience();
      const list = jobs
        .map((j) => `• **${j.role}** at ${j.company} (${j.period})`)
        .join("\n");
      const current = getCurrentJob();
      return `Omar has ${jobs.length} professional roles. He is currently a **${current.role}** at **${current.company}**. Full timeline:\n${list}`;
    },
  },
  {
    keywords: ["project", "built", "portfolio", "game", "bank", "car", "unity", "hospital", "football"],
    answer: () => {
      const list = projects.map((p) => `• **${p.title}** (${p.tech.join(", ")}) — ${p.desc}`).join("\n");
      return `Here are Omar's notable projects:\n${list}`;
    },
  },
  {
    keywords: ["education", "degree", "university", "guc", "graduate", "study", "school", "college"],
    answer: () =>
      `Omar holds a **${education.degree}** from ${education.school} (${education.period}). ${education.note}`,
  },
  {
    keywords: ["contact", "email", "phone", "reach", "linkedin", "message"],
    answer: () =>
      `You can reach Omar at **${profile.email}** or **${profile.phone}**. He's based in ${profile.location}. Connect on LinkedIn: ${profile.linkedin}`,
  },
  {
    keywords: ["hire", "available", "opportunity", "opportunities", "open to", "freelance", "remote"],
    answer: () => {
      const job = getCurrentJob();
      return `Omar is currently employed as a **${job.role}** at **${job.company}**, but he is open to hearing about exciting opportunities. Reach him at **${profile.email}** or via [LinkedIn](${profile.linkedin}).`;
    },
  },
  {
    keywords: ["ai", "automation", "odoo", "content", "workflow"],
    answer: () =>
      `Omar has hands-on AI experience from his role at Odootec, where he architected AI workflows and business process automations — including an autonomous content creation system. He also sourced AI talent at DeepSource GmbH.`,
  },
  {
    keywords: ["binrashideg", "crm", "attendance", "websites"],
    answer: () =>
      `At Binrashideg, Omar designed and deployed **5 professional websites** and a custom **CRM system** using React.js and PHP. He also built a real-time **attendance tracking app** with React Native and SQL, plus full backend architecture with RESTful APIs and authentication.`,
  },
  {
    keywords: ["smart vision", "presales", "dell", "titanium", "enterprise", "infrastructure"],
    answer: () => {
      const job = getSortedExperience().find((j) => j.company.includes("Smart Vision"));
      if (!job) return "Omar works in presales engineering.";
      return `At **${job.company}** (${job.subtitle}), Omar works as a **${job.role}** (${job.period}).\n${job.highlights.map((h) => `• ${h}`).join("\n")}`;
    },
  },
  {
    keywords: ["speak", "arabic", "english", "german", "deutsch", "multilingual", "fluent"],
    answer: () => {
      const langs = languages.map((l) => `${l.name} (${l.level}%)`).join(", ");
      return `Omar is multilingual: ${langs}. His international semester in Germany at GIU adds to his cross-cultural communication skills.`;
    },
  },
  {
    keywords: ["who", "about", "introduce", "summary", "profile", "omar", "tell me about"],
    answer: () => profile.summary,
  },
  {
    keywords: ["full stack", "fullstack", "frontend", "backend", "react", "php", "developer"],
    answer: () =>
      `Omar is a Full-Stack Developer proficient in React.js, PHP, and Node.js. At Binrashideg he built complete systems — frontend dashboards, RESTful APIs, authentication, and deployment. He also works with React Native and Flutter for mobile, and currently applies his technical background in presales at Smart Vision Technologies.`,
  },
  {
    keywords: ["odoo", "odootec", "python backend"],
    answer: () => {
      const job = getSortedExperience().find((j) => j.company === "Odootec");
      return `At **Odootec** (${job.period}), Omar worked as an **${job.role}**.\n${job.highlights.map((h) => `• ${h}`).join("\n")}`;
    },
  },
  {
    keywords: ["deepsource", "recruitment", "talent"],
    answer: () => {
      const job = getSortedExperience().find((j) => j.company.includes("DeepSource"));
      return `At **${job.company}** (${job.period}), Omar worked in **${job.role}** (remote from Germany).\n${job.highlights.map((h) => `• ${h}`).join("\n")}`;
    },
  },
];

function scoreMatch(query, entry) {
  const q = query.toLowerCase();

  if (entry.exclude && entry.exclude.some((word) => q.includes(word))) {
    return 0;
  }

  let score = 0;
  for (const kw of entry.keywords) {
    if (q.includes(kw)) {
      score += kw.includes(" ") ? kw.length * 3 : kw.length;
    }
  }
  return score;
}

function getLocalResponse(query) {
  const q = query.toLowerCase();

  const phraseMatches = [
    {
      phrases: ["work now", "works now", "working now", "current job", "current role", "where does", "where do you work"],
      answer: () => {
        const job = getCurrentJob();
        return `Omar currently works as a **${job.role}** at **${job.company}** (${job.subtitle}), ${job.period}. ${job.highlights[0]}`;
      },
    },
    {
      phrases: ["top skills", "technical skills", "programming skills"],
      answer: () => knowledgeBase.find((e) => e.keywords.includes("programming")).answer(),
    },
    {
      phrases: ["speak", "languages does", "what languages"],
      answer: () => knowledgeBase.find((e) => e.keywords.includes("multilingual")).answer(),
    },
  ];

  for (const match of phraseMatches) {
    if (match.phrases.some((p) => q.includes(p))) {
      return match.answer();
    }
  }

  let best = { score: 0, answer: null };

  for (const entry of knowledgeBase) {
    const score = scoreMatch(query, entry);
    if (score > best.score) {
      best = { score, answer: entry.answer };
    }
  }

  if (best.score > 0) {
    return best.answer();
  }

  return `I'm Omar's portfolio AI assistant! I can tell you about his **current role**, **skills**, **experience**, **projects**, **education**, and how to **contact** him. Try asking "Where does Omar work now?" or "What are his top skills?"`;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatMarkdown(text) {
  return escapeHtml(text)
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br>");
}

async function getOpenAIResponse(query, apiKey) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            aiContext +
            "\nAnswer concisely in 2-4 sentences. Be professional and highlight Omar's strengths. His current role is Presales Engineer at Smart Vision Technologies (Titanium Partner to Dell).",
        },
        { role: "user", content: query },
      ],
      max_tokens: 300,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

function initAIAssistant() {
  const panel = document.getElementById("ai-panel");
  const overlay = document.getElementById("ai-overlay");
  const messages = document.getElementById("ai-messages");
  const form = document.getElementById("ai-form");
  const input = document.getElementById("ai-input");
  const suggestionsEl = document.getElementById("ai-suggestions");
  const keyInput = document.getElementById("openai-key");
  let isProcessing = false;

  const savedKey = localStorage.getItem("openai_api_key");
  if (savedKey) keyInput.value = savedKey;

  keyInput.addEventListener("change", () => {
    localStorage.setItem("openai_api_key", keyInput.value.trim());
  });

  function openPanel() {
    panel.classList.add("open");
    overlay.classList.add("active");
    panel.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    setTimeout(() => input.focus(), 300);
    if (typeof gsap !== "undefined") {
      gsap.fromTo(panel, { x: 40, opacity: 0.85 }, { x: 0, opacity: 1, duration: 0.4, ease: "power3.out" });
    }
  }

  function closePanel() {
    panel.classList.remove("open");
    overlay.classList.remove("active");
    panel.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  document.getElementById("open-ai").addEventListener("click", openPanel);
  document.getElementById("open-ai-2").addEventListener("click", openPanel);
  document.getElementById("close-ai").addEventListener("click", closePanel);
  overlay.addEventListener("click", closePanel);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && panel.classList.contains("open")) {
      closePanel();
    }
  });

  function addMessage(text, type) {
    const div = document.createElement("div");
    div.className = `ai-msg ${type}`;
    if (type === "bot") {
      div.innerHTML = formatMarkdown(text);
    } else {
      div.textContent = text;
    }
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return div;
  }

  function showTyping() {
    const div = document.createElement("div");
    div.className = "ai-msg bot typing";
    div.innerHTML = "<span></span><span></span><span></span>";
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return div;
  }

  async function handleQuery(query) {
    if (!query || isProcessing) return;
    isProcessing = true;

    addMessage(query, "user");
    input.value = "";
    suggestionsEl.style.display = "none";

    const typing = showTyping();
    const apiKey = keyInput.value.trim() || localStorage.getItem("openai_api_key");

    try {
      let response;
      if (apiKey && apiKey.startsWith("sk-")) {
        response = await getOpenAIResponse(query, apiKey);
      } else {
        await new Promise((r) => setTimeout(r, 500 + Math.random() * 300));
        response = getLocalResponse(query);
      }
      typing.remove();
      addMessage(response, "bot");
    } catch {
      typing.remove();
      addMessage(getLocalResponse(query), "bot");
    } finally {
      isProcessing = false;
      input.focus();
    }
  }

  suggestionsEl.innerHTML = SUGGESTIONS.map(
    (s) => `<button type="button" class="ai-suggestion">${s}</button>`
  ).join("");

  suggestionsEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".ai-suggestion");
    if (!btn) return;
    handleQuery(btn.textContent.trim());
  });

  addMessage(
    `Hi! I'm Omar's AI portfolio assistant. Omar is currently a Presales Engineer at Smart Vision Technologies. Ask me about his skills, experience, projects, or how to get in touch.`,
    "bot"
  );

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleQuery(input.value.trim());
  });
}
