const express = require("express");

const app = express();
const port = 3000;

const checkout = async () => {
  if (Math.random() > 0.01) return;

  throw new Error("checkout error");
};

app.get("/checkout", async (_, res) => {
  console.log("checkout");

  try {
    await checkout();
  } catch (e) {
    console.log(e);
    return res.send({ error: true });
  }
  res.send({ success: true });
});

app.listen(port, () => {
  console.log(`application running on port ${port}`);
});
