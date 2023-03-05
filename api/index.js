import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "./models/User.js";

dotenv.config();
const app = express();

const salt = bcrypt.genSaltSync(10);
const jwtSecret = "fjdaskl;fjdklasj01293ukjfdaskfjdas";

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://127.0.0.1:5173"
}));

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to database."))
    .catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.json("Hello World!");
});

app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const registeredUser = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, salt)
        });

        res.status(201).json(registeredUser);
    } catch (err) {
        res.status(422).json(err);
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const userDocument = await User.findOne({ email });

    if (userDocument) {
        const isPasswordCorrect = bcrypt.compareSync(password, userDocument.password);

        if (isPasswordCorrect) {
            jwt.sign({ id: userDocument._id, email:userDocument.email }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie("token", token).json("Login Successfull");
            })
        } else {
            res.status(401).send({ message: "Incorrect Password!" });
        }
    } else {
        res.status(500).json("User not found!");
    }
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
