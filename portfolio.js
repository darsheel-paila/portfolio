// Select all section headings and paragraphs
  const fadeElements = document.querySelectorAll('.sections div h1, .sections div p');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view'); // trigger fade-in
      }
    });
  }, { threshold: 0.2 }); // trigger when 20% visible

  fadeElements.forEach(el => observer.observe(el));
