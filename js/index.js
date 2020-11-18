

const API_URL = "http://localhost:3000/api/posts";
const API_BASE_URL = "http://localhost:3000/";

window.onload = () => {
    getPosts();
}

const getPosts = () => {
    fetch(API_URL, {
        method: 'GET'
    }).then((response) => {
        return response.json();
    }).then((data) => {
        buildPosts(data);
    })
}

const buildPosts = (blogPosts) => {
    let blogPostsContent = "";
    for(blogPost of blogPosts) {
        const postDate = new Date(parseInt(blogPost.added_date)).toDateString();
        const postImage = `${API_BASE_URL}${blogPost.post_image}`;
        blogPostsContent += `
        <article class="post">
            <div class="post-image" style="background-image: url(${postImage})"></div>
            <div class="post-content">
                <div class="post-date">${postDate}</div>
                <div class="post-title"><h4>${blogPost.title}</h4></div>
                <div class="post-description">${blogPost.description}</div>
            </div>
        </article>
        `
    }
    document.querySelector(".blog-posts").innerHTML = blogPostsContent;
}