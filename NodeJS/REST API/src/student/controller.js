const pool = require('../../db');
const { getStudents } = require('./queries');

const getStudents = async (req, res) => {
    pool.query(queries.getStudents, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const getStudentById = async (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
}

const addStudent = async (req, res) => {
    const { name, email, age, dob } = req.body;

    // check if email exists
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if (results.rows.length) {
            res.send("Email already exists");
        }

        // add student
        pool.query(queries.addStudent, [name, email, age, dob], (error, results) => {
            if (error) throw error;
            res.status(201).send("Student added successfully!");
        });
    });    
}

const removeStudent = async (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getStudentById, [id], (error, results) => {
        if (!results.rows.length) {
            res.send("Student does not exist");
        }

        pool.query(queries.deleteStudent, [id], (error, results) => {
            if (error) throw error;
            res.status(200).send("Student deleted successfully!");
        });
    });
}

const updateStudent = async (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getStudentById, [id], (error, results) => {
        if (!results.rows.length) {
            res.send("Student does not exist");
        }

        const { name, email, age, dob } = req.body;
        pool.query(queries.updateStudent, [name, email, age, dob, id], (error, results) => {
            if (error) throw error;
            res.status(200).send("Student updated successfully!");
        });
    });
}

module.exports = {
    getStudents,
    getStudentById,
    addStudent,
    removeStudent,
    updateStudent,
}