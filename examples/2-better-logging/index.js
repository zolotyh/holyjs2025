const express = require("express");
const logger = require("./logger");

const app = express();
const port = 3000;

app.use((req, res, next) => {
  req.logger = logger.child({ foo: "bar" });
  next();
});

const checkout = async () => {
  if (Math.random() > 0.01) return;

  throw new Error("checkout error");
};

app.get("/checkout", async (req, res) => {
  req.logger.info("checkout");

  try {
    await checkout();
  } catch (e) {
    req.logger.error(e, "error on checkout");
    return res.send({ error: true });
  }

  req.logger.info("success checkout");
  res.send({ success: true });
});

app.listen(port, () => {
  console.log(`application running on port ${port}`);
});
