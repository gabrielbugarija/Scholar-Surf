require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const sequelize = require("./config/database");
const Student = require("./models/Student");
const StudentRoutes = require("./routes/students");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Student Signup API
app.post("/api/signup", async(req, res) => {
    try {
        const { name, email, password, course, year } = req.body;

        const existingStudent = await Student.findOne({ where: { email } });
        if (existingStudent) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newStudent = await Student.create({ name, email, password: hashedPassword, course, year });

        res.json({ success: true, message: "Student registered successfully", student: newStudent });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
});

// 📌 Use Student Routes
app.use("/api/students", StudentRoutes);

// 📌 Test Route
app.get("/", (req, res) => res.send("Server is running..."));

// ✅ Sync DB and Start Server
const PORT = process.env.PORT || 5000;

sequelize
    .sync()
    .then(() => {
        console.log("✅ Database Synced");
        app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
    })
    .catch((err) => console.error("❌ Sync Error:", err));