/* =========================================================================
   Bankroll Brotherhood — vanilla JS SPA
   Data persists in localStorage under key "bb_data_v2".
   ========================================================================= */

const STORAGE_KEY = "bb_data_v2";
const SESSION_KEY = "bb_session_v2";

const IMG = {
  office: "https://images.unsplash.com/photo-1758519288814-bb9f97e4df95?fm=jpg&q=75&w=1800&auto=format&fit=crop",
  officeAlt: "https://images.unsplash.com/photo-1758519288969-4806f015852d?fm=jpg&q=75&w=1200&auto=format&fit=crop",
};

const ICONS = {
  home: `<path d="M3 11l9-7 9 7M5 10v10h5v-6h4v6h5V10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  trending: `<path d="M3 17l6-6 4 4 8-8M15 7h6v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  users: `<circle cx="9" cy="8" r="3.5" stroke="currentColor" stroke-width="2" fill="none"/><path d="M2.5 20c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5M16 8.5c1.9 0 3.5 1.6 3.5 3.5M15 14c2.5 0 4.7 1.6 5.4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>`,
  calendar: `<rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  info: `<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 11v6M12 8v.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  logout: `<path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  shield: `<path d="M12 2l8 4v6c0 5-3.4 8.7-8 10-4.6-1.3-8-5-8-10V6l8-4z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  menu: `<path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  mail: `<rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><path d="M2 6l10 7 10-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  lock: `<rect x="4" y="11" width="16" height="10" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><path d="M8 11V7a4 4 0 018 0v4" stroke="currentColor" stroke-width="2" fill="none"/>`,
  alert: `<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 8v5M12 16v.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  check: `<path d="M4 12l5 5L20 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  arrowRight: `<path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  chevronRight: `<path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  sparkles: `<path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2zM19 15l.9 2.6L22.5 18.5l-2.6.9L19 22l-.9-2.6-2.6-.9 2.6-.9L19 15z" fill="currentColor" stroke="none"/>`,
  target: `<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/>`,
  plus: `<path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  trash: `<path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  loader: `<path d="M12 3a9 9 0 100 18 9 9 0 000-18z" stroke="currentColor" stroke-width="2.4" fill="none" stroke-dasharray="42" stroke-dashoffset="10" stroke-linecap="round"/>`,
  download: `<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  upload: `<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  history: `<path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  dollarSign: `<path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  userCheck: `<path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M8.5 11a4 4 0 100-8 4 4 0 000 8zM17 11l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  refresh: `<path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
};

function icon(name, size = 15) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" style="flex-shrink:0">${ICONS[name] || ""}</svg>`;
}

/* ---------------------------------------------------------------------
   Data model + persistence
   --------------------------------------------------------------------- */
function seedData() {
  return {
    settings: {
      groupName: "Bankroll Brotherhood",
      founded: todayISO(),
      defaultWeeklyAmount: 250,
      penaltyRule: "KES 50 late fee for each missed Saturday contribution.",
    },
    members: [],
    investments: [],
    meetings: [
      { id: "mt_1", date: nextSaturday(0), topic: "Weekly contribution check-in & portfolio review" },
      { id: "mt_2", date: nextSaturday(4), topic: "Monthly financial strategy meeting" },
    ],
    transactions: [],
  };
}

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seeded = seedData();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.members)) parsed.members = [];
    if (!Array.isArray(parsed.transactions)) parsed.transactions = [];
    if (!Array.isArray(parsed.investments)) parsed.investments = [];
    if (!Array.isArray(parsed.meetings)) parsed.meetings = [];
    if (!parsed.settings) parsed.settings = seedData().settings;
    return parsed;
  } catch {
    const seeded = seedData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DATA));
}

function resetDatabase() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(SESSION_KEY);
  DATA = seedData();
  saveData();
  render();
}

function getSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || "null"); } catch { return null; }
}
function setSession(memberId) {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ memberId }));
}
function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

let DATA = loadData();

// Synchronize across open browser windows/tabs
window.addEventListener("storage", (e) => {
  if (e.key === STORAGE_KEY || e.key === SESSION_KEY) {
    DATA = loadData();
    render();
  }
});

/* ---------------------------------------------------------------------
   Utilities
   --------------------------------------------------------------------- */
