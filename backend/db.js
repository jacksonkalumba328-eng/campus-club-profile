const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "clubs.db");
const db = new Database(dbPath);

// Create the clubs table
db.exec(`
    CREATE TABLE IF NOT EXISTS clubs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(120) NOT NULL,
        description TEXT,
        category VARCHAR(80),
        president VARCHAR(120),
        meeting_day VARCHAR(30),
        contact_email VARCHAR(150),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
`);

// Add sample clubs only if the table is empty
const count = db.prepare("SELECT COUNT(*) AS total FROM clubs").get();

if (count.total === 0) {
    const insertClub = db.prepare(`
        INSERT INTO clubs
        (name, description, category, president, meeting_day, contact_email)
        VALUES (?, ?, ?, ?, ?, ?)
    `);

    const clubs = [
        ["Coding Club", "Learn programming", "Technology", "John Banda", "Monday", "coding@example.com"],
        ["Football Club", "Organize football matches", "Sports", "Peter Phiri", "Tuesday", "football@example.com"],
        ["Music Club", "Practice music", "Arts", "Mary Zulu", "Wednesday", "music@example.com"],
        ["Debate Club", "Practice debating", "Academic", "James Tembo", "Thursday", "debate@example.com"],
        ["Chess Club", "Play chess", "Games", "Grace Mwansa", "Friday", "chess@example.com"],
        ["Drama Club", "Perform plays", "Arts", "David Chanda", "Monday", "drama@example.com"],
        ["Science Club", "Explore science", "Academic", "Ruth Phiri", "Tuesday", "science@example.com"],
        ["Environmental Club", "Protect the environment", "Environment", "Brian Zulu", "Wednesday", "environment@example.com"],
        ["Photography Club", "Learn photography", "Arts", "Linda Banda", "Thursday", "photo@example.com"],
        ["Business Club", "Learn entrepreneurship", "Business", "Michael Tembo", "Friday", "business@example.com"]
    ];

    const insertMany = db.transaction((records) => {
        for (const club of records) {
            insertClub.run(...club);
        }
    });

    insertMany(clubs);
}

console.log("Campus Club database is ready!");

module.exports = db;