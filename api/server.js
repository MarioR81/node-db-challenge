const express = require('express');

const ProjectRouter = require('../data/project-router.js');

const server = express();

server.use(express.json());
server.use('/api/recipes', ProjectRouter);

server.get('/', (req, res) => {
    res.status(200).json({ api: 'Alive and Well! .... barely' })
})

module.exports = server;