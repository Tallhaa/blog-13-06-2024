import { useEffect, useState } from "react";
import BASE_URL from "../../api/baseUrl";
import BlogCard from "./BlogCard/BlogCard";
import "./ReadBlogs.css";
import Categories from "../../components/Categories/Categories";

const ReadBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [originalBlogs, setOriginalBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const AllBlogsList = async () => {
    try {
      let blogList = await fetch(`${BASE_URL}/`);
      blogList = await blogList.json();
      setBlogs(blogList);
      setOriginalBlogs(blogList);
      setLoading(false);
      console.log("all blogs fetched", blogList);
      console.log(blogList.category);
    } catch (err) {
      console.log("failed to fetch all blogs", err);
      setLoading(false);
    }
  };

  const filterCategory = (category) => {
    if (category === "all") {
      setBlogs(originalBlogs);
    } else {
      const filtered = originalBlogs.filter(
        (blog) => blog.category.toLowerCase() === category
      );
      setBlogs(filtered);
    }
  };

  useEffect(() => {
    AllBlogsList();
  }, []);
  return (
    <div className="blog-containerwrapper">
      <div className="blog-container">
        {loading ? (
          <p style={{ padding: "20px", fontStyle: "italic" }}>
            Loading blogs...
          </p>
        ) : blogs.length === 0 ? (
          <p style={{ padding: "20px", fontStyle: "italic" }}>
            No blogs found in this category.
          </p>
        ) : (
          blogs.map((blog) => (
            <div key={blog._id}>
              <BlogCard blog={blog} />
            </div>
          ))
        )}
      </div>
      <Categories onCategorySelect={filterCategory} />
    </div>
  );
};

export default ReadBlogs;
