// Always start at the top on refresh; Home scrolls to top as well
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

function scrollToTop(smooth = false) {
  window.scrollTo({ top: 0, left: 0, behavior: smooth ? "smooth" : "auto" });
}

scrollToTop(false);

window.addEventListener("pageshow", () => scrollToTop(false));

document.querySelector('a[href="#banner"]')?.addEventListener("click", (e) => {
  e.preventDefault();
  scrollToTop(true);
  history.replaceState(null, "", window.location.pathname + window.location.search);
});

const icons = ["fa-gear", "fa-code", "fa-paintbrush", "fa-palette", "fa-recycle", "fa-microchip"];

let sceneFrozen = false;

function setTimeFreeze(active) {
  sceneFrozen = active;
  document.documentElement.classList.toggle("time-freeze", active);
}

const iconField = document.createElement("div");
iconField.id = "bg-icon-field";
iconField.setAttribute("aria-hidden", "true");
document.getElementById("page-backdrop")?.insertAdjacentElement("afterend", iconField);

const pageBackdrop = document.getElementById("page-backdrop");

function syncPageLayers() {
  const footer = document.querySelector(".bottombar");
  const height = footer
    ? footer.offsetTop + footer.offsetHeight
    : document.documentElement.scrollHeight;
  const h = `${height}px`;
  iconField.style.height = h;
  if (pageBackdrop) pageBackdrop.style.height = h;
}

function documentSize() {
  syncPageLayers();
  return {
    width: iconField.clientWidth || window.innerWidth,
    height: iconField.clientHeight || window.innerHeight,
  };
}

function spawnIcon() {
  const icon = document.createElement("i");
  icon.className = `fa-solid ${icons[Math.floor(Math.random() * icons.length)]} bg-icon`;

  const size = 40 + Math.random() * 20;
  icon.style.fontSize = `${size}px`;
  icon.style.color = "rgba(255, 255, 255, 0.8)";

  iconField.appendChild(icon);

  const iconSize = size * 1.15;
  const { width, height } = documentSize();
  const state = {
    x: Math.random() * Math.max(width - iconSize, 0),
    y: Math.random() * Math.max(height - iconSize, 0),
    vx: (Math.random() > 0.5 ? 1 : -1) * (0.45 + Math.random() * 0.75),
    vy: (Math.random() > 0.5 ? 1 : -1) * (0.45 + Math.random() * 0.75),
    rotation: Math.random() * 360,
    spin: (Math.random() > 0.5 ? 1 : -1) * (0.25 + Math.random() * 0.45),
    iconSize,
  };

  function bounds() {
    const { width, height } = documentSize();
    return {
      maxX: Math.max(width - state.iconSize, 0),
      maxY: Math.max(height - state.iconSize, 0),
    };
  }

  function setPosition() {
    icon.style.left = `${state.x}px`;
    icon.style.top = `${state.y}px`;
    icon.style.transform = `rotate(${state.rotation}deg)`;
  }

  function bounce() {
    if (!sceneFrozen) {
      const { maxX, maxY } = bounds();

      state.x += state.vx;
      state.y += state.vy;
      state.rotation += state.spin;

      if (state.x <= 0) {
        state.x = 0;
        state.vx = Math.abs(state.vx);
      } else if (state.x >= maxX) {
        state.x = maxX;
        state.vx = -Math.abs(state.vx);
      }

      if (state.y <= 0) {
        state.y = 0;
        state.vy = Math.abs(state.vy);
      } else if (state.y >= maxY) {
        state.y = maxY;
        state.vy = -Math.abs(state.vy);
      }

      setPosition();
    }

    requestAnimationFrame(bounce);
  }

  setPosition();
  bounce();
}

syncPageLayers();
for (let i = 0; i < 30; i++) {
  spawnIcon();
}

window.addEventListener("resize", syncPageLayers);
window.addEventListener("load", syncPageLayers);

// Project mosaic — show detail beside image on highlight
const projects = document.querySelectorAll(".project");
const detailPanel = document.querySelector(".project-detail");
const detailEmpty = document.querySelector(".project-detail-empty");
const detailContent = document.querySelector(".project-detail-content");
const detailImg = document.querySelector(".project-detail-img");
const detailTitle = document.querySelector(".project-detail-title");
const detailDesc = document.querySelector(".project-detail-desc");

