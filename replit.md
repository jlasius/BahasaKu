# BahasaKu - Malay Language Learning Platform

## Overview

BahasaKu is a static educational website focused on teaching the Malay language (Bahasa Malaysia) through cultural immersion. The platform provides interactive learning tools including idiom flashcards, etymology exploration, grammar guides (affixes/imbuhan), and cultural insights about Malaysia. The project is designed as a GitHub Pages-hosted static site with client-side JavaScript for interactivity.

**Primary Purpose**: Enable learners to master Malay language through idioms (peribahasa), word origins, grammar patterns, and cultural context rather than traditional vocabulary-focused approaches.

**Target Audience**: Language learners interested in Malay/Bahasa Malaysia, particularly those who value cultural and etymological understanding.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack**:
- **Pure HTML5/CSS3/JavaScript** - No framework dependencies, fully static implementation
- **Client-side rendering only** - All content loaded and manipulated via vanilla JavaScript
- **Responsive design** - Mobile-first approach using CSS flexbox/grid

**Page Structure**:
- Multi-page architecture with dedicated HTML files for each section:
  - `index.html` - Landing page/home
  - `idioms.html` - Categorized idiom browsing
  - `flashcards.html` - Interactive flashcard learning interface
  - `glossary.html` - Alphabetical idiom reference
  - `etymology.html` - Word origin exploration
  - `imbuhan.html` - Malay affixes grammar guide
  - `malaysia.html` - Cultural background and travel information
  - `about.html` - Project information

**JavaScript Organization**:
- `js/main.js` - Core flashcard functionality, navigation handling, event listeners
- `js/etymology.js` - Toggle functionality for etymology sections
- `js/idioms.json` - Data store for idioms organized by emotional/thematic categories

**CSS Organization**:
- `css/styles.css` - Main stylesheet with global styles
- `css/etymology.css` - Etymology-specific styling
- `styles.css` - Root-level styles (appears duplicative, may need consolidation)

**Design Decisions**:
- **No build process** - Direct file serving for simplicity and GitHub Pages compatibility
- **JSON data files** - Idioms stored as structured JSON for easy updates and programmatic access
- **Event-driven interactivity** - DOM manipulation for flashcard flipping, category filtering, content toggling
- **Keyboard navigation support** - Accessibility feature for flashcard navigation

**Rationale**: Static architecture chosen for zero hosting costs, maximum portability, and minimal maintenance overhead. No backend needed as content is primarily educational reference material.

### Content Management

**Data Architecture**:
- Idioms stored in `js/idioms.json` with structure:
  ```json
  {
    "categories": [
      {
        "name": "Category Name",
        "idioms": [
          {
            "idiom": "Malay phrase",
            "translation": "English translation",
            "explanation": "Detailed meaning",
            "example": {
              "BM": "Bahasa Malaysia example",
              "English": "English example"
            }
          }
        ]
      }
    ]
  }
  ```

**Content Update Pattern**:
- Direct JSON file editing for content updates
- No CMS or database - manual content curation approach
- Git-based version control for content history

**Rationale**: JSON chosen over embedded HTML for separation of content and presentation, enabling potential future migrations to dynamic systems or alternative frontends.

### SEO & Discoverability

**SEO Implementation**:
- Comprehensive meta tags (Open Graph, Twitter Cards, Schema.org JSON-LD)
- Semantic HTML structure for crawlability
- Canonical URLs specified per page
- `robots.txt` with sitemap reference
- Google Search Console verification (`google96553f2983b1fbc9.html`)

**Schema.org Strategy**:
- Website and EducationalOrganization entities
- Structured data for educational content classification
- SearchAction markup for site search potential

**Rationale**: Static sites require extra SEO attention to compete with dynamic platforms. Structured data helps search engines understand educational content context.

### Accessibility Features

**Implemented Patterns**:
- Skip-to-content links for keyboard navigation
- ARIA attributes (`aria-expanded`, `aria-controls`) for interactive elements
- Semantic HTML5 elements for screen reader support
- Keyboard event handling for flashcard navigation
- Focus management for accessibility

**Rationale**: Educational platforms must be inclusive. Static sites can achieve excellent accessibility with proper semantic markup and ARIA support.

### User Interaction Patterns

**Flashcard System**:
- Card flipping mechanism (front: Malay idiom, back: translation/explanation)
- Sequential navigation (previous/next)
- Keyboard shortcuts for hands-free learning
- Category-based filtering
- Progress tracking through current index

**Interactive Features**:
- Collapsible sections for etymology content
- Dynamic content loading based on category selection
- State management via JavaScript closures and DOM manipulation

**Rationale**: Flashcard-based learning proven effective for language acquisition. Interactive elements increase engagement without requiring backend infrastructure.

## External Dependencies

### Third-Party Services

1. **GitHub Pages**
   - Purpose: Static site hosting
   - Integration: Repository-based deployment
   - Cost: Free tier

2. **Google Fonts**
   - Purpose: 'Poppins' font family for typography
   - Integration: CDN link (implied from CSS font-family declarations)
   - Fallback: Sans-serif system fonts

3. **Google Search Console**
   - Purpose: Search performance monitoring and indexing
   - Integration: Verification file (`google96553f2983b1fbc9.html`)

### Asset Management

**Images**:
- Stored in `/images/` directory with subdirectories:
  - `etymology_images/` - Visual aids for word origins (e.g., Srivijaya Empire)
  - `malaysia_images/` - Cultural and travel photography (e.g., Cameron Highlands)
  - Root image files (e.g., `mascot.jpeg`)

**Rationale**: Local asset storage for reliability and performance. No CDN needed for static educational content with moderate traffic expectations.

### Development Tools

**VS Code Configuration**:
- `.vscode/settings.json` configures Live Server on port 5501
- Local development server for testing before deployment

**Rationale**: Lightweight development setup matching static site simplicity. No complex build tools or transpilation needed.

### Future Considerations

**Potential Enhancements**:
- Could add analytics (Google Analytics) for usage insights
- Could integrate speech synthesis API for pronunciation guidance
- Could add spaced repetition algorithm for optimized flashcard scheduling
- Could migrate to static site generator (Jekyll, Hugo) for templating if content scales significantly

**Migration Path**:
- JSON data structure enables easy migration to backend systems (Postgres, MongoDB) if user accounts/progress tracking needed
- Current architecture allows adding API layer without restructuring content