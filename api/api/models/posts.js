const PATH = "./data.json";
const fs = require('fs');

class Post {
    get() {
        /** Get posts */
        return this.readData();
    }
    getIndividualBlog() {
        /** Get one blog post */
    }
    add() {
        /** Add new post */
    }
    readData() {
        /** Get data from data.json */
        let rawdata = fs.readFileSync(PATH);
        let posts = JSON.parse(rawdata);
        return posts;
    }
}

module.exports = Post;