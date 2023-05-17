const expree = require("express");
const app = expree();

app.get("/", (req, res) => {
  res.send("Hello Node API");
});

app.listen(3007, () => {
  console.log("API is running on port 3007");
});
