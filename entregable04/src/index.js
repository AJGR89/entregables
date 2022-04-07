const app = require("./app");

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Server on port: http://localhost:${PORT}/`);
});
server.on("error", (error) => {
  console.log(error);
});
