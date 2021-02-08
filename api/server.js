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

//if no user id
// if(!id){
//     .then((users) => {
//         res.status(200).json(users.id);
//       })
//       .catch((err)=>{
//           res.status(404).
//       })
//   }

//if error in the server
//   .then((users) => {
//     res.status(200).json(users.id);
//   })
//   .catch((err)=>{
//     res.status(404).
//   })
// });
//*POST (one)

//*PUT (one)

//*DELETE (one)

module.exports = app; // EXPORT YOUR SERVER instead of {}