function todayISO() { return new Date().toISOString().slice(0, 10); }
function nextSaturday(offsetWeeks) {
  const d = new Date();
  const day = d.getDay();
  const diff = (6 - day + 7) % 7 || 7;
  d.setDate(d.getDate() + diff + offsetWeeks * 7);
  return d.toISOString().slice(0, 10);
}
function fmtDate(iso) {
  if (!iso) return "N/A";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
function fmt(n) {
  const v = Math.round(n || 0);
  return "KES " + v.toLocaleString("en-KE");
}
function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function uid(prefix) {
  return prefix + "_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}
async function hashPassword(pwd) {
  try {
    if (window.crypto && window.crypto.subtle && typeof window.crypto.subtle.digest === "function") {
      const enc = new TextEncoder().encode(pwd);
      const buf = await window.crypto.subtle.digest("SHA-256", enc);
      return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
    }
  } catch (e) {
    console.warn("Crypto API restricted or unavailable, using fallback hash:", e);
  }
  let hash = 0;
  for (let i = 0; i < pwd.length; i++) {
    const char = pwd.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return "h_" + Math.abs(hash).toString(36) + "_" + pwd.length;
}
function weeksSince(iso) {
  if (!iso) return 0;
  const start = new Date(iso + "T00:00:00").getTime();
  const now = Date.now();
  if (now < start) return 0;
  return Math.floor((now - start) / (7 * 24 * 3600 * 1000)) + 1;
}

/* ---------------------------------------------------------------------
   Derived figures
   --------------------------------------------------------------------- */
function activeMembers() { return DATA.members.filter((m) => m.active); }
function allMembers() { return DATA.members; }

function memberTransactions(mId) {
  return (DATA.transactions || []).filter((t) => t.memberId === mId);
}

function memberContribution(m) {
  const txs = memberTransactions(m.id);
  return txs.filter((t) => t.type === "contribution").reduce((s, t) => s + Number(t.amount || 0), 0);
}

function totalPooled() {
  return (DATA.transactions || []).filter((t) => t.type === "contribution").reduce((s, t) => s + Number(t.amount || 0), 0);
}
function totalPenaltiesCollected() {
  return (DATA.transactions || []).filter((t) => t.type === "penalty_payment").reduce((s, t) => s + Number(t.amount || 0), 0);
}
function totalWithdrawals() {
  return (DATA.transactions || []).filter((t) => t.type === "withdrawal").reduce((s, t) => s + Number(t.amount || 0), 0);
}
function totalInvested() { return (DATA.investments || []).reduce((s, i) => s + Number(i.invested || 0), 0); }
function totalCurrentValue() { return (DATA.investments || []).reduce((s, i) => s + Number(i.current || 0), 0); }
function cashReserve() {
  const netPool = totalPooled() + totalPenaltiesCollected() - totalWithdrawals();
  return Math.max(0, netPool - totalInvested());
}
function totalPortfolio() { return cashReserve() + totalCurrentValue(); }
function netPL() { return totalCurrentValue() - totalInvested(); }
function totalPenaltiesOwed() { return DATA.members.reduce((s, m) => s + (m.penaltyOwed || 0), 0); }
function weeklyGroupRate() { return activeMembers().reduce((s, m) => s + (m.weeklyAmount || 0), 0); }

/* ---------------------------------------------------------------------
   Router
   --------------------------------------------------------------------- */
const app = document.getElementById("app");
const topNav = document.getElementById("topNav");

function currentMember() {
  const sess = getSession();
  if (!sess) return null;
  return DATA.members.find((m) => m.id === sess.memberId && m.active) || null;
}

function navigate(path) {
  window.location.hash = "#" + path;
}

window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", render);

function route() {
  const hash = window.location.hash.replace(/^#/, "") || "/";
  return hash;
}

function render() {
  const path = route();
  const member = currentMember();

  // Guard: dashboard/admin require session
  if ((path.startsWith("/dashboard") || path.startsWith("/admin")) && !member) {
    navigate("/login");
    return;
  }
  // Guard: admin route requires admin role
  if (path.startsWith("/admin") && member && member.role !== "admin") {
    navigate("/dashboard");
    return;
  }

  const isAppShell = path.startsWith("/dashboard") || path.startsWith("/admin");
  topNav.style.display = isAppShell ? "none" : "";

  if (path === "/") app.innerHTML = viewLanding();
  else if (path === "/about") app.innerHTML = viewAbout();
  else if (path === "/login") app.innerHTML = viewAuth("login");
  else if (path === "/register") app.innerHTML = viewAuth("register");
  else if (path.startsWith("/dashboard")) app.innerHTML = viewDashboard(member, path);
  else if (path.startsWith("/admin")) app.innerHTML = viewAdmin(member, path);
  else app.innerHTML = viewLanding();

  highlightNav(path);
  bindGlobalHandlers();
  window.scrollTo(0, 0);
}

function highlightNav(path) {
  document.querySelectorAll("[data-nav]").forEach((el) => {
    el.classList.toggle("active", el.getAttribute("data-nav") === path);
  });
}

/* ---------------------------------------------------------------------
   View: Landing
   --------------------------------------------------------------------- */
function viewLanding() {
  const s = DATA.settings;
  const objectives = [
    "Encourage financial discipline among every member.",
    "Provide a structured, weekly savings rhythm.",
    "Pool contributions toward identifying and making sound investments.",
    "Create a support system for financial and personal growth.",
  ];
  return `
  <div class="hero-section fade-in">
    <div class="wrap">
      <div class="hero-grid">
        <div class="hero-copy">
          <div class="eyebrow">${icon("sparkles", 14)} ${activeMembers().length || "OPEN"} MEMBER${activeMembers().length === 1 ? "" : "S"} &middot; SAVINGS &amp; INVESTMENT PARTNERSHIP</div>
          <h1>Every Saturday,<br/>the pool grows.</h1>
          <p>${escapeHtml(s.groupName)} is a disciplined savings partnership. No rotations, no payouts — every shilling accumulates until it becomes a deliberate, group-approved investment.</p>
          <div class="hero-actions">
            <a href="#/register" class="btn btn-gold">Get started ${icon("arrowRight", 16)}</a>
            <a href="#/about" class="btn btn-ghost">Read the constitution</a>
          </div>
          <div class="chip-row">
            <div class="chip">${icon("users", 14)}<strong>${activeMembers().length}</strong><span>active members</span></div>
            <div class="chip">${icon("target", 14)}<strong>${fmt(s.defaultWeeklyAmount)}</strong><span>standard / Saturday</span></div>
            <div class="chip">${icon("calendar", 14)}<strong>${fmtDate(s.founded)}</strong><span>founded</span></div>
          </div>
        </div>
        <div class="hero-visual">${poolWidget()}</div>
      </div>
    </div>

    <div class="feature-banner">
      <div class="feature-banner-inner">
        <img class="bg-photo" src="${IMG.office}" alt="Members gathered around a laptop reviewing figures together" />
        <div class="photo-overlay"></div>
        <div class="feature-banner-content">
          <span class="tag">THE WEEKLY REVIEW</span>
          <h3>Every member, every number, checked together.</h3>
          <p>The group meets on a set cadence to review contributions and scan for the next investment worth making — nothing moves without sign-off from leadership.</p>
        </div>
      </div>
    </div>

    <div class="objectives-section">
      <div class="wrap">
        <span class="section-label">OBJECTIVES</span>
        <div class="objectives-grid">
          ${objectives.map((o, i) => `
            <div class="objective-card">
              <span class="num">0${i + 1}</span>
              <p>${o}</p>
            </div>`).join("")}
        </div>
      </div>
    </div>
  </div>`;
}

function poolWidget() {
  return `
  <div class="pool">
    <div class="pool-glow"></div>
    <svg class="pool-svg" viewBox="0 0 320 320" width="320" height="320">
      <defs>
        <filter id="glowRed" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="glowTeal" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="glowGold" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      <g transform="rotate(-40, 160, 160)">
        <ellipse cx="160" cy="160" rx="140" ry="52" fill="none" stroke="rgba(255,107,107,0.35)" stroke-width="1.5" stroke-dasharray="6 4"/>
        <circle r="7" fill="#FF6B6B" filter="url(#glowRed)">
          <animateMotion path="M 160,108 A 140,52 0 1 1 160,212 A 140,52 0 1 1 160,108" dur="7s" repeatCount="indefinite"/>
        </circle>
      </g>

      <g transform="rotate(40, 160, 160)">
        <ellipse cx="160" cy="160" rx="140" ry="52" fill="none" stroke="rgba(67,230,196,0.35)" stroke-width="1.5" stroke-dasharray="6 4"/>
        <circle r="7" fill="#43E6C4" filter="url(#glowTeal)">
          <animateMotion path="M 160,108 A 140,52 0 1 0 160,212 A 140,52 0 1 0 160,108" dur="9s" repeatCount="indefinite"/>
        </circle>
      </g>

      <g transform="rotate(80, 160, 160)">
        <ellipse cx="160" cy="160" rx="140" ry="52" fill="none" stroke="rgba(212,175,55,0.4)" stroke-width="1.5"/>
        <circle r="7" fill="#D4AF37" filter="url(#glowGold)">
          <animateMotion path="M 160,108 A 140,52 0 1 1 160,212 A 140,52 0 1 1 160,108" dur="11s" repeatCount="indefinite"/>
        </circle>
      </g>
    </svg>

    <div class="pool-core">
      <span class="label">POOLED TO DATE</span>
      <span class="value">${fmt(totalPooled())}</span>
      <span class="since">since ${fmtDate(DATA.settings.founded)}</span>
    </div>
  </div>`;
}

/* ---------------------------------------------------------------------
   View: About
   --------------------------------------------------------------------- */
function viewAbout() {
  const s = DATA.settings;
  const leaders = allMembers().filter((m) => m.role === "admin" && m.active);
  return `
  <div class="about-page fade-in">
    <div class="wrap-narrow">
      <span class="section-label" style="color:var(--gold)">ABOUT THE GROUP</span>
      <h1>${escapeHtml(s.groupName)}</h1>
      <p>Founded ${fmtDate(s.founded)} as a member-owned savings and investment partnership. Each member contributes a weekly amount set when they join. Rather than rotating payouts, contributions accumulate collectively until the group agrees on an investment worth making.</p>

      <div class="about-block">
        <span class="section-label">LEADERSHIP</span>
        <div class="leadership-grid">
          ${leaders.length ? leaders.map((m) => `
            <div class="leader-card">
              <div class="avatar">${initials(m.nickname)}</div>
              <div>
                <p class="leader-name">${escapeHtml(m.nickname)} <span>&middot; ${escapeHtml(m.name)}</span></p>
                <p class="leader-role">Administrator</p>
              </div>
            </div>`).join("") : `<p class="empty-state" style="width:100%">No administrator registered yet — create an account to become the founding administrator.</p>`}
        </div>
      </div>

      <div class="about-block">
        <span class="section-label">MEMBERSHIP &amp; PENALTIES</span>
        <div class="info-box">
          <p>New members register and join at the group's standard weekly rate of ${fmt(s.defaultWeeklyAmount)}, adjustable per member by an administrator as circumstances change. ${escapeHtml(s.penaltyRule)} Administrators may reduce or waive penalties at their discretion.</p>
        </div>
      </div>

      <div class="about-block">
        <span class="section-label">HOW DECISIONS ARE MADE</span>
        <div class="info-box">
          <p>Decisions on investments, membership, and amendments are made by the group's administrators in consultation with all members. Where members can't agree, the matter is tabled for further discussion at the next meeting.</p>
        </div>
      </div>

      <a href="#/register" class="btn btn-gold" style="margin-top:36px">Join the group ${icon("chevronRight", 16)}</a>
    </div>
  </div>`;
}

function initials(name) {
  return (name || "?").trim().slice(0, 2).toUpperCase();
}

/* ---------------------------------------------------------------------
   View: Auth (login / register)
   --------------------------------------------------------------------- */
function viewAuth(mode) {
  const isLogin = mode === "login";
  const memberCount = activeMembers().length;
  return `
  <div class="auth-shell fade-in">
    <div class="auth-visual">
      <img class="bg-photo" src="${IMG.officeAlt}" alt="Members reviewing a laptop together in the office" />
      <div class="photo-overlay dark"></div>
      <div class="visual-content">
        <span class="tag">PRIVATE MEMBER PORTAL</span>
        <p>${memberCount ? "One shared pool. Log in to access your personal member dashboard." : "No accounts created yet — register to become the Founding Administrator."}</p>
      </div>
    </div>
    <div class="auth-form-side">
      <div class="auth-card">
        <div class="auth-card-logo">${logoMark(28)}</div>
        <div class="auth-panel">
          <h2>${isLogin ? "Welcome back" : "Create your account"}</h2>
          <p>${isLogin ? "Log in to your member account." : (memberCount ? "New accounts are automatically added to the group members roster." : "You are the first to register! You will be set up as Founding Administrator.")}</p>

          <form id="authForm" data-mode="${mode}" class="form-grid" style="margin-top:22px">
            ${!isLogin ? `
            <div class="field">
              <span>Full name</span>
              <div class="field-input">
                <input name="name" type="text" placeholder="Jane Wanjiru" required />
              </div>
            </div>
            <div class="field">
              <span>Nickname</span>
              <div class="field-input">
                <input name="nickname" type="text" placeholder="e.g. Jay" required />
              </div>
            </div>` : ""}
            <div class="field" style="margin-top:${isLogin ? "0" : "13px"}">
              <span>Email</span>
              <div class="field-input">
                ${icon("mail", 15)}
                <input name="email" type="email" placeholder="you@example.com" required />
              </div>
            </div>
            <div class="field">
              <span>Password</span>
              <div class="field-input">
                ${icon("lock", 15)}
                <input name="password" type="password" placeholder="••••••••" required />
              </div>
            </div>
            ${!isLogin ? `
            <div class="field">
              <span>Confirm password</span>
              <div class="field-input">
                ${icon("lock", 15)}
                <input name="confirm" type="password" placeholder="••••••••" required />
              </div>
            </div>` : ""}
            <div id="authMsg"></div>
            <button type="submit" class="btn btn-gold" style="margin-top:6px" id="authSubmitBtn">
              ${isLogin ? icon("check", 16) : icon("userCheck", 16)} ${isLogin ? "Log in" : "Create account & join roster"}
            </button>
          </form>
          <p class="auth-switch">
            ${isLogin ? "New member?" : "Already registered?"}
            <button data-goto="${isLogin ? "/register" : "/login"}">${isLogin ? "Create account" : "Log in"}</button>
          </p>
        </div>
        <p class="auth-footnote">Private partnership system. Your member details will automatically reflect in the group roster once created.</p>
      </div>
    </div>
  </div>`;
}

function logoMark(size) {
  return `<div class="logo-mark" style="width:${size}px;height:${size}px"><svg width="${size * 0.55}" height="${size * 0.55}" viewBox="0 0 24 24" fill="none"><path d="M3 21h18M5 21V9l7-6 7 6v12M9 21v-6h6v6" stroke="#0A0D12" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>`;
}

/* ---------------------------------------------------------------------
   CLIENT PORTAL (Dashboard for Members)
   --------------------------------------------------------------------- */
function viewDashboard(member) {
  const myContrib = memberContribution(member);
  const myTxs = memberTransactions(member.id);
  const isAdmin = member.role === "admin";

  return dashboardShell(member, "dashboard", `
    <!-- Distinct Client Portal Header -->
    <div class="portal-header client-portal-header">
      <div class="flex items-center justify-between flex-wrap gap-12">
        <div>
          <div class="portal-badge client">${icon("users", 13)} CLIENT / MEMBER PORTAL</div>
          <h1 class="dash-h1">Welcome back, ${escapeHtml(member.nickname)}</h1>
          <p class="dash-sub">Account: <strong>${escapeHtml(member.email)}</strong> &middot; Role: <span class="badge ${isAdmin ? 'badge-admin' : 'badge-client'}">${isAdmin ? 'ADMINISTRATOR' : 'MEMBER'}</span></p>
        </div>
        <div class="dash-topbar-actions flex gap-10 items-center">
          <button class="icon-btn mobile-only" id="sidebarToggle">${icon("menu", 16)}</button>
          ${isAdmin ? `<a href="#/admin" class="btn btn-sm btn-gold">${icon("shield", 14)} Switch to Admin Control Center</a>` : ''}
        </div>
      </div>
    </div>

    <!-- Personal Financial Overview Card -->
    <div class="personal-summary-card">
      <div class="personal-summary-title">${icon("sparkles", 15)} My Account Summary</div>
      <div class="metric-row" style="margin-top:12px">
        ${metricCard("dollarSign", "My Total Contributed", fmt(myContrib), "Lifetime savings")}
        ${metricCard("target", "My Weekly Obligation", fmt(member.weeklyAmount) + " / wk", "Saturday contribution")}
        ${metricCard("alert", "My Penalty Status", fmt(member.penaltyOwed || 0), member.penaltyOwed > 0 ? "Penalty active" : "Good standing", member.penaltyOwed > 0 ? "down" : "up")}
        ${metricCard("userCheck", "Account Status", member.active ? "Active Member" : "Inactive", `Joined ${fmtDate(member.joined)}`, "up")}
      </div>
    </div>

    <!-- Group Investment & Portfolio Metrics (Read-only transparency for client) -->
    <div class="section-block" style="margin-top:28px">
      <h2>Group Savings Pool Overview</h2>
      <div class="metric-row" style="margin-top:12px">
        ${metricCard("target", "Total Portfolio Value", fmt(totalPortfolio()))}
        ${metricCard("target", "Group Cash Reserve", fmt(cashReserve()), "Available for investments")}
        ${metricCard("trending", "Net Portfolio P/L", fmt(Math.abs(netPL())), netPL() >= 0 ? "Gain overall" : "Loss overall", netPL() >= 0 ? "up" : "down")}
      </div>

      <div class="panels-row">
        <div class="card" style="flex:2 1 420px">
          <span class="panel-label">GROUP POOLED CONTRIBUTIONS — 12-WEEK PROJECTION</span>
          ${barChart(projectedWeeks(12))}
        </div>
        <div class="card" style="flex:1 1 260px">
          <span class="panel-label">PORTFOLIO ASSET ALLOCATION</span>
          ${allocationDonut()}
        </div>
      </div>
    </div>

    <!-- Group Investments -->
    <div id="sec-investments" class="section-block">
      <h2>Active Group Investments</h2>
      <div class="panels-row" style="margin-top:0">
        <div class="card" style="flex:1 1 320px">
          <span class="panel-label">PROFIT / LOSS BY INVESTMENT</span>
          ${barChartPL(DATA.investments.map((i) => ({ name: i.name.split(" ")[0], pl: Number(i.current) - Number(i.invested) })))}
        </div>
        <div class="card" style="flex:1 1 320px">
          <span class="panel-label">POSITIONS HELD BY GROUP</span>
          <div style="margin-top:14px">
            ${DATA.investments.length ? DATA.investments.map((inv) => positionRow(inv)).join("") : `<p class="empty-state">No investments recorded yet.</p>`}
          </div>
        </div>
      </div>
    </div>

    <!-- Transactions Section -->
    <div id="sec-transactions" class="section-block">
      <div class="flex items-center justify-between gap-12" style="margin-bottom:16px;flex-wrap:wrap">
        <div>
          <h2 style="margin:0">Transaction Ledger</h2>
          <p class="dash-sub" style="margin:2px 0 0">Log your deposits or view the group history.</p>
        </div>
        <button class="btn btn-sm btn-gold" id="toggleTxFormBtn">${icon("plus", 15)} Log contribution</button>
      </div>

      <!-- Record Contribution Form -->
      <div id="recordTxFormCard" class="card" style="display:none;margin-bottom:20px">
        <h3 style="font-family:var(--font-display);font-size:16px;margin:0 0 6px">Log a Contribution / Deposit</h3>
        <p class="hint">Records a new contribution under your account or selected member profile.</p>
        <form id="recordTxForm" class="form-grid" style="margin-top:12px">
          <div class="form-row-2">
            <div class="field">
              <span>Member Account</span>
              <div class="field-input">
                <select name="memberId" ${!isAdmin ? 'disabled style="opacity:0.8"' : ''} required>
                  ${activeMembers().map(m => `<option value="${m.id}" ${m.id === member.id ? 'selected' : ''}>${escapeHtml(m.nickname)} (${escapeHtml(m.name)}) ${m.id === member.id ? '— (You)' : ''}</option>`).join("")}
                </select>
                ${!isAdmin ? `<input type="hidden" name="memberId" value="${member.id}" />` : ''}
              </div>
            </div>
            <div class="field">
              <span>Transaction Type</span>
              <div class="field-input">
                <select name="type" required>
                  <option value="contribution">Contribution</option>
                  <option value="penalty_payment">Penalty Payment</option>
                  ${isAdmin ? `<option value="withdrawal">Group Withdrawal (Admin only)</option>` : ''}
                </select>
              </div>
            </div>
          </div>
          <div class="form-row-2">
            <div class="field">
              <span>Amount (KES)</span>
              <div class="field-input">
                <input name="amount" type="number" min="1" value="${member.weeklyAmount}" placeholder="250" required />
              </div>
            </div>
            <div class="field">
              <span>Date</span>
              <div class="field-input">
                <input name="date" type="date" value="${todayISO()}" required />
              </div>
            </div>
          </div>
          <div class="field">
            <span>Note / M-Pesa Reference</span>
            <div class="field-input">
              <input name="note" type="text" placeholder="e.g. Saturday contribution via M-Pesa" />
            </div>
          </div>
          <div id="recordTxMsg"></div>
          <div class="flex gap-8" style="margin-top:6px">
            <button type="submit" class="btn btn-gold btn-sm">${icon("check", 15)} Submit record</button>
            <button type="button" class="btn btn-ghost btn-sm" id="cancelTxFormBtn">Cancel</button>
          </div>
        </form>
      </div>

      <div class="card">
        <div class="table-wrap">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Member</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Note</th>
                ${isAdmin ? '<th>Actions</th>' : ''}
              </tr>
            </thead>
            <tbody>
              ${(DATA.transactions && DATA.transactions.length)
                ? DATA.transactions.slice().sort((a,b) => b.date.localeCompare(a.date)).map(tx => {
                    const m = DATA.members.find(x => x.id === tx.memberId);
                    const name = m ? (m.id === member.id ? `${m.nickname} (You)` : m.nickname) : "Group / External";
                    const typeLabel = tx.type === "contribution" ? "Contribution" : tx.type === "penalty_payment" ? "Penalty Payment" : "Withdrawal";
                    return `
                    <tr data-tx-id="${tx.id}">
                      <td>${fmtDate(tx.date)}</td>
                      <td><strong>${escapeHtml(name)}</strong></td>
                      <td><span class="tx-type-tag ${tx.type}">${typeLabel}</span></td>
                      <td style="font-family:var(--font-mono);font-weight:600">${fmt(tx.amount)}</td>
                      <td style="color:var(--muted);font-size:12.5px">${escapeHtml(tx.note || "—")}</td>
                      ${isAdmin ? `<td><button class="btn btn-xs btn-danger delete-tx-btn">Delete</button></td>` : ''}
                    </tr>`;
                  }).join("")
                : `<tr><td colspan="${isAdmin ? 6 : 5}"><p class="empty-state">No transactions logged yet. Click "Log contribution" above to record a payment.</p></td></tr>`
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Active Members Roster (Client View) -->
    <div id="sec-members" class="section-block">
      <div class="flex items-center justify-between" style="margin-bottom:14px">
        <h2>Group Members Roster (${activeMembers().length})</h2>
        <span class="hint">Automatically updated as new members join</span>
      </div>
      <div class="members-grid">
        ${activeMembers().length ? activeMembers().map((m) => `
          <div class="card member-card ${m.id === member.id ? 'is-self' : ''}">
            <div class="avatar ${m.role === 'admin' ? '' : 'teal'}">${initials(m.nickname)}</div>
            <div>
              <p class="leader-name">
                ${escapeHtml(m.nickname)} <span>&middot; ${escapeHtml(m.name)}</span>
                ${m.id === member.id ? `<span class="badge badge-you">YOU</span>` : ""}
                ${m.role === "admin" ? `<span class="badge badge-admin">ADMIN</span>` : ""}
              </p>
              <p class="member-amt">${fmt(m.weeklyAmount)} / week &middot; Total Contributed ${fmt(memberContribution(m))}</p>
              ${m.penaltyOwed ? `<p class="member-penalty">${fmt(m.penaltyOwed)} penalty owed</p>` : ""}
            </div>
          </div>`).join("") : `<p class="empty-state">No active members registered yet.</p>`}
      </div>
    </div>

    <!-- Meetings Schedule -->
    <div id="sec-meetings" class="section-block">
      <h2>Upcoming Group Meetings</h2>
      <div class="card">
        ${DATA.meetings.length ? DATA.meetings.slice().sort((a, b) => a.date.localeCompare(b.date)).map((m) => `
          <div class="meeting-row">
            <div class="flex items-center gap-12">
              <div class="meeting-date-icon">${icon("calendar", 15)}</div>
              <div>
                <p class="meeting-date">${fmtDate(m.date)}</p>
                <p class="meeting-topic">${escapeHtml(m.topic)}</p>
              </div>
            </div>
            ${icon("chevronRight", 16)}
          </div>`).join("") : `<p class="empty-state">No meetings scheduled.</p>`}
      </div>
    </div>
  `);
}

function metricCard(iconName, label, value, sub, tone) {
  const cls = tone === "up" ? "up" : tone === "down" ? "down" : "";
  return `
  <div class="card metric-card">
    <div class="metric-top"><span>${label}</span>${icon(iconName, 15)}</div>
    <p class="metric-value">${value}</p>
    ${sub ? `<p class="metric-sub ${cls}">${sub}</p>` : ""}
  </div>`;
}

function projectedWeeks(n) {
  const rate = weeklyGroupRate() || DATA.settings.defaultWeeklyAmount;
  return Array.from({ length: n }, (_, i) => ({ label: `Wk ${i + 1}`, value: rate * (i + 1) }));
}
function barChart(data) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return `
  <div class="barchart">
    ${data.map((d) => `<div class="bar-col"><div class="bar" style="height:${Math.max(2, (d.value / max) * 160)}px" title="${d.label}: ${fmt(d.value)}"></div></div>`).join("")}
  </div>
  <div class="barchart-labels">${data.map((d, i) => (i % 3 === 0 ? `<span>${d.label}</span>` : `<span></span>`)).join("")}</div>`;
}
function barChartPL(data) {
  if (!data.length) return `<p class="empty-state">No investments recorded yet.</p>`;
  const max = Math.max(1, ...data.map((d) => Math.abs(d.pl)));
  return `
  <div class="barchart">
    ${data.map((d) => `<div class="bar-col"><div class="bar ${d.pl < 0 ? "neg" : ""}" style="height:${Math.max(2, (Math.abs(d.pl) / max) * 160)}px" title="${d.name}: ${fmt(d.pl)}"></div></div>`).join("")}
  </div>
  <div class="barchart-labels">${data.map((d) => `<span>${escapeHtml(d.name)}</span>`).join("")}</div>`;
}
function positionRow(inv) {
  const pl = Number(inv.current) - Number(inv.invested);
  const up = pl >= 0;
  return `
  <div class="position-row">
    <div>
      <p class="position-name">${escapeHtml(inv.name)}</p>
      <p class="position-meta">Invested ${fmt(inv.invested)} &middot; ${escapeHtml(inv.status)}</p>
    </div>
    <div>
      <p class="position-val">${fmt(inv.current)}</p>
      <p class="position-pl ${up ? "up" : "down"}">${up ? "+" : "-"}${fmt(Math.abs(pl))}</p>
    </div>
  </div>`;
}
function allocationDonut() {
  const cash = cashReserve();
  const segments = [{ name: "Cash Reserve", value: cash, color: "var(--muted-faint)", hex: "#5C6472" }]
    .concat(DATA.investments.map((inv, idx) => ({ name: inv.name, value: Number(inv.current), color: idx % 2 === 0 ? "var(--teal)" : "var(--gold)", hex: idx % 2 === 0 ? "#43E6C4" : "#D4AF37" })));
  const total = Math.max(1, segments.reduce((s, x) => s + x.value, 0));
  let acc = 0;
  const stops = segments.map((s) => {
    const start = (acc / total) * 360;
    acc += s.value;
    const end = (acc / total) * 360;
    return `${s.hex} ${start}deg ${end}deg`;
  }).join(", ");
  return `
  <div class="donut-wrap">
    <div class="donut" style="background:conic-gradient(${stops || "#5C6472 0deg 360deg"})">
      <div class="donut-center-info">
        <span class="donut-center-lbl">PORTFOLIO</span>
        <span class="donut-center-val">${fmt(totalPortfolio())}</span>
      </div>
    </div>
    <div class="donut-legend">
      ${segments.map((s) => `
        <div class="legend-row">
          <span class="name"><span class="dot" style="background:${s.hex}"></span>${escapeHtml(s.name)}</span>
          <span class="val">${fmt(s.value)}</span>
        </div>`).join("")}
    </div>
  </div>`;
}

function dashboardShell(member, activePath, contentHtml) {
  const isAdmin = member.role === "admin";
  return `
  <div class="dash-shell ${activePath === 'admin' ? 'is-admin-mode' : 'is-client-mode'}">
    <div class="sidebar-backdrop" id="sidebarBackdrop"></div>
    <div class="sidebar closed ${isAdmin ? 'has-admin' : ''}" id="sidebar">
      <div style="padding:0 8px 10px">${logoInline()}</div>
      
      <!-- User profile in sidebar -->
      <div class="sidebar-user ${isAdmin ? 'admin-user-card' : ''}">
        <div class="avatar ${isAdmin ? '' : 'teal'}" style="width:30px;height:30px;font-size:11px">${initials(member.nickname)}</div>
        <div>
          <p class="name">${escapeHtml(member.nickname)} ${isAdmin ? `<span class="badge badge-admin">ADMIN</span>` : ""}</p>
          <p class="full">${escapeHtml(member.email)}</p>
        </div>
      </div>

      <!-- Navigation list -->
      <div class="nav-list">
        <a class="nav-item ${activePath === 'dashboard' ? 'active' : ''}" href="#/dashboard">${icon("home", 16)} Member Portal</a>
        <a class="nav-item" href="#/dashboard#sec-investments" data-scroll="sec-investments">${icon("trending", 16)} Group Investments</a>
        <a class="nav-item" href="#/dashboard#sec-transactions" data-scroll="sec-transactions">${icon("history", 16)} Ledger & Deposits</a>
        <a class="nav-item" href="#/dashboard#sec-members" data-scroll="sec-members">${icon("users", 16)} Members Roster</a>
        <a class="nav-item" href="#/dashboard#sec-meetings" data-scroll="sec-meetings">${icon("calendar", 16)} Meetings</a>
        <a class="nav-item" href="#/about">${icon("info", 16)} Constitution & About</a>

        ${isAdmin ? `
          <div class="sidebar-divider">ADMIN MANAGEMENT</div>
          <a class="nav-item admin-link ${activePath === 'admin' ? 'active' : ''}" href="#/admin">
            ${icon("shield", 16)} Admin Control Center
          </a>
        ` : ""}
      </div>

      <div class="sidebar-foot">
        <button class="nav-item" id="logoutBtn">${icon("logout", 16)} Log out</button>
      </div>
    </div>
    <div class="dash-content">${contentHtml}</div>
  </div>`;
}

function logoInline() {
  return `<a href="#/" class="logo">${logoMark(26)}<span class="logo-text">Bankroll Brotherhood</span></a>`;
}

/* ---------------------------------------------------------------------
   ADMIN CONTROL CENTER (Dedicated Admin Management Side)
   --------------------------------------------------------------------- */
function adminTab(path) {
  const parts = path.split("/");
  return parts[2] || "members";
}

function viewAdmin(member, path) {
  const tab = adminTab(path);
  const tabs = [
    ["members", "Members Roster"],
    ["investments", "Manage Investments"],
    ["meetings", "Manage Meetings"],
    ["settings", "Settings & Database Reset"],
  ];
  return dashboardShell(member, "admin", `
    <!-- Distinct Executive Admin Header -->
    <div class="portal-header admin-portal-header">
      <div class="flex items-center justify-between flex-wrap gap-12">
        <div>
          <div class="portal-badge admin">${icon("shield", 13)} EXECUTIVE ADMIN CONTROL CENTER</div>
          <h1 class="dash-h1" style="color:var(--gold)">Administrator Management Suite</h1>
          <p class="dash-sub">Full authority over members, weekly rates, penalty waivers, investments, and database controls.</p>
        </div>
        <div class="flex gap-10 items-center">
          <button class="icon-btn mobile-only" id="sidebarToggle">${icon("menu", 16)}</button>
          <a href="#/dashboard" class="btn btn-sm btn-ghost">${icon("arrowRight", 14)} Return to Member Portal</a>
        </div>
      </div>
    </div>

    <!-- Admin Navigation Tabs -->
    <div class="admin-tab-bar">
      ${tabs.map(([key, label]) => `
        <a href="#/admin/${key}" class="admin-tab-item ${tab === key ? "active" : ""}">
          ${label}
        </a>`).join("")}
    </div>

    <div style="margin-top:20px">
      ${tab === "members" ? adminMembersTab() : ""}
      ${tab === "investments" ? adminInvestmentsTab() : ""}
      ${tab === "meetings" ? adminMeetingsTab() : ""}
      ${tab === "settings" ? adminSettingsTab() : ""}
    </div>
  `);
}

function adminMembersTab() {
  const admins = DATA.members.filter((m) => m.active && m.role === "admin").length;
  return `
  <div class="admin-grid">
    <div class="card admin-form-card">
      <h3>Add New Member</h3>
      <p class="hint">Creates an account for a new member. They will automatically appear in the members roster.</p>
      <form id="addMemberForm" class="form-grid">
        <div class="form-row-2">
          <div class="field"><span>Full name</span><div class="field-input"><input name="name" placeholder="e.g. John Kamau" required /></div></div>
          <div class="field"><span>Nickname</span><div class="field-input"><input name="nickname" placeholder="e.g. Jay" required /></div></div>
        </div>
        <div class="field"><span>Email</span><div class="field-input">${icon("mail", 15)}<input name="email" type="email" placeholder="member@example.com" required /></div></div>
        <div class="field"><span>Temporary password</span><div class="field-input">${icon("lock", 15)}<input name="password" type="password" placeholder="••••••••" required minlength="6" /></div></div>
        <div class="field"><span>Weekly Contribution (KES)</span><div class="field-input"><input name="weeklyAmount" type="number" min="0" value="${DATA.settings.defaultWeeklyAmount}" required /></div></div>
        <div id="addMemberMsg"></div>
        <button type="submit" class="btn btn-gold" style="margin-top:4px">${icon("plus", 16)} Add member to roster</button>
      </form>
    </div>

    <div class="card" style="flex:2 1 460px">
      <div class="flex items-center justify-between" style="margin-bottom:14px">
        <h3 style="font-family:var(--font-display);font-size:16px;margin:0">Registered Members (${DATA.members.length})</h3>
        <span class="status-pill teal">${activeMembers().length} Active / ${DATA.members.length - activeMembers().length} Inactive</span>
      </div>
      <div class="table-wrap">
        <table class="admin-table">
          <thead><tr>
            <th>Member</th><th>Role</th><th>Weekly Rate</th><th>Penalty Owed</th><th>Status</th><th>Actions</th>
          </tr></thead>
          <tbody>
          ${DATA.members.length ? DATA.members.map((m) => `
            <tr data-member-id="${m.id}">
              <td>
                <strong>${escapeHtml(m.nickname)}</strong><br/>
                <span style="color:var(--muted-faint);font-size:11.5px">${escapeHtml(m.email)}</span>
              </td>
              <td><span class="role-tag ${m.role}">${m.role === "admin" ? "ADMIN" : "MEMBER"}</span></td>
              <td>
                <div class="flex gap-8 items-center">
                  <input class="inline-input amount-input" type="number" min="0" value="${m.weeklyAmount}" />
                  <button class="btn btn-xs btn-ghost save-amount-btn" title="Save rate">Save</button>
                </div>
              </td>
              <td>
                <div class="flex gap-8 items-center">
                  <input class="inline-input penalty-input" type="number" min="0" value="${m.penaltyOwed || 0}" />
                  <button class="btn btn-xs btn-ghost save-penalty-btn" title="Save penalty">Save</button>
                  <button class="btn btn-xs btn-ghost waive-penalty-btn" title="Set to 0">Waive</button>
                </div>
              </td>
              <td><span class="status-tag ${m.active ? "active" : "removed"}">${m.active ? "Active" : "Removed"}</span></td>
              <td>
                <div class="row-actions">
                  ${m.active ? `<button class="btn btn-xs btn-ghost toggle-role-btn">${m.role === "admin" ? "Demote" : "Make admin"}</button>` : ""}
                  ${m.active
                    ? `<button class="btn btn-xs btn-danger remove-member-btn">Deactivate</button>`
                    : `<button class="btn btn-xs btn-ghost reactivate-member-btn">Reactivate</button>`}
                  <button class="btn btn-xs btn-danger delete-member-btn" title="Permanently delete record">Delete</button>
                </div>
              </td>
            </tr>`).join("") : `<tr><td colspan="6"><p class="empty-state">No members registered yet. Add a new member on the left.</p></td></tr>`}
          </tbody>
        </table>
      </div>
      <p class="hint" style="margin-top:12px">Currently ${admins} administrator${admins === 1 ? "" : "s"}. At least 1 admin must exist.</p>
    </div>
  </div>`;
}

function adminInvestmentsTab() {
  return `
  <div class="admin-grid">
    <div class="card admin-form-card">
      <h3>Add Group Investment</h3>
      <p class="hint">Record a new asset position purchased with pooled money.</p>
      <form id="addInvestmentForm" class="form-grid">
        <div class="field"><span>Investment Name</span><div class="field-input"><input name="name" placeholder="e.g. Money Market Fund" required /></div></div>
        <div class="form-row-2">
          <div class="field"><span>Amount Invested (KES)</span><div class="field-input"><input name="invested" type="number" min="0" required /></div></div>
          <div class="field"><span>Current Valuation (KES)</span><div class="field-input"><input name="current" type="number" min="0" required /></div></div>
        </div>
        <div class="field"><span>Status</span><div class="field-input"><select name="status"><option>Active</option><option>Matured</option><option>Exited</option></select></div></div>
        <button type="submit" class="btn btn-gold" style="margin-top:4px">${icon("plus", 16)} Add investment</button>
      </form>
    </div>
    <div class="card" style="flex:2 1 460px">
      <h3 style="font-family:var(--font-display);font-size:16px;margin:0 0 14px">Active Investments (${DATA.investments.length})</h3>
      <div class="table-wrap">
        <table class="admin-table">
          <thead><tr><th>Name</th><th>Invested</th><th>Current value</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
          ${DATA.investments.length ? DATA.investments.map((inv) => `
            <tr data-inv-id="${inv.id}">
              <td><strong>${escapeHtml(inv.name)}</strong></td>
              <td><input class="inline-input inv-invested-input" type="number" min="0" value="${inv.invested}" /></td>
              <td><input class="inline-input inv-current-input" type="number" min="0" value="${inv.current}" /></td>
              <td>${escapeHtml(inv.status)}</td>
              <td class="row-actions">
                <button class="btn btn-xs btn-ghost save-inv-btn">Save</button>
                <button class="btn btn-xs btn-danger delete-inv-btn">Delete</button>
              </td>
            </tr>`).join("") : `<tr><td colspan="5"><p class="empty-state">No investments recorded yet.</p></td></tr>`}
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

function adminMeetingsTab() {
  return `
  <div class="admin-grid">
    <div class="card admin-form-card">
      <h3>Schedule Group Meeting</h3>
      <form id="addMeetingForm" class="form-grid">
        <div class="field"><span>Date</span><div class="field-input"><input name="date" type="date" value="${nextSaturday(0)}" required /></div></div>
        <div class="field"><span>Meeting Agenda / Topic</span><div class="field-input"><input name="topic" placeholder="e.g. Monthly contribution review" required /></div></div>
        <button type="submit" class="btn btn-gold" style="margin-top:4px">${icon("plus", 16)} Add meeting</button>
      </form>
    </div>
    <div class="card" style="flex:2 1 460px">
      <h3 style="font-family:var(--font-display);font-size:16px;margin:0 0 14px">Scheduled Meetings (${DATA.meetings.length})</h3>
      ${DATA.meetings.length ? DATA.meetings.slice().sort((a, b) => a.date.localeCompare(b.date)).map((m) => `
        <div class="meeting-row" data-meeting-id="${m.id}">
          <div>
            <p class="meeting-date">${fmtDate(m.date)}</p>
            <p class="meeting-topic">${escapeHtml(m.topic)}</p>
          </div>
          <button class="btn btn-xs btn-danger delete-meeting-btn">Delete</button>
        </div>`).join("") : `<p class="empty-state">No meetings scheduled.</p>`}
    </div>
  </div>`;
}

function adminSettingsTab() {
  const s = DATA.settings;
  return `
  <div class="flex gap-20 flex-wrap align-start">
    <div class="card" style="flex:1 1 360px;max-width:520px">
      <h3 style="font-family:var(--font-display);font-size:16px;margin:0 0 4px">Group Partnership Settings</h3>
      <p class="hint">Applies group-wide. Changing the default rate affects new members joining after this.</p>
      <form id="settingsForm" class="form-grid" style="margin-top:12px">
        <div class="field"><span>Group Name</span><div class="field-input"><input name="groupName" value="${escapeHtml(s.groupName)}" required /></div></div>
        <div class="field"><span>Default Weekly Amount for New Members (KES)</span><div class="field-input"><input name="defaultWeeklyAmount" type="number" min="0" value="${s.defaultWeeklyAmount}" required /></div></div>
        <div class="field"><span>Penalty Rule Description</span><div class="field-input"><input name="penaltyRule" value="${escapeHtml(s.penaltyRule)}" required /></div></div>
        <div id="settingsMsg"></div>
        <button type="submit" class="btn btn-gold" style="margin-top:4px">${icon("check", 16)} Save settings</button>
      </form>
    </div>

    <div class="card" style="flex:1 1 360px;max-width:520px">
      <h3 style="font-family:var(--font-display);font-size:16px;margin:0 0 4px">Data Backup & Recovery</h3>
      <p class="hint">Export complete group data as JSON or restore from a backup file.</p>
      <div class="flex gap-12 flex-wrap" style="margin-top:16px">
        <button class="btn btn-ghost btn-sm" id="exportDataBtn">
          ${icon("download", 15)} Export Backup (JSON)
        </button>
        <label class="btn btn-ghost btn-sm file-input-btn">
          ${icon("upload", 15)} Restore Backup (JSON)
          <input type="file" id="importFileInput" accept=".json" />
        </label>
      </div>
      <div id="backupMsg" style="margin-top:14px"></div>

      <hr style="border:none;border-top:1px solid var(--line);margin:24px 0" />

      <!-- Database Reset Section -->
      <div class="danger-zone-box">
        <h4 style="color:var(--coral);margin:0 0 4px;font-size:14px">${icon("trash", 14)} Clear Database & Start Fresh</h4>
        <p class="hint" style="color:var(--muted)">Wipes all registered members, ledger history, investments, and resets the website so you can start clean.</p>
        <button class="btn btn-danger btn-sm" id="resetDbBtn" style="margin-top:8px">
          ${icon("refresh", 14)} Clear All Database Data
        </button>
      </div>
    </div>
  </div>`;
}

/* ---------------------------------------------------------------------
   Event handlers & bindings
   --------------------------------------------------------------------- */
function bindGlobalHandlers() {
  document.querySelectorAll("[data-goto]").forEach((el) => {
    el.addEventListener("click", () => navigate(el.getAttribute("data-goto")));
  });

  document.querySelectorAll("[data-scroll]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const id = el.getAttribute("data-scroll");
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  const sidebarToggle = document.getElementById("sidebarToggle");
  const sidebar = document.getElementById("sidebar");
  const backdrop = document.getElementById("sidebarBackdrop");

  function closeMobileSidebar() {
    sidebar?.classList.add("closed");
    backdrop?.classList.remove("active");
  }

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", () => {
      const isClosed = sidebar.classList.toggle("closed");
      if (backdrop) {
        if (!isClosed) backdrop.classList.add("active");
        else backdrop.classList.remove("active");
      }
    });
  }

  if (backdrop) {
    backdrop.addEventListener("click", closeMobileSidebar);
  }

  document.querySelectorAll(".sidebar .nav-item").forEach((el) => {
    el.addEventListener("click", closeMobileSidebar);
  });

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      clearSession();
      navigate("/");
    });
  }

  bindAuthForm();
  bindAdminForms();
  bindTransactionHandlers();
  bindBackupHandlers();
}

function bindTransactionHandlers() {
  const toggleBtn = document.getElementById("toggleTxFormBtn");
  const cancelBtn = document.getElementById("cancelTxFormBtn");
  const card = document.getElementById("recordTxFormCard");
  if (toggleBtn && card) {
    toggleBtn.addEventListener("click", () => {
      const isHidden = card.style.display === "none";
      card.style.display = isHidden ? "block" : "none";
    });
  }
  if (cancelBtn && card) {
    cancelBtn.addEventListener("click", () => {
      card.style.display = "none";
    });
  }

  const form = document.getElementById("recordTxForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const memberId = String(fd.get("memberId") || "");
      const type = String(fd.get("type") || "contribution");
      const amount = Number(fd.get("amount") || 0);
      const date = String(fd.get("date") || todayISO());
      const note = String(fd.get("note") || "").trim();

      if (!memberId || amount <= 0) return;

      if (!Array.isArray(DATA.transactions)) DATA.transactions = [];
      DATA.transactions.push({
        id: uid("tx"),
        memberId,
        type,
        amount,
        date,
        note,
      });

      saveData();
      render();
    });
  }

  document.querySelectorAll("tr[data-tx-id]").forEach((row) => {
    const id = row.getAttribute("data-tx-id");
    row.querySelector(".delete-tx-btn")?.addEventListener("click", () => {
      if (!confirm("Delete this transaction record?")) return;
      DATA.transactions = DATA.transactions.filter((t) => t.id !== id);
      saveData();
      render();
    });
  });
}

function bindBackupHandlers() {
  const exportBtn = document.getElementById("exportDataBtn");
  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(DATA, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `bankroll_brotherhood_backup_${todayISO()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      const msg = document.getElementById("backupMsg");
      if (msg) msg.innerHTML = successBox("Backup exported successfully.");
    });
  }

  const importInput = document.getElementById("importFileInput");
  if (importInput) {
    importInput.addEventListener("change", (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result);
          if (!parsed.settings || !Array.isArray(parsed.members)) {
            throw new Error("Invalid backup file format.");
          }
          if (!confirm("Restore backup? This will replace your current data with the backup file.")) return;
          DATA = parsed;
          if (!Array.isArray(DATA.transactions)) DATA.transactions = [];
          if (!Array.isArray(DATA.investments)) DATA.investments = [];
          if (!Array.isArray(DATA.meetings)) DATA.meetings = [];
          saveData();
          render();
          alert("Backup successfully restored!");
        } catch (err) {
          const msg = document.getElementById("backupMsg");
          if (msg) msg.innerHTML = errorBox("Failed to import backup: invalid JSON format.");
        }
      };
      reader.readAsText(file);
    });
  }

  const resetDbBtn = document.getElementById("resetDbBtn");
  if (resetDbBtn) {
    resetDbBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to clear the entire database? All members, ledger records, and investments will be deleted so you can start fresh.")) {
        resetDatabase();
        alert("Database cleared successfully. You can now start again!");
      }
    });
  }
}

