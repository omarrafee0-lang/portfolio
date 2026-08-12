const profile = {
  name: "Omar Ahmed Rafee",
  title: "Full-Stack Developer | Web Applications | AI Automation",
  tagline: "I build modern websites, web applications, backend systems and AI-powered automation.",
  email: "omarrafee@gmail.com",
  phone: "01060166400",
  location: "Cairo, Egypt",
  birthdate: "06/04/2002",
  linkedin: "https://linkedin.com/in/omar-rafee-90b2371b0",
  summary: "I am a Computer Engineering graduate and Full-Stack Developer with hands-on experience building professional websites, custom CRM systems, RESTful APIs, mobile applications, and AI automation workflows. I work across React, PHP, Python, Node.js, SQL and related technologies, and I enjoy turning business requirements into practical digital products. Available for freelance projects, collaborations, and custom software work.",
};
const skills = [
  { category: "Programming Languages", items: ["Python", "JavaScript", "PHP", "C++", "SQL", "Java", "C", "VHDL", "Prolog", "Haskell"] },
  { category: "Web & Mobile", items: ["React.js", "React Native", "Flutter", "HTML5", "CSS3"] },
  { category: "Backend & Databases", items: ["Node.js", "Odoo ERP", "MySQL", "PostgreSQL", "RESTful APIs"] },
  { category: "AI & Data Science", items: ["AI Workflow Automation", "Content Generation", "Data Analysis"] },
  { category: "Tools & Testing", items: ["Postman", "Git", "FPGA", "Hosting & Domains"] },
];
const experience = [
  { role: "Presales Engineer", company: "Smart Vision Technologies", subtitle: "Titanium Partner to Dell", location: "Cairo, Egypt", period: "Apr 2026 – Present", current: true, start: "2026-04", highlights: ["Currently serving as Presales Engineer at Smart Vision Technologies, a Titanium Partner to Dell.", "Deliver technical presales support, solution demos, and client-facing consultations for Dell enterprise infrastructure.", "Translate business requirements into tailored IT solutions across Dell's product portfolio.", "Collaborate with sales and engineering teams to design proposals and support bid processes."] },
  { role: "Odoo Developer", company: "Odootec", location: "Cairo, Egypt", period: "Feb 2026 – Mar 2026", start: "2026-02", highlights: ["Developed backend solutions using Python for high-concurrency web systems.", "Architected AI workflows and business process automations, including autonomous content creation.", "Researched system design principles and presented functional demos to the engineering team."] },
  { role: "Full Stack Web Developer & IT", company: "Binrashideg", location: "Cairo, Egypt", period: "Oct 2024 – Oct 2025", start: "2024-10", highlights: ["Designed and deployed 5 professional websites and a custom CRM system using React.js and PHP.", "Developed a real-time attendance tracking system using React Native integrated with SQL databases.", "Engineered complete backend architecture: RESTful APIs, authentication, and dynamic dashboards.", "Managed IT infrastructure, secure access, and seamless deployment on hosting platforms."] },
  { role: "AI & Tech Talent Acquisition", company: "DeepSource GmbH", location: "Germany (Remote)", period: "Jul 2024 – Sep 2024", start: "2024-07", highlights: ["Sourced and placed top tech talent with focus on AI and data protection skills.", "Championed a data-driven recruitment approach across remote hiring pipelines."] },
  { role: "Quality Control Intern", company: "Intercom Enterprises", location: "Cairo, Egypt", period: "Jul 2023 – Sep 2023", start: "2023-07", highlights: ["Worked with Postman and API testing frameworks to build comprehensive test cases.", "Identified gaps and issues through systematic quality control processes."] },
];
const education = { degree: "Bachelor of Science in Computer Engineering", school: "German University in Cairo (GUC)", location: "Cairo, Egypt", period: "Sep 2020 – Jun 2025", note: "Selected for a semester abroad at GIU, Germany — international academic experience." };
const courses = [
  { title: "Architecture Workshop & Course", desc: "Intensive workshop on architectural design principles and techniques." },
  { title: "Flutter Online Course", desc: "Cross-platform mobile app development proficiency." },
  { title: "HTML Online Course", desc: "Essential web development skills and knowledge." },
  { title: "C++ Online Course", desc: "Comprehensive C++ programming proficiency." },
  { title: "L'Oréal Brandstorm Competition", desc: "March 2023 — strategic thinking and innovative marketing skills." },
];
const projects = [
  { title: "Marvel Game", tech: ["Java", "GUI"], desc: "Board-style fighting game with engaging mechanics and user-friendly interface.", color: "#e62429" },
  { title: "Online Bank System", tech: ["HTML", "CSS", "JavaScript"], desc: "Secure banking platform with account management, transactions, and authentication.", color: "#00d4aa" },
  { title: "Smart Car", tech: ["VHDL", "FPGA"], desc: "Self-navigating car with sensor-based algorithms for autonomous movement and obstacle avoidance.", color: "#6366f1" },
  { title: "Unity Games", tech: ["Unity", "C++"], desc: "Two complete games built with Unity engine and C++ scripting.", color: "#f59e0b" },
  { title: "Hospital Management System", tech: ["SQL", "Data Analysis"], desc: "Robust SQL database managing complex patient records and medical data.", color: "#ec4899" },
  { title: "Football Management System", tech: ["SQL", "Analytics"], desc: "Stadium operations and match data analysis for performance metrics.", color: "#22c55e" },
];
const languages = [{ name: "Arabic", level: 100 }, { name: "English", level: 90 }, { name: "Deutsch", level: 45 }];
const aiContext = `You are an AI assistant representing Omar Ahmed Rafee's portfolio website. Answer questions about Omar professionally, concisely, and enthusiastically. ${JSON.stringify({ profile, skills, experience, education, courses, projects, languages }, null, 2)}`;
