module.exports = require("pino")({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});
