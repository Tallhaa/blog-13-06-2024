import React, { useEffect, useState } from "react";
import "./SingleBlog.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Categories from "../../components/Categories/Categories";

const SingleBlog = () => {
  const [blog, setBlog] = useState({});
  let { id } = useParams();
  console.log(id);
  const Navigate = useNavigate();

  const singleBlogFunction = async () => {
    try {
      let singleBlog = await fetch(`http://localhost:5000/blog/${id}`);
      singleBlog = await singleBlog.json();
      console.log(singleBlog);
      setBlog(singleBlog);
      // if(singleBlog.ok){

      // }
    } catch (error) {
      console.log({ message: "failed to fetch single blog", error: error });
    }
  };
  const handleDeleteBlog = async (id) => {
    try {
      console.log(id);
      let deleteSingleBlog = await fetch(`http://localhost:5000/del/${id}`, {
        method: "Delete",
      });
      deleteSingleBlog = await deleteSingleBlog.json();
      console.log(deleteSingleBlog);
      if (deleteSingleBlog) {
        Navigate("/");
      }
    } catch (error) {
      console.log({ message: "failed to fetch single blog", error: error });
    }
  };
  useEffect(() => {
    singleBlogFunction();
  }, []);
  return (
    <div className="single-blog-container">
      <div className="single-blog-details">
        <h2>{blog.title}</h2>
        <div style={{ maxWidth: "800px" }}>
          <img
            className="single-blog-img"
            src={blog.image ? `http://localhost:5000/images/${blog.image}` : ""}
            alt=""
          />
        </div>
        <Link to={`/update-blog/${blog._id}`}>
          <button className="single-blog-editbtn">Edit</button>
        </Link>
        <button
          className="single-blog-deletebtn"
          onClick={() => handleDeleteBlog(blog._id)}
        >
          Delete
        </button>
        <p>{blog.description}</p>
      </div>
    </div>
  );
};

export default SingleBlog;