function bindAuthForm() {
  const form = document.getElementById("authForm");
  if (!form) return;
  const isLogin = (form.getAttribute("data-mode") || (route() === "/login" ? "login" : "register")) === "login";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const msg = document.getElementById("authMsg");
    const btn = document.getElementById("authSubmitBtn");
    if (msg) msg.innerHTML = "";

    const fd = new FormData(form);
    const email = String(fd.get("email") || "").trim().toLowerCase();
    const password = String(fd.get("password") || "");

    if (!email || !password) {
      if (msg) msg.innerHTML = errorBox("Enter an email and password.");
      return;
    }

    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `<span style="display:inline-flex;animation:spin 0.8s linear infinite">${icon("loader", 16)}</span> Processing…`;
    }

    try {
      const hash = await hashPassword(password);

      if (isLogin) {
        const match = DATA.members.find((m) => m.email.toLowerCase() === email && m.hash === hash);
        if (!match) {
          if (msg) msg.innerHTML = errorBox("Incorrect email or password.");
          if (btn) { btn.disabled = false; btn.innerHTML = `${icon("check", 16)} Log in`; }
          return;
        }
        if (!match.active) {
          if (msg) msg.innerHTML = errorBox("This account has been deactivated. Contact an administrator.");
          if (btn) { btn.disabled = false; btn.innerHTML = `${icon("check", 16)} Log in`; }
          return;
        }
        setSession(match.id);
        navigate("/dashboard");
      } else {
        const name = String(fd.get("name") || "").trim();
        const nickname = String(fd.get("nickname") || "").trim();
        const confirm = String(fd.get("confirm") || "");

        if (!name || !nickname) {
          if (msg) msg.innerHTML = errorBox("Please enter your full name and nickname.");
          if (btn) { btn.disabled = false; btn.innerHTML = `${icon("userCheck", 16)} Create account & join roster`; }
          return;
        }
        if (password !== confirm) {
          if (msg) msg.innerHTML = errorBox("Passwords do not match.");
          if (btn) { btn.disabled = false; btn.innerHTML = `${icon("userCheck", 16)} Create account & join roster`; }
          return;
        }
        if (password.length < 6) {
          if (msg) msg.innerHTML = errorBox("Password must be at least 6 characters.");
          if (btn) { btn.disabled = false; btn.innerHTML = `${icon("userCheck", 16)} Create account & join roster`; }
          return;
        }
        if (DATA.members.some((m) => m.email.toLowerCase() === email)) {
          if (msg) msg.innerHTML = errorBox("That email address is already registered.");
          if (btn) { btn.disabled = false; btn.innerHTML = `${icon("userCheck", 16)} Create account & join roster`; }
          return;
        }

        const isFirst = DATA.members.length === 0;
        const newMember = {
          id: uid("m"),
          name,
          nickname,
          email,
          hash,
          role: isFirst ? "admin" : "member",
          weeklyAmount: Number(DATA.settings.defaultWeeklyAmount || 250),
          penaltyOwed: 0,
          joined: todayISO(),
          active: true,
        };

        DATA.members.push(newMember);
        saveData();
        setSession(newMember.id);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Auth form submission error:", err);
      if (msg) msg.innerHTML = errorBox(err.message || "Something went wrong — please try again.");
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = `${icon("check", 16)} ${isLogin ? "Log in" : "Create account"}`;
      }
    }
  });
}

