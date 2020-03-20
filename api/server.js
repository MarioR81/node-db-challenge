const express = require('express');

const ProjectRouter = require('../data/project-router.js');
const ResourcesRouter = require('../data/resource-router.js');
const TasksRouter = require('../data/task-router.js');

const server = express();

server.use(express.json());

server.use('/api/projects', ProjectRouter);
server.use('/api/resources', ResourcesRouter);
server.use('/api/tasks', TasksRouter);

server.get('/', (req, res) => {
    res.status(200).json({ api: 'Alive and Well! .... barely' })
})

module.exports = server;