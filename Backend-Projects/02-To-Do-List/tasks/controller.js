const Task = require('../models/Tasks');

// create task endpoint
const createTask = async (req, res) => {
    const {
        title,
        description
    } = req.body;
    const userId = req.user.userId;
    // console.log(`user id: ${userId}`);

    if (!title) {
        return res.code(400).send({
            message: 'Title field is required.'
        })
    }

    try {
        const newTask = await Task.create({
            title,
            description,
            userId,
        })
    
        return res.status(201).send({
            message: 'Task successfully created.'
        })
    } catch (err) {
        console.error(`Error creating task: ${err}`);
        res.code(500).send({
            message: `Server error: ${err}`
        });
    }
};

// get a list of task
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({
            where: {
                userId: req.user.userId,        // get the tasks for a particular user
            },
        });

        if (tasks.length === 0) {
            return res.status(404).send({
                message: 'No tasks available.'
            });
        }

        return res.status(200).send(tasks);
    } catch (err) {
        console.error(`Error: ${err}`);
        return res.status(500).send({
            message: 'Error, retrieving tasks.'
        });
    }
};

module.exports = {
    createTask,
    getTasks,
}