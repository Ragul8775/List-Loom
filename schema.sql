CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    passwordHash VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    userId INTEGER REFERENCES Users(id) ON DELETE CASCADE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Labels (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    userId INTEGER REFERENCES Users(id) ON DELETE CASCADE,
    projectId INTEGER REFERENCES Projects(id) ON DELETE CASCADE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    dueDate DATE,
    priority VARCHAR(50),
    userId INTEGER REFERENCES Users(id) ON DELETE CASCADE,
    projectId INTEGER REFERENCES Projects(id) ON DELETE SET NULL,
    labelId INTEGER REFERENCES Labels(id) ON DELETE SET NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Notes (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    taskId INTEGER REFERENCES Tasks(id) ON DELETE CASCADE,
    projectId INTEGER REFERENCES Projects(id) ON DELETE SET NULL,
    userId INTEGER REFERENCES Users(id) ON DELETE CASCADE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
