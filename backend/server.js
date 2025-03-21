require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const sequelize = require("./config/database");
const Student = require("./models/Student");
const StudentRoutes = require("./routes/students");


const app = express();
app.use(express.json());
app.use(cors());

// ✅ Sync Database (Creates Tables)
sequelize.sync()
    .then(() => console.log("✅ MySQL Database Synced"))
    .catch(err => console.log("❌ Error Syncing Database:", err));

// ✅ Student Signup API (Saves Student Data to MySQL)
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

    app.use(express.json());

    // 📌 Use Student Routes
    app.use("/api/students", StudentRoutes);

    // 📌 Test Route
    app.get("/", (req, res) => res.send("Server is running..."));

    // Sync Database and Start Server
    sequelize
        .sync()
        .then(() => {
            console.log("✅ Database Synced");
            app.listen(5000, () => console.log("✅ Server running on port 6969"));
        })
        .catch((err) => console.error("❌ Sync Error:", err));

    // ✅ Start Server
    const PORT = process.env.PORT || 3306;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});