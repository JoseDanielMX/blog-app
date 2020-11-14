const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());
const helmet = require('helmet');
app.use(helmet());
const Post = require("./api/models/posts");
const postsData = new Post();

const posts = [{
    "id": "1581461442206",
    "title": "Title",
    "description": "Description",
    "content": "Content",
    "post_image": "uploads/post-image-1581461442199.jpg",
    "added_date": "1581461442206"
}]

app.get("/api/posts", (req, res) => {
    res.status(200).send(posts);
});

app.listen(3000, () => console.log("Listening on http://localhost:3000"));