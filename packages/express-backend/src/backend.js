import express from "express";
import cors from "cors";

const app = express();
const port = 8000;
const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };

const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
  };

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const generateId = (user) => {
  const id = Math.random().toString(36).slice(2).substring(0, 6);
  user.id = id;
}

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

const deleteUser = (user) => {
  const userId = user.id;
  const userIndex = users["users_list"].findIndex(user => user.id === userId);
  if (userIndex !== -1) {
      users["users_list"].splice(userIndex, 1);
      return true;
  }
  return false;
}

app.use(cors());

app.use(express.json());  

app.get("/", (req, res) => {
    res.send("Hello World!");
  });

app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
      let result = findUserByName(name);
      result = { users_list: result };
      res.send(result);
  } else {
      res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.get('/users', (req, res) => {
  const { name, job } = req.query;

  let filteredUsers = users;
  if (name && job) {
      filteredUsers = users.filter(user => user.name === name && user.job === job);
  }

  res.json(filteredUsers);
});

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    if (userToAdd === undefined) {
      res.status(404).send("Could not add user. ")
    } else {
      generateId(userToAdd);
      addUser(userToAdd);
      res.status(201).send(userToAdd);
    }
    
}); 

app.delete("/users/:id", (req, res) => {
    const userId = req.params.id;
    const user = findUserById(userId);
    if (!user) {
      res.status(404).send({ message: 'User not found' });
  } else {
      deleteUser(user);
      res.status(204).send();
  }
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});