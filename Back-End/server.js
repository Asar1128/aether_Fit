const express = require('express');
const axios = require('axios');
require('dotenv').config();
const path = require('path');
const db = require("./dataBase");
const port = "3000";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../Views'));

app.post('/Recommendations', async (req, res) => {
    const { userId } = req.body;

    try {
        const [answerData] = await db.promise().query(
            `SELECT BMI, lose_weight, symptoms, body_type 
             FROM answers 
             WHERE user_id = ?`,
            [userId]
        );

        if (!answerData.length) {
            return res.status(404).json({
                error: 'No health data found',
                recommendations: [],
                exercises: [],
                products: []
            });
        }

        const { BMI, lose_weight, symptoms, body_type } = answerData[0];

        const inputData = {
            inputs: {
                source_sentence: `BMI: ${BMI}, Weight Goal: ${lose_weight}, Symptoms: ${symptoms}, Body Type: ${body_type}`,
                sentences: [
                    "Cardio is good for weight loss.",
                    "Strength training builds muscle.",
                    "Yoga improves flexibility.",
                    "Protein helps in muscle recovery.",
                    "Vitamins are essential for health.",
                    "Equipment can enhance workouts."
                ]
            }
        };

        const aiResponse = await axios.post(
            `https://api-inference.huggingface.co/models/sentence-transformers/${process.env.MODEL_NAME}`,
            inputData,
            { headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` } }
        );

        const scores = aiResponse.data;
        const keywords = [];
        const categories = ["cardio", "strength", "yoga", "protein", "vitamins", "equipment"];

        scores.forEach((score, index) => {
            if (score > 0.1) {
                keywords.push(categories[index]);
            }
        });

        if (keywords.length === 0) {
            keywords.push('general');
        }

        const exerciseQuery = `SELECT * FROM exercises WHERE category IN (${keywords.map(() => '?').join(',')})`;
        const productQuery = `SELECT * FROM products WHERE category IN (${keywords.map(() => '?').join(',')})`;

        const [exercises] = await db.promise().query(exerciseQuery, keywords);
        const [products] = await db.promise().query(productQuery, keywords);

        res.json({
            recommendations: keywords.join(', '),
            exercises: exercises,
            products: products
        });

    } catch (error) {
        console.error("❌ Server Error:", error);
        res.status(500).json({
            recommendations: "Service unavailable",
            exercises: [],
            products: []
        });
    }
});

const emailRoute = require('./Routes/EmailRoute');
const nameRoute = require('./Routes/NameRoute');
const dobRoute = require('./Routes/DateOfBirth');
const GenderSelectRoute = require('./Routes/GenderSelectRoute');
const HeightRoute = require('./Routes/HeightRoute');
const WeightRoute = require('./Routes/WeightRoute');
const LooseWight = require('./Routes/LooseWeightRoute');
const UpcomingEvent = require('./Routes/UpcomingEventRoute');
const BodyTypeRoute = require('./Routes/BodyType');
const HealthRatingRoute = require('./Routes/OverAllBodyHealthRoute');
const symptomsRoute = require('./Routes/SymptomsRoute');
const BMI = require('./Routes/BMIRoute');
const Recommendations = require('./Routes/Combination');

app.use('/emailRoute', emailRoute);
app.use('/NameRoute', nameRoute);
app.use('/dobRoute', dobRoute);
app.use('/GenderSelectRoute', GenderSelectRoute);
app.use('/HeightRoute', HeightRoute);
app.use('/WeightRoute', WeightRoute);
app.use('/LooseWight', LooseWight);
app.use('/UpcomingEvent', UpcomingEvent);
app.use('/BodyTypeRoute', BodyTypeRoute);
app.use('/HealthRatingRoute', HealthRatingRoute);
app.use('/symptomsRoute', symptomsRoute);
app.use('/BMI', BMI);
app.use('/Recommendations', Recommendations);

app.use(express.static(path.join(__dirname, '../Front-End')));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
