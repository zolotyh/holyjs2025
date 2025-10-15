const express = require("express");
const axios = require("axios");
const { trace } = require("@opentelemetry/api");
const logger = require("pino")();

const app = express();
const PORT = process.env.PORT || 3000;

function getCurrentTraceId() {
  const currentSpan = trace.getActiveSpan();
  return currentSpan?.spanContext().traceId;
}

async function fetchData() {
  try {
    const [catFact, dogFact, randomJoke, data] = await Promise.all([
      axios.get("https://catfact.ninja/fact"),
      axios.get("https://dog.ceo/api/breeds/image/random"),
      axios.get("https://official-joke-api.appspot.com/jokes/random"),
      axios.get("http://localhost:3003/data"),
    ]);

    logger.error("Hello");

    return {
      catFact: catFact.data.fact,
      dogImage: dogFact.data.message,
      joke: randomJoke.data.setup + " - " + randomJoke.data.punchline,
      data: data.data.hello,
    };
  } catch (error) {
    return { error: "Failed to fetch data from APIs" };
  }
}

app.get("/data", async (req, res) => {
  const data = await fetchData();
  const traceId = getCurrentTraceId();
  res.setHeader("X-Trace-ID", traceId || "not-available");
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
