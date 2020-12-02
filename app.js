const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());
const helmet = require('helmet');
app.use(helmet());
const Post = require("./api/models/posts");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads")
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`)
    }
});
const getExt = (mimetype) => {
    switch(mimetype) {
        case "image/png":
            return ".png";
        case "image/jpeg":
            return ".jpeg";
    }
}
var upload = multer({ storage: storage });
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

app.post("/api/posts", upload.single("post-image"), (req, res) => {
    const newPost = {
        "id": `${Date.now()}`,
        "added_date": `${Date.now()}`,
        "post_image": req.file.path.replace(/\\/g, "/"),
        "title": req.body.title,
        "description": req.body.description,
        "content": req.body.content
    }
    postsData.add(newPost);
    res.status(201).send(newPost);
})

const PORT = process.env.PORT;

app.listen(PORT, () => console.log("Listening on http://localhost:3000"));