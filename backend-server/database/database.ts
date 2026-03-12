import sqlite3 from "sqlite3";
sqlite3.verbose();

const db = new sqlite3.Database("movies.sqlite", err => {
  if (err) {
    console.error("Fel vid anslutning till SQlite", err.message);
  } else {
    console.log("Ansluten till SQLite-databasen");
  }
});
export { db };
