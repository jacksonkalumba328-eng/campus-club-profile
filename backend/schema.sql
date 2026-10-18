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

INSERT INTO clubs
(name, description, category, president, meeting_day, contact_email)
VALUES
('Coding Club', 'Learn programming and build projects', 'Technology', 'John Banda', 'Monday', 'coding@example.com'),
('Football Club', 'Organize football matches', 'Sports', 'Peter Phiri', 'Tuesday', 'football@example.com'),
('Music Club', 'Practice and perform music', 'Arts', 'Mary Zulu', 'Wednesday', 'music@example.com'),
('Debate Club', 'Practice public speaking and debates', 'Academic', 'James Tembo', 'Thursday', 'debate@example.com'),
('Chess Club', 'Play and learn chess', 'Games', 'Grace Mwansa', 'Friday', 'chess@example.com'),
('Drama Club', 'Perform plays and dramas', 'Arts', 'David Chanda', 'Monday', 'drama@example.com'),
('Science Club', 'Explore science experiments', 'Academic', 'Ruth Phiri', 'Tuesday', 'science@example.com'),
('Environmental Club', 'Promote environmental protection', 'Environment', 'Brian Zulu', 'Wednesday', 'environment@example.com'),
('Photography Club', 'Learn photography skills', 'Arts', 'Linda Banda', 'Thursday', 'photo@example.com'),
('Entrepreneurship Club', 'Learn business and entrepreneurship', 'Business', 'Michael Tembo', 'Friday', 'business@example.com');