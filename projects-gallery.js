function renderProjectsGallery() {
  const list = document.querySelector(".projects-list");
  if (!list) return;

  PROJECTS.forEach((project) => {
    const article = document.createElement("article");
    article.className = "project-card";
    article.innerHTML = `
      <a href="project.html?p=${project.id}" class="project-card-link">
        <div class="project-card-text">
          <h3 class="project-card-title">${project.title}</h3>
          <p class="project-card-desc">${project.shortDesc}</p>
        </div>
        <span class="project-card-arrow" aria-hidden="true"><i class="fa-solid fa-arrow-right"></i></span>
      </a>
    `;
    list.appendChild(article);
  });
}

renderProjectsGallery();
