const fs = require("fs");
const jsonServer = require("json-server");
const bodyParser = require("body-parser");

const { users } = JSON.parse(fs.readFileSync("./users.json", "utf-8"));

const server = jsonServer.create();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

server.listen(8000, () => {
  console.log("Server started on port 8000");
});
