const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());
const helmet = require('helmet');
app.use(helmet());
const Post = require("./api/models/posts");
const postsData = new Post();

app.get("/api/posts", (req, res) => {
    res.status(200).send(postsData.get());
});

app.listen(3000, () => console.log("Listening on http://localhost:3000"));