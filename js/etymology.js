// Toggle language sections
document.querySelectorAll('.language-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const content = document.getElementById(button.getAttribute('aria-controls'));
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', !isExpanded);
      content.style.display = isExpanded ? 'none' : 'block';
    });
  });