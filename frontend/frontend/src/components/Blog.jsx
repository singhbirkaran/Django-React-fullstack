import React from "react";
import "../styles/Blog.css"

function Blog({ blog, onDelete }) {
    const formattedDate = new Date(blog.created_at).toLocaleDateString("en-US")

    return (
        <div className="note-container">
            <p className="note-title">{blog.title}</p>
            <p className="note-content">{blog.content}</p>
            <p className="note-date">{formattedDate}</p>
            <button className="delete-button" onClick={() => onDelete(blog.id)}>
                Delete
            </button>
        </div>
    );
}

export default Blog