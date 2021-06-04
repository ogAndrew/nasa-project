const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const planetsRouter = require("./routes/planets/planets.router");
const launchesRouter = require("./routes/launches/launches.router");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(morgan("combined"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/planets", planetsRouter);
app.use("/launches", launchesRouter);

// "/* uses a searching feature in express to handle routes on the frontend that are not present in the middleware chain. A lot of times react router might have many different routes that can cause errors with express unless this askterisk is used."
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
