import { useEffect, useState } from "react";
import "./UpdateBlog.css";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBlog = () => {
  let { id } = useParams();
  const Navigate = useNavigate();
  const [title, setTitle] = useState("");

  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const singleBlogFunction = async () => {
    try {
      let singleBlog = await fetch(`http://localhost:5000/blog/${id}`);
      singleBlog = await singleBlog.json();
      console.log(singleBlog);
      setImage(singleBlog.image);
      setTitle(singleBlog.title);
      setDescription(singleBlog.description);
    } catch (error) {
      console.log({ message: "failed to fetch single blog", error: error });
    }
  };

  useEffect(() => {
    singleBlogFunction();
  }, []);

  const handleUpdateBlog = async (e) => {
    e.preventDefault();

    try {
      let updateblog = await fetch(`http://localhost:5000/update-blog/${id}`, {
        method: "Put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });
      updateblog = await updateblog.json();
      console.log(updateblog);
      Navigate("/");
    } catch (error) {
      console.log("blog not updated", error);
    }
  };
  return (
    <>
      <form onSubmit={handleUpdateBlog}>
        <div className="updateblog-container">
          <div
            style={{
              width: "50%",
              margin: "0 auto",
              overflow: "hidden",
              height: "50%",
            }}
          >
            <img
              className=""
              style={{ width: "100%", height: "auto" }}
              src={image ? `http://localhost:5000/images/${image}` : ""}
              alt=""
            />
          </div>

          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            style={{ marginBottom: "10px" }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <button type="submit">Update Blog</button>
        </div>
      </form>
    </>
  );
};

export default UpdateBlog;
