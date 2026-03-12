import express, { Request, Response } from "express";
import { db } from "../database/database";

const router = express.Router();

// GET /movies – Hämta alla favoriter
router.get("/", (req: Request, res: Response) => {
  db.all("SELECT * FROM movies", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// POST /movies – Lägg till ny favorit
router.post("/", (req: Request, res: Response) => {
  const { title, genre, rating, imdbID } = req.body;

  if (!title || !imdbID) {
    return res.status(400).json({ error: "title och imdbID krävs" });
  }

  const query = `INSERT INTO movies (title, genre, rating, imdbID) VALUES (?, ?, ?, ?)`;
  db.run(query, [title, genre, rating, imdbID], function (err) {
    if (err) {
      if (err.message.includes("UNIQUE constraint failed")) {
        return res.status(409).json({ error: "Filmen finns redan" });
      }
      return res.status(500).json({ error: err.message });
    }

    res.status(201).json({ message: "Film sparad", id: this.lastID });
  });
});

// DELETE /movies/:imdbID – Ta bort favorit
router.delete("/:imdbID", (req: Request, res: Response) => {
  const imdbID = req.params.imdbID;

  db.run("DELETE FROM movies WHERE imdbID = ?", [imdbID], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "Filmen hittades inte" });
    }

    res.status(200).json({ message: "Film borttagen" });
  });
});

export default router;
