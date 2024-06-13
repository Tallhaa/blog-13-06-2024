import { useEffect, useState } from 'react';
import BlogCard from "./BlogCard/BlogCard"
import "./ReadBlogs.css"

const ReadBlogs = () => {
  const [blogs,setBlogs] = useState([])
  const [originalBlogs, setOriginalBlogs] = useState([]);  // const [category, setCategory] = useState("all")
  const AllBlogsList = async() =>{
    try{
      let blogList = await fetch(`http://localhost:5000/`);
        blogList = await blogList.json()
        setBlogs(blogList)
        setOriginalBlogs(blogList)
        console.log('all blogs fetched',blogList);
        console.log(blogList.category);
      }catch(err){
          console.log("failed to fetch all blogs",err);
      }      
  }

  const filterCategory = (category) => {
   
    if (category === "all") {
      setBlogs(originalBlogs);
    } else {
      const filterCategoryData = originalBlogs.filter((val) => val.category === category);
      setBlogs(filterCategoryData);
    }
  }

  
  useEffect(()=>{
    AllBlogsList()
  },[])
  return (
    <div className='blog-list'>
      <div className="blog-container">
      {
        blogs?.map((blog)=>
        <div key={blog._id}>
        <div  >
          <BlogCard blog={blog}/>
        </div>    
        </div>
        )
        
      }

      </div>  
     
      


    </div>
  )
}

export default ReadBlogs;