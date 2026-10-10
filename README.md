# Roam - Travel Discovery Website

**Tagline:** Find your next happy place.

Roam is a responsive, beginner-friendly travel discovery website designed to act as a modern travel magazine combined with a simple destination discovery tool. It allows users to explore popular travel destinations, search and filter destinations, view destination details, and save their favorite places.

## Features
- **Home Page:** Engaging hero section, popular destinations, and curated collections.
- **Explore Page:** Search functionality, category filtering, and responsive grid of destinations.
- **Destination Details:** Beautiful single-page view for each destination with descriptions, highlights, and budget info.
- **Favorites System:** Save destinations to a favorites list, persisted in local storage.

## Technologies Used
- React (Hooks, Context, Router)
- Vite
- Standard CSS
- Lucide React (Icons)

## Folder Structure
```
roam/
  index.html
  src/
    main.jsx
    App.jsx
    data/
      destinations.js        # Sample destination data
    context/
      FavoritesContext.jsx   # Context for managing favorites state
    components/
      Navbar.jsx             # Navigation bar component
      Footer.jsx             # Footer component
      DestinationCard.jsx    # Reusable card for destinations
    pages/
      Home.jsx               # Home page
      Explore.jsx            # Search and filter page
      DestinationDetails.jsx # Individual destination view
      Favorites.jsx          # Saved destinations page
      NotFound.jsx           # 404 Error page
    index.css                # Global styles
```

## Setup & Installation

### Prerequisites
Make sure you have Node.js installed on your machine.

### Installation
1. Clone the repository or navigate to the project directory:
   ```bash
   cd roam
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Development Server
To start the development server, run:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### Creating a Production Build
To create an optimized production build, run:
```bash
npm run build
```
This will generate a `dist` directory with the compiled files, ready for deployment on platforms like Vercel or Netlify.

## Implementation Details
- **Search & Filtering:** The Explore page uses React state to store the current search query and selected category. It uses the `filter` method to dynamically update the displayed destinations based on both criteria combined. URL parameters are also updated to make searches shareable.
- **Favorites & Local Storage:** A React Context (`FavoritesContext`) manages the state of saved destinations. Whenever a favorite is added or removed, the context updates its internal state and syncs the list of favorite IDs to the browser's `localStorage`. When the app loads, it initializes the favorites state from `localStorage` so favorites persist across page reloads.
- **Reusable Components:** Elements like the navigation bar, footer, and individual destination cards are extracted into reusable components (`Navbar.jsx`, `Footer.jsx`, `DestinationCard.jsx`), keeping the page files clean and easy to read.

## Screenshots
*(Add screenshots here after running the project)*

## Future Improvements
- Pagination or infinite scrolling on the Explore page.
- More interactive maps for destination details.
- User reviews and ratings.
