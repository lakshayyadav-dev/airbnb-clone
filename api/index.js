import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import downloader from "image-downloader";
import multer from "multer";
import fs from "fs";

import User from "./models/User.js";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


dotenv.config();
const app = express();

const salt = bcrypt.genSaltSync(10);
const jwtSecret = "fjdaskl;fjdklasj01293ukjfdaskfjdas";

app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
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
            jwt.sign({
                    id: userDocument._id,
                    email: userDocument.email,
                },
                jwtSecret,
                {},
                (err, token) => {
                    if (err) throw err;
                    res.cookie("token", token).json(userDocument);
                });
        } else {
            res.status(401).send({ message: "Incorrect Password!" });
        }
    } else {
        res.status(500).json("User not found!");
    }
});

app.post("/logout", (req, res) => {
    res.clearCookie("token").json("Logged out!");
});

app.get("/profile", (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;

            const { name, email, _id } = await User.findById(userData.id);
            res.json({ name, email, _id });
        });
    } else {
        res.json(null);
    }
});

app.post("/upload-by-link", async (req, res) => {
    const { link } = req.body;
    const fileName = "photo_" + Date.now() + ".jpg";
    const destination = __dirname + "/uploads/" + fileName;

    await downloader.image({
        url: link,
        dest: destination
    });

    res.json({ fileName });
});

const photosMiddleware = multer({ dest: "uploads" });

app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname, filename } = req.files[i];
        const ext = originalname.split(".")[1];

        const newPath = path + "." + ext;

        fs.renameSync(path, newPath);
        uploadedFiles.push(filename + "." + ext);
    }
    res.json(uploadedFiles);
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
