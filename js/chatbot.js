/* ==========================================================================
   CHATBOT.JS — AI Portfolio Assistant
   ========================================================================== */

(function () {
  'use strict';

  // ===== REFS =====
  const toggle         = document.getElementById('chatToggle');
  const container      = document.getElementById('chatContainer');
  const badge          = document.getElementById('chatBadge');
  const messages       = document.getElementById('chatMessages');
  const input          = document.getElementById('chatInput');
  const sendBtn        = document.getElementById('chatSend');
  const typingRow      = document.getElementById('typingRow');
  const sugToggle      = document.getElementById('suggestionsToggle');
  const chipsWrap      = document.getElementById('chipsWrap');

  let isOpen = false;

  // ===== PORTFOLIO DATA =====
  const data = {
    name: 'Likho Pikelela',
    location: 'Cape Town, South Africa',
    role: 'Cybersecurity & Full-Stack Engineer',
    email: 'pikelelalikho@gmail.com',
    linkedin: 'https://www.linkedin.com/in/likho-pikelela-700495200/',
    github: 'https://github.com/pikelelalikho',

    about: `Likho is a cybersecurity and full-stack engineer from Cape Town, South Africa. He has hands-on experience in cybersecurity operations, Linux server administration, cloud infrastructure, and enterprise application deployments. His background spans Incident Response & Digital Forensics, full-stack web development, AI integration, and production Linux infrastructure engineering.`,

    skills: [
      'Cybersecurity & Incident Response', 'Digital Forensics & Threat Analysis',
      'Linux Server Administration (Ubuntu)', 'Cloudflare Tunnel & DNS Management',
      'NGINX & Reverse Proxy', 'PM2 Process Management',
      'Node.js & Express.js', 'FastAPI Backend', 'Socket.IO Real-Time Systems',
      'JWT Authentication', 'HTML, CSS, JavaScript', 'Python Automation',
      'AI Tools & Prompt Engineering', 'SSL/TLS & Cloud Security',
      'Git & GitHub', 'Full-Stack Web Development'
    ],

    projects: [
      { name: 'DHA Enterprise Tracker', desc: 'Production enterprise system for tracking documentation workflows. Built with Node.js, Express.js, Socket.IO, JWT auth, and PostgreSQL on Ubuntu Linux with PM2 and Cloudflare Tunnel.', tags: ['Node.js', 'PostgreSQL', 'Linux', 'Enterprise'] },
      { name: 'Immigration Management Portal', desc: 'Full-stack web application for managing immigration cases and documentation. Features user auth, case tracking, document upload, and admin dashboards on self-hosted Linux infrastructure.', tags: ['Full-Stack', 'Express.js', 'Linux'] },
      { name: 'Nexa East Hub Platform', desc: 'Full-stack production platform on self-hosted Ubuntu Linux using Cloudflare Tunnel, PM2, Node.js, and custom domain infrastructure.', link: 'https://nexaeasthub.co.za/', tags: ['Node.js', 'Cloudflare', 'PM2', 'Linux'] },
      { name: 'AI Resume Generator', desc: 'AI-powered tool that creates professional resumes from user input with preview and download.', link: 'https://resume-generator-svqj.onrender.com/', tags: ['Python', 'AI', 'Web'] },
      { name: 'Sentiment Analysis Dashboard', desc: 'Interactive dashboard using Hugging Face models to analyse text sentiment with visual trend output.', link: 'https://pikelela-sentiment-dashboard.hf.space/', tags: ['Python', 'Hugging Face', 'NLP'] },
      { name: 'Teachable Machine – Cup Detector', desc: 'Image classification model trained with Google Teachable Machine to identify cups vs other objects.', link: 'https://pikelelalikho.github.io/teachable_machine/', tags: ['ML', 'Teachable Machine'] }
    ],

    education: [
      'National Senior Certificate (Grade 12)',
      'Cybersecurity Fundamentals – Digital Regenesys (2023)',
      'Cybersecurity Defence Toolbox – Digital Regenesys (2023)',
      'Incident Response & Digital Forensics Internship – CCSSR (2023–2024)',
      'CAPACITI Professional Development – Coursera (2025)',
      'CAPACITI AI Bootcamp – AI Basics, Ethics & Projects (2025)',
      'CAPACITI Cybersecurity Learning Path – Coursera (2025)'
    ],

    experience: [
      { title: 'Digital Forensics Intern', org: 'Center for Cyber Security Studies & Research', period: '2023–2024', details: 'Network analysis, vulnerability assessments, digital investigations, incident response workflows.' },
      { title: 'AI Bootcamp Participant', org: 'CAPACITI', period: '2025', details: 'AI systems, prompt engineering, ethical AI, and practical AI-powered project development.' }
    ],

    goals: [
      'Pursuing Certified Ethical Hacker (CEH) certification',
      'Expanding AI integration in cybersecurity solutions',
      'Contributing to open-source security tooling',
      'Building enterprise-grade secure platforms'
    ]
  };

  // ===== INTENT DETECTION =====
  function detectIntent(msg) {
    const m = msg.toLowerCase();
    if (/^(hi|hello|hey|good\s)/i.test(m))                                          return 'greeting';
    if (/about|who is|background|story|journey|yourself/i.test(m))                  return 'about';
    if (/skill|expertise|know|tech|stack|language|tool/i.test(m))                   return 'skills';
    if (/project|portfolio|built|created|developed|work/i.test(m))                  return 'projects';
    if (/experienc|internship|job|career|professional/i.test(m))                    return 'experience';
    if (/educat|certif|course|training|bootcamp|study|degree|school/i.test(m))      return 'education';
    if (/contact|email|linkedin|github|reach|connect|hire|opport/i.test(m))         return 'contact';
    if (/goal|future|plan|aspir|next|certif.*ethical|ceh/i.test(m))                 return 'goals';
    if (/linux|server|cloudflare|nginx|pm2|infra|deploy/i.test(m))                  return 'infra';
    return 'default';
  }

  // ===== RESPONSE BUILDER =====
  function buildResponse(intent) {
    switch (intent) {
      case 'greeting':
        return `Hey! 👋 I'm Likho's portfolio assistant. You can ask me about his skills, projects, experience, or how to get in touch. What would you like to know?`;

      case 'about':
        return data.about + `\n\nHe is committed to earning the <strong>Certified Ethical Hacker (CEH)</strong> certification and building impactful, secure digital solutions.`;

      case 'skills':
        return `Here's a snapshot of Likho's technical skill set:\n\n<strong>Security & Infra:</strong> ${data.skills.slice(0,6).join(', ')}\n\n<strong>Development:</strong> ${data.skills.slice(6,12).join(', ')}\n\n<strong>DevOps & Tools:</strong> ${data.skills.slice(12).join(', ')}`;

      case 'projects': {
        const lines = data.projects.map((p, i) =>
          `<strong>${i+1}. ${p.name}</strong>\n${p.desc}${p.link ? `\n<a href="${p.link}" target="_blank">→ View project</a>` : ''}`
        ).join('\n\n');
        return `Here are Likho's key projects:\n\n${lines}`;
      }

      case 'experience': {
        const lines = data.experience.map(e =>
          `<strong>${e.title}</strong> @ ${e.org} (${e.period})\n${e.details}`
        ).join('\n\n');
        return `Likho's professional experience:\n\n${lines}`;
      }

      case 'education': {
        const list = data.education.map((e, i) => `${i+1}. ${e}`).join('\n');
        return `Likho's education & certifications:\n\n${list}`;
      }

      case 'contact':
        return `You can reach Likho through:\n\n📧 <strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a>\n💼 <strong>LinkedIn:</strong> <a href="${data.linkedin}" target="_blank">linkedin.com/in/likho-pikelela</a>\n🐙 <strong>GitHub:</strong> <a href="${data.github}" target="_blank">github.com/pikelelalikho</a>\n📍 <strong>Location:</strong> ${data.location}\n\nHe's open to opportunities in cybersecurity, full-stack development, and infrastructure engineering.`;

      case 'goals':
        return `Likho's current goals:\n\n${data.goals.map((g,i)=>`${i+1}. ${g}`).join('\n')}\n\nHe's actively growing toward a career in senior cybersecurity engineering and ethical hacking.`;

      case 'infra':
        return `Likho has hands-on production infrastructure experience:\n\n• Ubuntu Linux server deployment & management\n• Cloudflare Tunnel, DNS records, and Zero Trust networking\n• SSL/TLS setup, reverse proxy with NGINX\n• PM2 process management and live monitoring\n• Socket.IO, JWT auth, and production API debugging\n• Diagnosed real-world 502 errors, port conflicts, and deployment failures`;

      default:
        return `I'm not sure about that specific question, but I can tell you about Likho's <strong>skills</strong>, <strong>projects</strong>, <strong>experience</strong>, <strong>education</strong>, or <strong>contact info</strong>. What would you like to explore?`;
    }
  }

  // ===== ADD MESSAGE =====
  function addMessage(text, sender) {
    const row = document.createElement('div');
    row.className = `msg-row ${sender}`;
    row.innerHTML = `
      <div class="msg-icon">${sender === 'bot' ? '🤖' : '👤'}</div>
      <div class="msg-body">
        <div class="msg-bubble">${text.replace(/\n/g, '<br>')}</div>
        <div class="msg-time">${new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</div>
      </div>`;
    messages.insertBefore(row, typingRow);
    messages.scrollTop = messages.scrollHeight;
  }

  // ===== TYPING INDICATOR =====
  function showTyping()  { typingRow.style.display = 'flex'; messages.scrollTop = messages.scrollHeight; }
  function hideTyping()  { typingRow.style.display = 'none'; }

  // ===== SEND MESSAGE =====
  function sendMessage(text) {
    const msg = (text || input.value).trim();
    if (!msg) return;
    input.value = '';
    sendBtn.disabled = true;

    addMessage(msg, 'user');
    showTyping();

    const delay = 900 + Math.random() * 600;
    setTimeout(() => {
      hideTyping();
      addMessage(buildResponse(detectIntent(msg)), 'bot');
      sendBtn.disabled = false;
    }, delay);
  }

  // ===== TOGGLE CHAT =====
  function toggleChat() {
    isOpen = !isOpen;
    container.classList.toggle('open', isOpen);
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    container.setAttribute('aria-hidden', String(!isOpen));

    if (isOpen) {
      badge.classList.remove('visible');
      input.focus();
    }
  }
  // Expose globally
  window.toggleChat = toggleChat;

  // ===== SUGGESTIONS TOGGLE =====
  if (sugToggle && chipsWrap) {
    sugToggle.addEventListener('click', () => {
      const open = chipsWrap.classList.toggle('open');
      sugToggle.classList.toggle('open', open);
    });
    // Open by default
    chipsWrap.classList.add('open');
    sugToggle.classList.add('open');
  }

  // ===== EVENTS =====
  toggle?.addEventListener('click', toggleChat);
  sendBtn?.addEventListener('click', () => sendMessage());
  input?.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendMessage(); });
  input?.addEventListener('input', () => { sendBtn.disabled = !input.value.trim(); });

  // Chip clicks
  document.querySelectorAll('.chip[data-q]').forEach(chip => {
    chip.addEventListener('click', () => sendMessage(chip.dataset.q));
  });

  // Close chat on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) toggleChat();
  });

  // ===== BADGE NOTIFICATION =====
  setTimeout(() => {
    if (!isOpen) badge.classList.add('visible');
  }, 3000);

  // ===== CLOSE CHAT CONTROLS =====
  document.getElementById('chatMinimize')?.addEventListener('click', () => {
    if (isOpen) toggleChat();
  });
  document.getElementById('chatClose')?.addEventListener('click', () => {
    if (isOpen) toggleChat();
  });

})();
