import express from "express";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import Promise from "bluebird";

import auth from "./routes/auth";
import procese from "./routes/procese";
import controlori from "./routes/controlori";

dotenv.config();
const app = express();
app.use(bodyParser.json());
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
mongoose.set("useCreateIndex", true);

app.use("/api/auth", auth);
app.use("/api/procese", procese);
app.use("/api/controlori", controlori);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(4000, () => console.log("Running on localhost:4000"));
