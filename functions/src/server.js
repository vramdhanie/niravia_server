const express = require("express");
const jsonParser = express.json();
const cors = require("cors");
const helmet = require("helmet");
const winston = require("winston");
const expressWinston = require("express-winston");
const { router: gameRouter } = require("./routes/game");
const app = express();

const logger = expressWinston.logger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: true,
  msg:
    "HTTPS {{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}",
  expressFormat: true,
  colorize: false
});

app
  .use(cors())
  .use(jsonParser)
  .use(logger)
  .use("/game", gameRouter)
  .use("*", (_, res) =>
    res.status(404).json({ error: true, data: { message: "Invalid Endpoint" } })
  );

module.exports = app;
