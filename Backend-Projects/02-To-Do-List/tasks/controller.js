const Task = require('../models/Tasks');


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

module.exports = {
    createTask,
}