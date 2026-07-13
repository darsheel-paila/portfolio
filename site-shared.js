function renderNavbar(activePage) {
  const isHome = activePage === "home";
  const isProjects = activePage === "projects" || activePage === "project";

  return `
    <nav id="navbar">
      <div class="nav-container">
        <ul class="nav-left">
          <li id="logo"><a href="index.html"><img src="images/Asset 1.svg" style="width: 40px; margin-right: 10px;" alt="Home"></a></li>
          <li><a href="index.html#banner" class="${isHome ? "nav-active" : ""}">home</a></li>
          <li><a href="projects.html" class="${isProjects ? "nav-active" : ""}">work</a></li>
          <li><a href="index.html#ab">about</a></li>
          <li><a href="index.html#cm">contact</a></li>
        </ul>
        <ul class="nav-right">
          <li><a href="mailto:darsheelpaila@gmail.com"><i class="fa-solid fa-envelope fa-2xl"></i></a></li>
          <li><a href="https://github.com/darsheel-paila" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github fa-2xl"></i></a></li>
          <li><a href="https://www.instagram.com/darsheelpaila" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-instagram fa-2xl"></i></a></li>
          <li><a href="https://www.linkedin.com/in/darsheel-paila-9b2893376/" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-linkedin fa-2xl"></i></a></li>
        </ul>
      </div>
    </nav>
  `;
}

function injectNavbar(activePage) {
  const placeholder = document.getElementById("navbar-placeholder");
  if (placeholder) {
    placeholder.outerHTML = renderNavbar(activePage);
  }
}

function renderPageBackdrop() {
  return `
    <div id="page-backdrop" aria-hidden="true">
      <img src="images/Asset 3.png" alt="">
    </div>
  `;
}

function injectPageBackdrop() {
  const placeholder = document.getElementById("backdrop-placeholder");
  if (placeholder) {
    placeholder.outerHTML = renderPageBackdrop();
  }
}
