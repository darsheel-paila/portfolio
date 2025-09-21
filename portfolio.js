const icons = [
      "fa-cog", "fa-robot", "fa-code", "fa-paintbrush", 
      "fa-bolt", "fa-gears", "fa-wrench",
      "fa-rocket", "fa-compass"
    ];

    const container = document.querySelector(".background-icons");

    for (let i = 0; i < 30; i++) { // change 30 to more or less
      const icon = document.createElement("i");
      icon.className = `fa-solid ${icons[Math.floor(Math.random() * icons.length)]}`;

      // random position, size, speed, and delay
      icon.style.left = Math.random() * 104 + "vw";
      icon.style.fontSize = 30 + Math.random() * 10 + "px";
      icon.style.animationDuration = 10 + Math.random() * 20 + "s";
      icon.style.animationDelay = Math.random() * 20 + "s";
      icon.style.color = "rgba(255,255,255,0.2)";

      container.appendChild(icon);
    }