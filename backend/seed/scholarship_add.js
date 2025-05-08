const sequelize = require("../config/database");
const Scholarship = require("../models/Scholarship");

const seedScholarships_add = async() => {
    await sequelize.sync({ force: false }); // 'force: true' will wipe data

    const scholarships = [{
            name: "Women in STEM Scholarship",
            description: "Support for female-identifying students in STEM fields.",
            eligiblePrograms: "CS,ENG,SCI",
            minYear: 2,
            deadline: "2025-12-01",
            externalLink: "https://example.com/stem-scholarship"
        },
        {
            name: "Leadership Entrance Award",
            description: "Recognizes leadership in first-year students.",
            eligiblePrograms: "ALL",
            minYear: 1,
            deadline: "2025-09-15",
            externalLink: "https://example.com/leadership-award"
        },
        {
            name: "Computer Science Innovators Grant",
            description: "For students pursuing innovation in CS.",
            eligiblePrograms: "CS",
            minYear: 3,
            deadline: "2025-10-01",
            externalLink: "https://example.com/cs-innovators"
        }
    ];

    try {
        await Scholarship.bulkCreate(scholarships);
        console.log("✅ Sample scholarships inserted!");
    } catch (err) {
        console.error("❌ Error inserting sample scholarships:", err);
    } finally {
        await sequelize.close();
    }
};

seedScholarships_add();