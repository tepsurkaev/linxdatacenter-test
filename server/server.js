require("dotenv").config();
const fs = require("fs");
const jsonServer = require("json-server");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

const { users } = JSON.parse(fs.readFileSync("./users.json", "utf-8"));

const server = jsonServer.create();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

server.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3 }),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json("Validation error");
    }

    let users = {
      users: [],
    };

    fs.readFile("./users.json", "utf-8", (err, data) => {
      if (err) {
        return res.json(`Read file error: ${err}`);
      } else {
        const { email, password, userName } = req.body;

        if (!email) {
          return res.status(400).json("You have to set email");
        }

        if (!password) {
          return res.status(400).json("You have to set password");
        }

        users = JSON.parse(data);

        const candidate = JSON.parse(data).users.find(
          (user) => user.email === email
        );

        if (candidate) {
          return res.status(400).json("Email already exist");
        }

        const newUser = {
          id: JSON.parse(data).users.length + 1, // get the length of the users array and add 1 to it? for new id
          email,
          password,
          userName,
        };

        users.users.push(newUser);

        const newUserToJSON = JSON.stringify(users);

        fs.writeFile("./users.json", newUserToJSON, "utf-8", (err) => {
          if (err) {
            return res.json(`Registration error: ${err}`);
          } else {
            return res.json(newUser);
          }
        });
      }
    });
  }
);

const createToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
};

const isRegistered = (email, password) => {
  return (
    users.findIndex(
      (user) => user.email === email && user.password === password
    ) !== -1
  );
};

server.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;

    const candidate = users.find((user) => user.email === email);

    const userName = candidate?.userName;

    if (!isRegistered(email, password)) {
      return res.status(401).json("Wrong email or password");
    }

    const token = createToken({ email, password, userName });
    return res.status(200).json(token);
  } catch (e) {
    return res.json(e);
  }
});

server.listen(8000, () => {
  console.log("Server started on port 8000");
});
