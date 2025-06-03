// Main JavaScript file for BahasaKu

// Global variables for flashcards
let currentIdioms = [];
let currentIndex = 0;
let isFlipped = false;

// Add event listeners only if elements exist
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on a page with flashcard functionality
  const flipButton = document.getElementById('flip-btn');
  const nextButton = document.getElementById('next-btn');
  const prevButton = document.getElementById('prev-btn');
  const backButton = document.getElementById('back-btn');

  if (flipButton) {
    flipButton.addEventListener('click', flipCard);
  }

  if (nextButton) {
    nextButton.addEventListener('click', nextCard);
  }

  if (prevButton) {
    prevButton.addEventListener('click', previousCard);
  }

  if (backButton) {
    backButton.addEventListener('click', goBack);
  }

  // Add keyboard event listeners for flashcards page
  if (window.location.pathname.includes('flashcards.html')) {
    document.addEventListener('keydown', handleKeyPress);
  }

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

  // Initialize flashcards if on flashcards page
  if (window.location.pathname.includes('flashcards.html')) {
    initializeFlashcards();
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

function initializeFlashcards() {
  // Get category from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');
  
  if (category) {
    // Load idioms for the specific category
    fetch('js/idioms.json')
      .then(response => response.json())
      .then(data => {
        // Find the category in the data
        const categoryData = data.categories.find(cat => 
          cat.name.toLowerCase().replace(/\s+/g, '').includes(category) ||
          category === 'emotions' && cat.name.includes('Emotions') ||
          category === 'work' && cat.name.includes('Work') ||
          category === 'relationships' && cat.name.includes('Relationships') ||
          category === 'nature' && cat.name.includes('Nature') ||
          category === 'success' && cat.name.includes('Success') ||
          category === 'wisdom' && cat.name.includes('Wisdom') ||
          category === 'challenges' && cat.name.includes('Challenges') ||
          category === 'miscellaneous' && cat.name.includes('Miscellaneous')
        );
        
        if (categoryData) {
          currentIdioms = categoryData.idioms;
          document.getElementById('category-title').textContent = categoryData.name;
          displayCurrentCard();
        }
      })
      .catch(error => console.error('Error loading idioms:', error));
  }
}

function displayCurrentCard() {
  if (currentIdioms.length === 0) return;

  const idiom = currentIdioms[currentIndex];
  const idiomText = document.getElementById('idiom-text');
  const translationText = document.getElementById('translation-text');

  if (!idiomText || !translationText) return;

  // Reset card state
  isFlipped = false;
  idiomText.textContent = idiom.idiom;
  translationText.classList.add('d-none');
  translationText.innerHTML = `
    <strong>Translation:</strong> ${idiom.translation}<br>
    <strong>Explanation:</strong> ${idiom.explanation}<br>
    <strong>Example (BM):</strong> ${idiom.example.BM}<br>
    <strong>Example (English):</strong> ${idiom.example.English}
  `;
}

function flipCard() {
  const idiomText = document.getElementById('idiom-text');
  const translationText = document.getElementById('translation-text');

  if (!idiomText || !translationText) return;

  if (!isFlipped) {
    idiomText.classList.add('d-none');
    translationText.classList.remove('d-none');
    isFlipped = true;
  } else {
    idiomText.classList.remove('d-none');
    translationText.classList.add('d-none');
    isFlipped = false;
  }
}

function nextCard() {
  if (currentIdioms.length === 0) return;

  currentIndex = (currentIndex + 1) % currentIdioms.length;
  displayCurrentCard();
}

function previousCard() {
  if (currentIdioms.length === 0) return;

  currentIndex = currentIndex === 0 ? currentIdioms.length - 1 : currentIndex - 1;
  displayCurrentCard();
}

function goBack() {
  window.history.back();
}

function handleKeyPress(event) {
  switch(event.code) {
    case 'Space':
      event.preventDefault();
      flipCard();
      break;
    case 'ArrowLeft':
      event.preventDefault();
      previousCard();
      break;
    case 'ArrowRight':
      event.preventDefault();
      nextCard();
      break;
  }
}