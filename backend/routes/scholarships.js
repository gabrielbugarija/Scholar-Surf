const express = require("express");
const Scholarship = require("../models/Scholarship");

const router = express.Router();

// GET all scholarships
router.get("/", async(req, res) => {
    try {
        const scholarships = await Scholarship.findAll();
        res.json(scholarships);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch scholarships" });
    }
});

// POST a new scholarship
router.post("/", async(req, res) => {
    try {
        const newScholarship = await Scholarship.create(req.body);
        res.status(201).json(newScholarship);
    } catch (err) {
        res.status(500).json({ error: "Failed to create scholarship", details: err });
    }
});

// GET scholarships matched to a student's course and year
router.post("/match", async(req, res) => {
    try {
        const { course, year } = req.body;

        const all = await Scholarship.findAll();

        const matched = all.filter((s) => {
            const programs = s.eligibleProgram?.split(",").map(p => p.trim().toUpperCase()) || ["ALL"];
            const matchesProgram = programs.includes("ALL") || programs.includes(course.toUpperCase());
            const matchesYear = !s.minYear || year >= s.minYear;
            return matchesProgram && matchesYear;
        });

        res.json(matched);
    } catch (err) {
        console.error("MATCH ERROR:", err);
        res.status(500).json({ error: "Failed to match scholarships", details: err });
    }
});



module.exports = router;