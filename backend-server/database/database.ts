import sqlite3 from "sqlite3";
sqlite3.verbose();

const db = new sqlite3.Database("movies.sqlite", (err) => {
  if (err) {
    console.error("Fel vid anslutning till SQlite", err.message);
  } else {
    console.log("Ansluten till SQLite-databasen");
  }
});

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS movies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      genre TEXT,
      rating REAL,
      imdbID TEXT NOT NULL UNIQUE
    )`,
    (err) => {
      if (err) {
        console.error("Kunde inte skapa tabellen movies:", err.message);
      }
    },
  );
});

export { db };
