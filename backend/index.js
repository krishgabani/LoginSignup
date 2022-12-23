import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
// import User from "./models/user";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect(
  "mongodb://localhost:27017/myLoginRegisterDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("DB connected");
  }
);

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = new mongoose.model("User", userSchema);

//Routes
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, async (err, user) => {
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        //password === user.password
        res.send({ status: 1, message: "Login Successfull", user: user });
      } else {
        res.send({ status: 0, message: "Password didn't match" });
      }
    } else {
      res.send({ status: 0, message: "User not registered" });
    }
  });
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email }, async (err, user) => {
    if (user) {
      res.send({ status: 0, message: "User already registerd" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const user = new User({
        name,
        email,
        password: hashPassword,
      });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({
            status: 1,
            message: "Successfully Registered, Please login now.",
          });
        }
      });
    }
  });
});

app.listen(9002, () => {
  console.log("BE started at port 9002");
});