function errorBox(text) {
  return `<div class="error-box">${icon("alert", 14)} ${escapeHtml(text)}</div>`;
}
function successBox(text) {
  return `<div class="success-box">${icon("check", 14)} ${escapeHtml(text)}</div>`;
}

function bindAdminForms() {
  const addMemberForm = document.getElementById("addMemberForm");
  if (addMemberForm) {
    addMemberForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const msg = document.getElementById("addMemberMsg");
      const fd = new FormData(addMemberForm);
      const email = String(fd.get("email") || "").trim().toLowerCase();
      const name = String(fd.get("name") || "").trim();
      const nickname = String(fd.get("nickname") || "").trim();
      const password = String(fd.get("password") || "");
      const weeklyAmount = Number(fd.get("weeklyAmount") || DATA.settings.defaultWeeklyAmount);

      if (DATA.members.some((m) => m.email.toLowerCase() === email)) {
        msg.innerHTML = errorBox("That email is already registered.");
        return;
      }
      const hash = await hashPassword(password);
      DATA.members.push({
        id: uid("m"), name, nickname, email, hash,
        role: "member", weeklyAmount, penaltyOwed: 0,
        joined: todayISO(), active: true,
      });
      saveData();
      render();
    });
  }

  document.querySelectorAll("tr[data-member-id]").forEach((row) => {
    const id = row.getAttribute("data-member-id");
    const member = DATA.members.find((m) => m.id === id);
    if (!member) return;

    row.querySelector(".save-amount-btn")?.addEventListener("click", () => {
      const val = Number(row.querySelector(".amount-input").value || 0);
      member.weeklyAmount = Math.max(0, val);
      saveData(); render();
    });
    row.querySelector(".save-penalty-btn")?.addEventListener("click", () => {
      const val = Number(row.querySelector(".penalty-input").value || 0);
      member.penaltyOwed = Math.max(0, val);
      saveData(); render();
    });
    row.querySelector(".waive-penalty-btn")?.addEventListener("click", () => {
      member.penaltyOwed = 0;
      saveData(); render();
    });
    row.querySelector(".toggle-role-btn")?.addEventListener("click", () => {
      const admins = DATA.members.filter((m) => m.active && m.role === "admin");
      if (member.role === "admin" && admins.length <= 1) {
        alert("At least one administrator must remain. Promote another member first.");
        return;
      }
      member.role = member.role === "admin" ? "member" : "admin";
      saveData(); render();
    });
    row.querySelector(".remove-member-btn")?.addEventListener("click", () => {
      const admins = DATA.members.filter((m) => m.active && m.role === "admin");
      if (member.role === "admin" && admins.length <= 1) {
        alert("At least one administrator must remain. Promote another member before removing this one.");
        return;
      }
      if (!confirm(`Deactivate ${member.nickname}'s account? They won't be able to log in, but historical data is preserved.`)) return;
      member.active = false;
      const sess = getSession();
      if (sess && sess.memberId === member.id) clearSession();
      saveData(); render();
    });
    row.querySelector(".reactivate-member-btn")?.addEventListener("click", () => {
      member.active = true;
      saveData(); render();
    });
    row.querySelector(".delete-member-btn")?.addEventListener("click", () => {
      const admins = DATA.members.filter((m) => m.active && m.role === "admin");
      if (member.role === "admin" && member.active && admins.length <= 1) {
        alert("At least one administrator must remain.");
        return;
      }
      if (!confirm(`Permanently delete ${member.nickname}'s account record? This cannot be undone.`)) return;
      DATA.members = DATA.members.filter((m) => m.id !== id);
      const sess = getSession();
      if (sess && sess.memberId === id) clearSession();
      saveData(); render();
    });
  });

  const addInvestmentForm = document.getElementById("addInvestmentForm");
  if (addInvestmentForm) {
    addInvestmentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(addInvestmentForm);
      DATA.investments.push({
        id: uid("inv"),
        name: String(fd.get("name") || "").trim(),
        invested: Number(fd.get("invested") || 0),
        current: Number(fd.get("current") || 0),
        status: String(fd.get("status") || "Active"),
      });
      saveData(); render();
    });
  }
  document.querySelectorAll("tr[data-inv-id]").forEach((row) => {
    const id = row.getAttribute("data-inv-id");
    const inv = DATA.investments.find((i) => i.id === id);
    if (!inv) return;
    row.querySelector(".save-inv-btn")?.addEventListener("click", () => {
      inv.invested = Number(row.querySelector(".inv-invested-input").value || 0);
      inv.current = Number(row.querySelector(".inv-current-input").value || 0);
      saveData(); render();
    });
    row.querySelector(".delete-inv-btn")?.addEventListener("click", () => {
      if (!confirm(`Delete "${inv.name}"?`)) return;
      DATA.investments = DATA.investments.filter((i) => i.id !== id);
      saveData(); render();
    });
  });

  const addMeetingForm = document.getElementById("addMeetingForm");
  if (addMeetingForm) {
    addMeetingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(addMeetingForm);
      DATA.meetings.push({
        id: uid("mt"),
        date: String(fd.get("date") || todayISO()),
        topic: String(fd.get("topic") || "").trim(),
      });
      saveData(); render();
    });
  }
  document.querySelectorAll("[data-meeting-id]").forEach((row) => {
    const id = row.getAttribute("data-meeting-id");
    row.querySelector(".delete-meeting-btn")?.addEventListener("click", () => {
      DATA.meetings = DATA.meetings.filter((m) => m.id !== id);
      saveData(); render();
    });
  });

  const settingsForm = document.getElementById("settingsForm");
  if (settingsForm) {
    settingsForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(settingsForm);
      DATA.settings.groupName = String(fd.get("groupName") || "").trim() || DATA.settings.groupName;
      DATA.settings.defaultWeeklyAmount = Number(fd.get("defaultWeeklyAmount") || DATA.settings.defaultWeeklyAmount);
      DATA.settings.penaltyRule = String(fd.get("penaltyRule") || "").trim() || DATA.settings.penaltyRule;
      saveData();
      const msg = document.getElementById("settingsMsg");
      if (msg) msg.innerHTML = successBox("Settings saved.");
    });
  }
}

/* Initial render */
render();