function showProject(project) {
  const img = project.querySelector("img");
  if (!img) return;

  projects.forEach((p) => p.classList.remove("is-active"));
  project.classList.add("is-active");

  detailPanel.classList.add("is-filled");
  detailEmpty.hidden = true;
  detailContent.hidden = false;

  detailImg.src = img.src;
  detailImg.alt = img.alt;
  detailTitle.textContent = project.dataset.title || img.alt;
  detailDesc.textContent = project.dataset.desc || "";
  setTimeFreeze(true);
}

function clearProject() {
  projects.forEach((p) => p.classList.remove("is-active"));
  detailPanel.classList.remove("is-filled");
  detailEmpty.hidden = false;
  detailContent.hidden = true;
  setTimeFreeze(false);
}

projects.forEach((project) => {
  project.addEventListener("mouseenter", () => showProject(project));
  project.addEventListener("focusin", () => showProject(project));
  project.addEventListener("click", () => showProject(project));
  project.setAttribute("tabindex", "0");
});

document.querySelector(".projects-workspace")?.addEventListener("mouseleave", clearProject);

document.getElementById("message-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const statusEl = document.getElementById("form-status");
  const submitBtn = form.querySelector('button[type="submit"]');

  if (form._honey.value.trim()) {
    return;
  }

  const name = form.name.value.trim();
  const payload = {
    name,
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    message: form.message.value.trim(),
    _subject: `Portfolio inquiry from ${name}`,
    _template: "table",
    _captcha: "false",
  };

  submitBtn.disabled = true;
  statusEl.textContent = "Sending…";
  statusEl.className = "form-status";

  try {
    const response = await fetch("https://formsubmit.co/ajax/darsheelpaila@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Unable to send message.");
    }

    statusEl.textContent = "Message sent! I'll get back to you soon :D";
    statusEl.className = "form-status form-status--success";
    form.reset();
  } catch {
    statusEl.textContent =
      "Something went wrong. Try emailing me directly at darsheelpaila@gmail.com.";
    statusEl.className = "form-status form-status--error";
  } finally {
    submitBtn.disabled = false;
  }
});

// Match hover accent to background gradient by vertical position
const ACCENT_DEFAULT = "rgb(235, 95, 45)";
const ACCENT_TRANSITION_MS = 300;
let accentResetTimer = null;
const BG_ACCENT_STOPS = [
  { t: 0, r: 186, g: 72, b: 168 },
  { t: 0.28, r: 215, g: 55, b: 95 },
  { t: 0.52, r: 235, g: 95, b: 45 },
  { t: 0.76, r: 248, g: 150, b: 38 },
  { t: 1, r: 255, g: 205, b: 55 },
];

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function accentAtRatio(ratio) {
  const clamped = Math.min(1, Math.max(0, ratio));

  for (let i = 0; i < BG_ACCENT_STOPS.length - 1; i++) {
    const start = BG_ACCENT_STOPS[i];
    const end = BG_ACCENT_STOPS[i + 1];

    if (clamped >= start.t && clamped <= end.t) {
      const local = (clamped - start.t) / (end.t - start.t);
      const r = Math.round(lerp(start.r, end.r, local));
      const g = Math.round(lerp(start.g, end.g, local));
      const b = Math.round(lerp(start.b, end.b, local));
      return `rgb(${r}, ${g}, ${b})`;
    }
  }

  const last = BG_ACCENT_STOPS[BG_ACCENT_STOPS.length - 1];
  return `rgb(${last.r}, ${last.g}, ${last.b})`;
}

function verticalRatioForElement(el) {
  const rect = el.getBoundingClientRect();
  const centerY = rect.top + rect.height / 2 + window.scrollY;
  const pageHeight = document.documentElement.scrollHeight || window.innerHeight;
  return centerY / pageHeight;
}

function setAccentFromElement(el) {
  document.documentElement.style.setProperty("--accent", accentAtRatio(verticalRatioForElement(el)));
}

function scheduleAccentReset() {
  clearTimeout(accentResetTimer);
  accentResetTimer = setTimeout(() => {
    document.documentElement.style.setProperty("--accent", ACCENT_DEFAULT);
  }, ACCENT_TRANSITION_MS);
}

function cancelAccentReset() {
  clearTimeout(accentResetTimer);
}

document
  .querySelectorAll(".nav-left a, .contact-links a, .bottombar-col a, .nav-right li a")
  .forEach((link) => {
    link.addEventListener("mouseenter", () => {
      cancelAccentReset();
      setAccentFromElement(link);
    });
    link.addEventListener("mouseleave", scheduleAccentReset);
    link.addEventListener("focus", () => {
      cancelAccentReset();
      setAccentFromElement(link);
    });
    link.addEventListener("blur", scheduleAccentReset);
  });
