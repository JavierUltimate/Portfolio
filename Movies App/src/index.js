const { app, port } = require("./app.js");

app.listen(port, () => {
  console.log(`Server runing on port ${port}`);
});
