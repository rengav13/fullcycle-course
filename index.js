require('dotenv').config();
const express = require('express');
const Repository = require('./db');

async function main() {
    const app = express()
    const port = process.env.PORT || 3000;

    const repo = new Repository();
    await repo.start();

    app.get('/', async (req, res) => homeRoute(repo, req, res));

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

async function homeRoute(repo, req, res) {
    const people = await repo.findAllPeople();
    res.send(`
        <h1>Full Cycle Rocks!</h1>
        <ul>
            ${people.map(person => `<li>${person.name}</li>`).join('')}
        </ul>
        `)
}

main();