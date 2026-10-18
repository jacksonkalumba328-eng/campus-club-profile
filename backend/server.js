const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// GET: List all clubs
app.get("/api/clubs", (req, res) => {
    const clubs = db.prepare("SELECT * FROM clubs").all();
    res.json(clubs);
});

// GET: Get one club
app.get("/api/clubs/:id", (req, res) => {
    const club = db.prepare("SELECT * FROM clubs WHERE id = ?")
        .get(req.params.id);

    if (!club) {
        return res.status(404).json({ error: "Club not found" });
    }

    res.json(club);
});

// POST: Create a new club
app.post("/api/clubs", (req, res) => {
    const { name, description, category, president, meeting_day, contact_email } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Club name is required" });
    }

    const result = db.prepare(`
        INSERT INTO clubs
        (name, description, category, president, meeting_day, contact_email)
        VALUES (?, ?, ?, ?, ?, ?)
    `).run(name, description, category, president, meeting_day, contact_email);

    const newClub = db.prepare("SELECT * FROM clubs WHERE id = ?")
        .get(result.lastInsertRowid);

    res.status(201).json(newClub);
});

// PUT: Update a club
app.put("/api/clubs/:id", (req, res) => {
    const { name, description, category, president, meeting_day, contact_email } = req.body;

    const existing = db.prepare("SELECT * FROM clubs WHERE id = ?")
        .get(req.params.id);

    if (!existing) {
        return res.status(404).json({ error: "Club not found" });
    }

    db.prepare(`
        UPDATE clubs
        SET name = ?, description = ?, category = ?,
            president = ?, meeting_day = ?, contact_email = ?,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `).run(name, description, category, president, meeting_day, contact_email, req.params.id);

    const updatedClub = db.prepare("SELECT * FROM clubs WHERE id = ?")
        .get(req.params.id);

    res.json(updatedClub);
});

// DELETE: Remove a club
app.delete("/api/clubs/:id", (req, res) => {
    const result = db.prepare("DELETE FROM clubs WHERE id = ?")
        .run(req.params.id);

    if (result.changes === 0) {
        return res.status(404).json({ error: "Club not found" });
    }

    res.json({ message: "Club deleted successfully" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Campus Club API running at http://localhost:${PORT}`);
});