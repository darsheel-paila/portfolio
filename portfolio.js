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
const container = document.querySelector(".background-icons");
const pageHeight = document.documentElement.scrollHeight;

function spawnIcon() {
  const icon = document.createElement("i");
  icon.className = `fa-solid ${icons[Math.floor(Math.random() * icons.length)]}`;

  // random X and size
  icon.style.left = Math.random() * 92 + "vw";
  icon.style.fontSize = 40 + Math.random() * 20 + "px";
  icon.style.color = "rgba(255, 255, 255, 0.8)";

  // random start Y (some above, some mid, some at bottom)
  let y = Math.random() * pageHeight;
  icon.style.top = y + "px";

  container.appendChild(icon);

  // floating loop
  function floatUp() {
    y -= 1; // speed: adjust pixels per frame
    icon.style.top = y + "px";
    icon.style.transform = `rotate(${y % 360}deg)`;

    if (y < -100) {
      // reset when offscreen
      y = pageHeight + 100;
      icon.style.left = Math.random() * 95 + "vw"; // new horizontal position
    }

    requestAnimationFrame(floatUp);
  }

  floatUp();
}

// spawn multiple icons
for (let i = 0; i < 30; i++) {
  spawnIcon();
}

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
}

function clearProject() {
  projects.forEach((p) => p.classList.remove("is-active"));
  detailPanel.classList.remove("is-filled");
  detailEmpty.hidden = false;
  detailContent.hidden = true;
}

projects.forEach((project) => {
  project.addEventListener("mouseenter", () => showProject(project));
  project.addEventListener("focusin", () => showProject(project));
  project.addEventListener("click", () => showProject(project));
  project.setAttribute("tabindex", "0");
});

document.querySelector(".projects-workspace")?.addEventListener("mouseleave", clearProject);

//doc height
document.documentElement.style.setProperty(
  "--page-height",
  `${document.documentElement.scrollHeight}px`
);
