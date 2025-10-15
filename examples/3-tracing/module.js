const express = require("express");
const axios = require("axios");
const { trace } = require("@opentelemetry/api");
const logger = require("pino")();

const app = express();
const PORT = process.env.PORT || 3003;

function getCurrentTraceId() {
  const currentSpan = trace.getActiveSpan();
  return currentSpan?.spanContext().traceId;
}

app.get("/data", async (req, res) => {
  const traceId = getCurrentTraceId();

  logger.error("Error message");

  res.setHeader("X-Trace-ID", traceId || "not-available");
  res.json({ hello: "world" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
