const PATH = "./data.json";
const fs = require('fs');

class Post {
    get() {
        /** Get posts */
        return this.readData();
    }
    getIndividualBlog(postId) {
        /** Get one blog post */
        const posts = this.readData();
        const foundPost = posts.find((post) => post.id == postId);
        return foundPost;
    }
    add(newPost) {
        /** Add new post */
        const currentPosts = this.readData();
        currentPosts.unshift(newPost);
        this.storeData(currentPosts);
    }
    readData() {
        /** Get data from data.json */
        let rawdata = fs.readFileSync(PATH);
        let posts = JSON.parse(rawdata);
        return posts;
    }
    storeData(rawData) {
        /** Store data into data.json together with add() function */
        let data = JSON.stringify(rawData);
        fs.writeFileSync(PATH, data);
    }
}

module.exports = Post;