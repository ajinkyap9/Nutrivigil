// import express, { Router } from "express";
// import cors from "cors";

// import "dotenv/config";

// const app = express();
// app.use(cors({
//   origin:["https://nutf.onrender.com",
//     "https://nutb.onrender.com/"
//   ],
//   credentials:true,
// }));
// app.use(express.json());



// //router becuase of error
// import upload from "./middleware/upload.js"
// import { analyzeFood } from "./controller/analyze.js";
// const foodrouter = Router();
// foodrouter.post("/", upload.single("image"), analyzeFood);
// app.use("/analyze", foodrouter);


// app.get("/", (req, res) => {
//   res.send({ msg: "Hey mate ! Backend Running!" });
// });

// app.listen(process.env.PORT || 3000, () =>
//   console.log(`Server running at port ${process.env.PORT || 3000}`)
// );


import express, { Router } from "express";
import cors from "cors";

import "dotenv/config";

const app = express();
app.use(cors({
  origin:["https://nutf.onrender.com",
    "https://nutb.onrender.com",
     "http://localhost:5173"   // Example for Vite
  ],
  credentials:true,
}));
app.use(express.json());

//router because of error
import upload from "./middleware/upload.js"
import { analyzeFood } from "./controller/analyze.js";
const foodrouter = Router();

// Updated route with error handling for Multer
foodrouter.post("/", (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      // Handle Multer errors (e.g., file size limit exceeded or invalid file type)
      return res.status(400).json({
        error: err.message || "Image upload failed",
      });
    }
    // If no error, proceed to analyzeFood
    analyzeFood(req, res);
  });
});

app.use("/analyze", foodrouter);

app.get("/", (req, res) => {
  res.send({ msg: "Hey mate ! Backend Running!" });
});

app.listen(process.env.PORT || 3000, () =>
  console.log(`Server running at port ${process.env.PORT || 3000}`)
);