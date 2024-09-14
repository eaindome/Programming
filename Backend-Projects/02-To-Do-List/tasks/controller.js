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
            message: 'Task successfully created.',
            task: newTask
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

const updateTask = async (req, res) => {
    const { id } = req.params;
    const {
        title,
        description,
        status
    } = req.body;

    try {
        const task = await Task.findOne({
            where: {
                id,
                userId: req.user.userId
            }
        });

        if (!task) {
            return res.status(404).send({
                message: 'Task not found!'
            });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;

        await task.save();

        return res.status(200).send({
            message: 'Task successfully updated!',
            task: task
        });
    } catch (err) {
        console.error(`Error: ${err}`);
        return res.code(500).send({
            message: 'Error updating task'
        });
    }
};

module.exports = {
    createTask,
    getTasks,
    updateTask
}