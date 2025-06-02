// Main JavaScript file for BahasaKu

document.addEventListener('DOMContentLoaded', function() {
  // Only run if we're on a page that has these elements
  const categorySelect = document.getElementById('category-select');
  const flashcardsContainer = document.getElementById('flashcards-container');

  if (categorySelect && flashcardsContainer) {
    // Load idioms data
    fetch('js/idioms.json')
      .then(response => response.json())
      .then(data => {
        // Populate category dropdown
        Object.keys(data).forEach(category => {
          const option = document.createElement('option');
          option.value = category;
          option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
          categorySelect.appendChild(option);
        });

        // Add event listener for category selection
        categorySelect.addEventListener('change', function() {
          const selectedCategory = this.value;
          if (selectedCategory && data[selectedCategory]) {
            displayFlashcards(data[selectedCategory]);
          }
        });
      })
      .catch(error => console.error('Error loading idioms:', error));
  }

  // Function to display flashcards
  function displayFlashcards(idioms) {
    if (!flashcardsContainer) return;

    flashcardsContainer.innerHTML = '';
    idioms.forEach((idiom, index) => {
      const card = document.createElement('div');
      card.className = 'flashcard';
      card.innerHTML = `
        <div class="flashcard-front">
          <h3>${idiom.idiom}</h3>
        </div>
        <div class="flashcard-back">
          <p><strong>Meaning:</strong> ${idiom.meaning}</p>
          <p><strong>Example:</strong> ${idiom.example}</p>
        </div>
      `;

      card.addEventListener('click', function() {
        this.classList.toggle('flipped');
      });

      flashcardsContainer.appendChild(card);
    });
  }
});