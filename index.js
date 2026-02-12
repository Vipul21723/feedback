const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors())
app.use(express.json());
const pool = require("./db");

app.post("/api/feedback", async (req,res) => {
    const { name, message } = req.body;
    
    try {
        const result = await pool.query(
            `INSERT INTO public.feedbacks (name, message) VALUES ($1,$2) RETURNING *`, [name,message]
        );

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}) 


app.get("/api/feedbacks", async (req,res) => {
    try {
        const result = await pool.query(
            `SELECT * FROM public.feedbacks ORDER BY createdat DESC`
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message})
    }
})

app.listen(3000, () => {
    console.log("Server Started ... !!!");
})
