const express = require("express");
const Student = require("../models/Student");

const router = express.Router();

// GET all students
router.get("/", async(req, res) => {
    try {
        const students = await Student.findAll();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch students" });
    }
});

//  GET a student by ID
router.get("/:id", async(req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        if (!student) return res.status(404).json({ error: "Student not found" });
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: "Error fetching student" });
    }
});

// CREATE a new student
router.post("/", async(req, res) => {
    try {
        const { name, email } = req.body;
        const newStudent = await Student.create({ name, email });
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(500).json({ error: "Failed to create student" });
    }
});

// UPDATE a student by ID
router.put("/:id", async(req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        if (!student) return res.status(404).json({ error: "Student not found" });

        await student.update(req.body);
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: "Failed to update student" });
    }
});

//  DELETE a student by ID
router.delete("/:id", async(req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        if (!student) return res.status(404).json({ error: "Student not found" });

        await student.destroy();
        res.json({ message: "Student deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete student" });
    }
});

module.exports = router;