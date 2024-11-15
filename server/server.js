import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });

app.get("/", (request, response) => {
  response.json("this is the routenest toutenest route since route 66");
});

app.post("/jokes", async function (request, response) {
  const setup = request.body.setup;
  const punchline = request.body.punchline;
  const category = request.body.category;
  const username = request.body.username;
  const result = await db.query(
    "INSERT INTO jokes (setup, punchline, category_id, user_id) VALUES ($1, $2, $3, $4)",
    [setup, punchline, category, username]
  );
  response.json("woohoo!");
});

app.get("/jokes", async function (request, response) {
  const result = await db.query(`
        SELECT 
jokes.id,
jokes.setup,
jokes.punchline,
categories.category,
users.username
FROM jokes
JOIN categories ON jokes.category_id = categories.id
JOIN users ON jokes.user_id = users.id`);
  const jokes = result.rows;
  response.json(jokes);
});

app.listen(8080, () => console.log("Yeeeehaaaaw!!"));
