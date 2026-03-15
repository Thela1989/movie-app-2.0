# Movie App 2.0

A full-stack movie application built with React, TypeScript, Express, and SQLite.
Users can search movies from the OMDb API, open detailed movie pages, and store favorite movies in a local SQLite database.

## Features

- Search movies by title using OMDb
- Open a detailed page for each movie
- Save a movie to favorites
- View all saved favorites
- Remove favorites from the database

## Tech Stack

- Frontend: React, TypeScript, Vite, Bootstrap, CSS
- Backend API: Node.js, Express
- Database: SQLite
- Routing: React Router

## Project Structure

```text
movie-app-2.0/
|- src/                         # Frontend React app
|  |- components/
|  |- App.tsx
|  |- home.tsx
|  |- MovieDetails.tsx
|- routes/
|  |- movies.ts                 # Express routes for favorites API
|- backend-server/
|  |- database/
|     |- database.ts            # SQLite connection
|- index.ts                     # Express server entry
|- package.json
|- README.md
```

## Prerequisites

- Node.js 18+ (recommended)
- npm

## Installation

```bash
npm install
```

## Run the Project

### 1. Start the frontend (Vite)

```bash
npm run dev
```

The frontend runs on the Vite dev server (usually `http://localhost:5173`).

### 2. Start the backend API

The backend entry file is `index.ts` and listens on port `3000`.

If you do not already have backend runtime packages installed, run:

```bash
npm install express cors body-parser
npm install -D tsx
```

Then start the backend:

```bash
npx tsx index.ts
```

The API will be available at `http://localhost:3000`.

## API Endpoints

Base URL: `http://localhost:3000/movies`

- `GET /movies` - Get all favorite movies
- `POST /movies` - Save a movie to favorites
  - Required fields: `title`, `imdbID`
  - Optional fields: `genre`, `rating`
- `DELETE /movies/:imdbID` - Remove a favorite movie by IMDb ID

## Notes

- The OMDb API key is currently used directly in frontend source code.
- Favorite movies are stored in a local `movies.sqlite` database file.
- Frontend and backend run as separate processes during development.

## Future Improvements

- Move API key to environment variables
- Add backend scripts to `package.json`
- Add validation and better error handling
- Add tests for API and UI
