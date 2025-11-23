import express, { Router } from "express";
import cors from "cors";

import "dotenv/config";

const app = express();
app.use(cors({
  origin:"https://nutf.onrender.com",
  credentials:true,
}));
app.use(express.json());



//router becuase of error
import upload from "./middleware/upload.js"
import { analyzeFood } from "./controller/analyze.js";
const foodrouter = Router();
foodrouter.post("/", upload.single("image"), analyzeFood);
app.use("/analyze", foodrouter);







app.get("/", (req, res) => {
  res.send({ msg: "Hey mate ! Backend Running!" });
});

app.listen(process.env.PORT || 3000, () =>
  console.log(`Server running at port ${process.env.PORT || 3000}`)
);
