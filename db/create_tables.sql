CREATE TABLE "posts"
(
    "id"         INTEGER,
    "title"      TEXT,
    "author"     TEXT,
    "content"    TEXT,
    "state"      TEXT NOT NULL DEFAULT 'pending',
    "created_at" TEXT          DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);

CREATE VIRTUAL TABLE posts_index USING fts5
(
    title,
    author,
    content
);
