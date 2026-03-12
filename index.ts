import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import movieRouter from "./routes/movies";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use("/movies", movieRouter);

app.listen(PORT, () => {
  console.log(`✅ Servern körs på http://localhost:${PORT}`);
});
