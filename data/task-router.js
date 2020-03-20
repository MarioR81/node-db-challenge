const express = require('express');

const Task = require('./task-model.js');

const router = express.Router();

router.get('/', (req, res) => {
  Task.find()
  .then(tasks => {
    res.json(tasks);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get Task!' });
  });
});

router.post('/', (req, res) => {
    const taskData = req.body;
  
    Task.add(taskData)
    .then(task => {
      res.status(201).json(task);
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to create new task!' });
    });

    // Task.getTasks()
    //     .then(tasks => {
    //         res.json(tasks);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         res.status(500).json({ message: 'Failed to get tasks.' })
    //     });

  });


  router.get('/:id/task', (req, res) => {
    const { id } = req.params;
  
    Task.getTasks(id)
    .then(tasks => {
      if (tasks.length) {
        res.json(tasks);
      } else {
        res.status(404).json({ message: 'Could not find tasks for given ID' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get tasks!' });
    });
  });


// router.get('/:id/task', (req, res) => {
//     Task.getTasks()
//         .then(tasks => {
//             res.json(tasks);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({ message: 'Failed to get tasks.' })
//         });

// });

module.exports = router;