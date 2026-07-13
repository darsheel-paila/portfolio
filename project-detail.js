function getProjectSlug() {
  const params = new URLSearchParams(window.location.search);
  return params.get("p");
}

function renderProjectPage(project) {
  document.title = `${project.title} - Darsheel Paila`;

  const titleText = document.getElementById("project-title-text");
  const heroImg = document.getElementById("project-hero-img");
  const contentEl = document.getElementById("project-content");
  const supplementalEl = document.getElementById("project-supplemental");

  if (titleText) titleText.textContent = project.title;
  if (heroImg) {
    heroImg.src = project.image;
    heroImg.alt = project.alt;
  }

  if (contentEl) {
    contentEl.innerHTML = `
      <p class="project-lead">${project.shortDesc}</p>
      ${project.sections
        .map(
          (section) => `
        <section class="project-section">
          <h3>${section.heading}</h3>
          <p>${section.body}</p>
        </section>
      `
        )
        .join("")}
    `;
  }

  if (supplementalEl) {
    if (project.supplemental) {
      supplementalEl.hidden = false;
      supplementalEl.innerHTML = `
        <section class="project-supplemental-section">
          <div class="project-supplemental-text">
            <h3>${project.supplemental.heading}</h3>
            <p>${project.supplemental.body}</p>
          </div>
          ${
            project.supplemental.media
              ? `<div class="project-supplemental-media"><img src="${project.supplemental.media.src}" alt="${project.supplemental.media.alt}"></div>`
              : ""
          }
        </section>
      `;
    } else {
      supplementalEl.hidden = true;
      supplementalEl.innerHTML = "";
    }
  }

  renderProjectDropdown(project.id);
  updateArrowLinks(project.id);
}

function renderProjectDropdown(currentId) {
  const dropdown = document.getElementById("project-dropdown");
  if (!dropdown) return;

  dropdown.innerHTML = PROJECTS.map(
    (p) => `
    <li>
      <a href="project.html?p=${p.id}" class="${p.id === currentId ? "is-current" : ""}">
        ${p.title}
      </a>
    </li>
  `
  ).join("");
}

function updateArrowLinks(currentId) {
  const prev = getAdjacentProject(currentId, -1);
  const next = getAdjacentProject(currentId, 1);
  const prevBtn = document.getElementById("prev-project");
  const nextBtn = document.getElementById("next-project");

  if (prevBtn && prev) {
    prevBtn.href = `project.html?p=${prev.id}`;
    prevBtn.setAttribute("aria-label", `Previous project: ${prev.title}`);
  }
  if (nextBtn && next) {
    nextBtn.href = `project.html?p=${next.id}`;
    nextBtn.setAttribute("aria-label", `Next project: ${next.title}`);
  }
}

function initProjectDropdown() {
  const toggle = document.getElementById("project-title-btn");
  const dropdown = document.getElementById("project-dropdown");
  if (!toggle || !dropdown) return;

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = dropdown.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen);
    dropdown.hidden = !isOpen;
  });

  document.addEventListener("click", () => {
    dropdown.classList.remove("is-open");
    dropdown.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
  });

  dropdown.addEventListener("click", (e) => e.stopPropagation());
}

function initProjectNavigation() {
  document.addEventListener("keydown", (e) => {
    const slug = getProjectSlug();
    if (!slug) return;

    if (e.key === "ArrowLeft") {
      const prev = getAdjacentProject(slug, -1);
      if (prev) window.location.href = `project.html?p=${prev.id}`;
    } else if (e.key === "ArrowRight") {
      const next = getAdjacentProject(slug, 1);
      if (next) window.location.href = `project.html?p=${next.id}`;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initProjectPage();
});

function initProjectPage() {
  const slug = getProjectSlug();
  const project = getProjectById(slug);

  if (!project) {
    window.location.replace(`project.html?p=${PROJECTS[0].id}`);
    return;
  }

  renderProjectPage(project);
  initProjectDropdown();
  initProjectNavigation();
}
