// Import dependencies
import path from "path";
import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import Database from 'better-sqlite3';
const { config, engine } = require('express-edge');

// Import router
import router from './router';

// Initialize the express engine
const app: express.Application = express();

// Take a port 3000 for running server.
const port = process.env.PORT || 3000;

export const db = new Database(path.join(__dirname, './database/data.db'), { verbose: console.log });

/**
 * creation de la base de données, et insertion des données
 * A ne lancer qu'une seule fois
 */
//const structure = fs.readFileSync(path.join(__dirname, '/database/structure.sql'), 'utf8');
//db.exec(structure);
//
//const data = fs.readFileSync(path.join(__dirname, '/database/data.sql'), 'utf8');
//db.exec(data)

// define the templating engine
app.use(engine);
app.locals.db = db;

// define the Views folder
app.set("views", path.join(__dirname, "./views"));

app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

// to read request form body
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
router(app);

// Server setup
app.listen(port, () => {
    console.log(`TypeScript with Express http://localhost:${port}/`);
});