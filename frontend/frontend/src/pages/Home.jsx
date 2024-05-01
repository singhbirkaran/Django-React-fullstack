import { useState, useEffect } from "react";
import api from "../api";
import Blog from "../components/Blog"
import "../styles/Home.css"

function Home() {
    const [blogs, setBlogs] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        getBlogs();
    }, []);

    const getBlogs = () => {
        api
            .get("/api/blogs/")
            .then((res) => res.data)
            .then((data) => {
                setBlogs(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteBlog = (id) => {
        api
            .delete(`/api/blogs/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Blog deleted!");
                else alert("Failed to delete blog.");
                getBlogs();
            })
            .catch((error) => alert(error));
    };

    const createBlog = (e) => {
        e.preventDefault();
        api
            .post("/api/blogs/", { content, title })
            .then((res) => {
                if (res.status === 201) alert("Blog created!");
                else alert("Failed to make Blog.");
                getBlogs();
            })
            .catch((err) => alert(err));
    };

    return (
        <div>
            <div>
                <h2>Blogs</h2>
                {blogs.map((blog) => (
                    <Blog blog={blog} onDelete={deleteBlog} key={blog.id} />
                ))}
            </div>
            <h2>Create a Blog</h2>
            <form onSubmit={createBlog}>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="content">Content:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
}

export default Home;