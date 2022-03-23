require("dotenv").config();
const fs = require("fs");
const jsonServer = require("json-server");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const authMiddleware = require("./authMiddleware");

const { users } = JSON.parse(fs.readFileSync("./users.json", "utf-8"));

const filteredUsers = users.filter((user) => user !== null);

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
      return res.status(400).json("Не валидный email или пароль!");
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
          return res.status(400).json("Необходимо указать email");
        }

        if (!password) {
          return res.status(400).json("Необходимо указать пароль");
        }

        users = JSON.parse(data);

        console.log(filteredUsers.find((user) => user?.email === email));

        const candidate = filteredUsers.find((user) => user?.email === email);

        if (candidate) {
          return res
            .status(400)
            .json("Пользователь под таким email уже зарегистрирован!");
        }

        const newUser = {
          id: filteredUsers.length + 1, // get the length of the users array and add 1 to it? for new id
          email,
          password,
          userName,
        };

        users.users.push(newUser);

        const newUserToJSON = JSON.stringify(users, null, 2);

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
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const isRegistered = (email, password) => {
  return (
    filteredUsers.findIndex(
      (user) => user.email === email && user.password === password
    ) !== -1
  );
};

server.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;

    if (!isRegistered(email, password)) {
      return res.status(401).json("Неправильный email или пароль");
    }

    const candidate = filteredUsers.find((user) => user.email === email);

    const userName = candidate?.userName;

    const id = candidate?.id;

    const token = createToken({ email, password, userName, id });
    return res.status(200).json(token);
  } catch (e) {
    return res.status(401).json(`Error: ${e.message}`);
  }
});

server.patch("/edit/:id", authMiddleware, (req, res) => {
  const { userName } = req.body;
  const { id } = req.params;

  if (id !== req.user.id.toString()) {
    return res.status(401).json("Нет доступа");
  }

  fs.readFile("./users.json", "utf-8", (err, data) => {
    if (err) {
      return res.json(`Read file error: ${err}`);
    } else {
      try {
        const { users } = JSON.parse(data);

        const filteredUsers = users.filter((user) => user !== null);

        const candidate = filteredUsers[id - 1];

        const checkingId = filteredUsers[id - 1].id === req.user.id;

        const idToNumber = Number(id);

        const updatedUser = {
          id: idToNumber,
          email: candidate.email,
          password: candidate.password,
          userName: userName,
        };

        delete filteredUsers[id - 1];

        const updatedUsers = {
          users: [...filteredUsers, updatedUser],
        };

        if (checkingId) {
          fs.writeFile(
            "./users.json",
            JSON.stringify(updatedUsers, null, 2),
            "utf-8",
            (err) => {
              if (err) {
                return res.json({ error: err.toString() });
              }
            }
          );
        }
      } catch (e) {
        return res.json({ error: e.toString() });
      }
    }
  });

  return res.json("User name updated");
});

server.listen(8000, () => {
  console.log("Server started on port 8000");
});
