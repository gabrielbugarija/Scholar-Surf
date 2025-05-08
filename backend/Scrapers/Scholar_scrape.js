const axios = require('axios');
const cheerio = require('cheerio');
const sequelize = require("../config/database");
const Scholarship = require("../models/Scholarship");

const URL = 'https://www.educanada.ca/scholarships-bourses/non_can/index.aspx?lang=eng';

async function fetchScholarshipData() {

    try {
        const { data } = await axios.get(URL);
        const $ = cheerio.load(data);
        const scholarships = [];

        $("main a").each((i, el) => {
            const name = $(el).text().trim();
            const link = $(el).attr("href");
            const fullLink = link ?.startsWith("http") ? link : `https://www.educanada.ca${link}`;

            if (name && link && name.length > 5) {
                scholarships.push({
                    name,
                    description: `Learn more at ${fullLink}`,
                    eligiblePrograms: "ALL",
                    minYear: 1,
                    deadline: null,
                    externalLink: fullLink
                });
            }
        });

        await sequelize.sync();
        await Scholarship.bulkCreate(scholarships);
        console.log(`✅ Inserted ${scholarships.length} scholarships.`);
    } catch (err) {
        console.error("❌ Scraping failed:", err);
    } finally {
        await sequelize.close();
    }
};

fetchScholarshipData();