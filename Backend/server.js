const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;
const routes = require("./routes");

// -----Middleware----- //
app.use(cors());
app.use(bodyParser.json());

// -----Routes----- //
app.use("/api/campaign", routes.campaign);
app.use("/api/user", routes.user);
app.use("/api/donate", routes.payment);
app.use("/api/donation", routes.donation);
app.use("/api/query", routes.query);

app.get("*", (req, res) => {
  res.send("404 Error");
});

// -----MongoDB Connection----- //
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// -----Start Server----- //
app.listen(PORT, () => {
  console.log(`🚀 Server running successfully on port ${PORT}`);
});
