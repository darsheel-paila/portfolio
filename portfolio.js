const icons = ["fa-cog", "fa-code", "fa-paintbrush"];
const container = document.querySelector(".background-icons");
const pageHeight = document.documentElement.scrollHeight;

function spawnIcon() {
  const icon = document.createElement("i");
  icon.className = `fa-solid ${icons[Math.floor(Math.random() * icons.length)]}`;

  // random X and size
  icon.style.left = Math.random() * 100 + "vw";
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
      icon.style.left = Math.random() * 100 + "vw"; // new horizontal position
    }

    requestAnimationFrame(floatUp);
  }

  floatUp();
}

// spawn multiple icons
for (let i = 0; i < 30; i++) {
  spawnIcon();
}

//image flexbox gallery

  const images = document.querySelectorAll('.image');

images.forEach(img => {
  // find the parent section for this image
  const section = img.closest('.section');
  
  // get the text area inside this section
  const titleEl = section.querySelector('.text h1');
  const descEl  = section.querySelector('.text p');

  // save originals for this section
  const originalTitle = titleEl.textContent;
  const originalDesc  = descEl.textContent;

  // update on hover
  img.addEventListener('mouseenter', () => {
    titleEl.textContent = img.dataset.title;
    descEl.textContent  = img.dataset.desc;
  });

  // restore when leaving
  img.addEventListener('mouseleave', () => {
    titleEl.textContent = originalTitle;
    descEl.textContent  = originalDesc;
  });
});

//doc height

    document.documentElement.style.setProperty(
  '--page-height',
  `${document.documentElement.scrollHeight}px`
);
