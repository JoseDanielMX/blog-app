const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());
const helmet = require('helmet');
app.use(helmet());
const Post = require("./api/models/posts");
const postsData = new Post();

app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.get("/api/posts", (req, res) => {
    res.status(200).send(postsData.get());
});

app.get("/api/posts/:post_id", (req, res) => {
    const postId = req.params.post_id;
    const foundPost = postsData.getIndividualBlog(postId);
    if (foundPost) {
        res.status(200).send(foundPost)
    } else {
        res.status(404).send("Not found");
    }
});

app.post("/api/posts", (req, res) => {
    const newPost = {
        "id": `${Date.now()}`,
        "added_date": `${Date.now()}`,
        "post_image": req.body["post-image"],
        "title": req.body.title,
        "description": req.body.description,
        "content": req.body.content
    }
    postsData.add(newPost);
    res.status(201).send(newPost);
})

app.listen(3000, () => console.log("Listening on http://localhost:3000"));