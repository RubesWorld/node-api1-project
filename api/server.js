const generate = require("shortid");
const express = require("express");

//model function import
const dbFunctions = require("./users/model");

const app = express();
app.use(express.json());

// BUILD YOUR SERVER HERE
//*GET (two)
app.get("/api/users", (req, res) => {
  dbFunctions
    .find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "The users information could not be retrieved" });
    });
});

app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  dbFunctions
    .findById(id)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "The user information could not be retrieved" });
    });
});

//*POST (one)
app.post("/api/users", (req, res) => {
  const { name, bio } = req.body;
  if (!name || !bio) {
    res
      .status(400)
      .json({ message: "Please provide a name and bio for the user" });
  } else {
    dbFunctions
      .insert({ name, bio })
      .then((newUser) => {
        res.status(201).json(newUser);
      })
      .catch((err) => {
        res.status(500).json({
          message: "There was an error while saving the user to the database",
        });
      });
  }
});

//*PUT (one)
app.put("/api/users/:id", (req, res) => {
  const changes = req.body;
  const idVar = req.params.id;
  if (!changes.name || !changes.bio) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  } else {
    dbFunctions
      .update(idVar, changes)
      .then((user) => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: "That user is not found" });
        }
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: "The user information could not be modified" });
      });
  }
});

//*DELETE (one)
app.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  dbFunctions
    .remove(id)
    .then((deleted) => {
      if (deleted) {
        res.status(200).json(deleted);
      } else {
        res.status(404).json({ messages: "The user could not be removed" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: error.message });
    });
});

module.exports = app; // EXPORT YOUR SERVER instead of {}
