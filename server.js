const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const moment = require("moment-timezone");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

//bodyparser middleware
app.use(express.json());
app.use(cookieParser());

var db = "";

if (process.env.DATABASE_URL) {
  db = process.env.DATABASE_URL;
} else {
  db = require("./keys").mongoURI;
}

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console("Mongoose connection error!", err));

app.use("/api/categories", require("./routes/api/categories"));
app.use("/api/users", require("./routes/api/users"));

//serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("frontend/build"));
  app.get("*", (req, res) => {
    // creating an index.html file in the directory and serve our html in there
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });
}

app.listen(PORT, () => console.log("Server is running on Port: " + PORT));
