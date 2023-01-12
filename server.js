const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//DB configs
 mongoose
  .set("strictQuery", false)
  .connect(
    "mongodb+srv://herestetic:Wuwu3508@cluster0.p7hvudo.mongodb.net/test",
    {
      useNewUrlParser: true,
    }
  )
  .catch((err) => console.log(err));

const userSchema = mongoose.Schema({
  title: String,
  description: String,
});

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.send("express is here");
});

app.post("/create", (req, res) => {
  console.log("Hello");
  const newUser = new User({
    title: req.body.title,
    description: req.body.description,
  });

  newUser
    .save()
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

app.get("/posts", (req, res) => {
  User.find()
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

app.delete("/delete/:id", (req, res) => {
  console.log(req.params);
  User.findByIdAndDelete({ _id: req.params.id })
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

app.put("/update/:id", (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.params.id },
    {
      title: req.body.title,
      description: req.body.description,
    }
  )
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

app.listen(3001, function () {
  console.log("Express server is running");
});
