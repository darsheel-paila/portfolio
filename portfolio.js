const icons = [
      "fa-cog", "fa-code", "fa-paintbrush", 
    ];

    const container = document.querySelector(".background-icons");

    for (let i = 0; i < 30; i++) { // change 30 to more or less
      const icon = document.createElement("i");
      icon.className = `fa-solid ${icons[Math.floor(Math.random() * icons.length)]}`;

      // random position, size, speed, and delay
      icon.style.left = Math.random() * 100 + "vw";
      icon.style.fontSize = 30 + Math.random() * 10 + "px";
      icon.style.animationDuration = 30 + Math.random() * 20 + "s";
      icon.style.animationDelay = Math.random() * 20 + "s";
      icon.style.color = "rgba(255, 255, 255, 0.5)";

      container.appendChild(icon);
    }

//image flexbox gallery

    const images = document.querySelectorAll('.image');
    const titleEl = document.getElement('data-title');
    const descEl = document.getElement('data-desc');

    images.forEach(img => {
      img.addEventListener('mouseenter', () => {
        titleEl.textContent = img.dataset.title;
        descEl.textContent = img.dataset.desc;
      });

      img.addEventListener('mouseleave', () => {
        titleEl.textContent = "Hover over a project";
        descEl.textContent = "The description will appear here.";
      });
    });
