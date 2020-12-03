

const API_URL = "https://back-end-blog-app.herokuapp.com/api/posts";
const API_BASE_URL = "https://back-end-blog-app.herokuapp.com/";

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
        const postLink = `/post.html?id=${blogPost.id}`;
        blogPostsContent += `
        <a class="post-link" href="${postLink}">
            <article class="post">
                <div class="post-image">
                    <img src="${postImage}">
                </div>
                <div class="post-content">
                    <div class="post-date">${postDate}</div>
                    <div class="post-title"><h4>${blogPost.title}</h4></div>
                    <div class="post-description">${blogPost.description}</div>
                </div>
            </article>
        </a>
        `
    }
    document.querySelector(".blog-posts").innerHTML = blogPostsContent;
}