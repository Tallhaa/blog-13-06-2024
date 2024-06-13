import React, { useState } from "react";
import "./CreateBlog.css"
import { Navigate, useNavigate } from "react-router-dom";

const CreateBlog = ()=>{
    const [title, setTitle] = useState("");
    const [description,setDescription] = useState("");
    // const [tags,setTags] = useState("");
    const [image,setImage] = useState(null)
    const [category,setCategory] = useState("all")
    const Navigate = useNavigate()
    // const [tagList,setTagList] = useState([])

    // const handleTags = (e) => {
    //     e.preventDefault()

    //     if (tags) {
    //       setTagList([...tagList, tags]);
    //       setTags("");
    //     }
    //   };

      // const handleRemoveTag =(val)=>{
      //   setTagList(tagList.filter(a,i) => i!=val)
        
      // }

    const handleCreateBlog = async(e)=>{
        e.preventDefault()
        if(!title || !description || !image){
          alert("Enter all field")
        }
     else{
         // const tagarr = tags.split("").map(tag => tag.trim())
         console.log(image);
         // console.log(tags);
 
 
         let formData = new FormData();
         formData.append("title",title)
         formData.append("description",description)
         // formData.append("tags",tags)
         formData.append("image",image)
         formData.append("category",category)
 
         try{
         let createBlog = await fetch("http://localhost:5000/add-blog",{
             method:"post",
             body:formData
         })
        
         if(createBlog.ok){
           createBlog = await createBlog.json()
           console.log(createBlog);
           console.log('blog successfully created');
           Navigate("/")
          
         }
         else{
           console.log('Failed to create blog');
         }
         
         }catch(err){
             console.log(err);
         }      
     }
    

    }
    return(
        <>
        <form onSubmit={handleCreateBlog}>
        <div className="createBlogContiner">
          <div>
            {
              image && <div>
                <img src={URL.createObjectURL(image)} alt="" />
              </div>
            }
          </div>
            <div className="createBlogContinerinner">
                <div style={{marginBottom:"10px"}}>
                <label>+</label>
            <input type="file" onChange={(e) => setImage(e.target.files[0])}
            accept=".jpg,.png,.jpeg"
            />
                </div>
                <input type="text"  placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                <select value={category} onChange={(e)=> setCategory(e.target.value)}>
                  <option value="all" >All</option>
                  <option value="technology">Technology</option>
                  <option value="programming">Programming</option>
                  <option value="news">News</option>
                  <option value="business">Business</option>

                </select>

            </div>
        
           <div className="createBlogContinerinner">
           <textarea name="" id="" cols="30" rows="10" style={{marginBottom:"10px"}} value={description}
           onChange={(e) => setDescription(e.target.value)}
           ></textarea>
            {/* <input type="text" placeholder="Enter tags separated by commas" value={tags} onChange={(e)=> setTags(e.target.value)}/>
            <button onClick={handleTags}>Add Tag</button>
            {tagList.map((item, i) => (
                <span key={i}>
                  {item}
                  <span style={{cursor:"pointer"}} onClick={()=> handleRemoveTag(i)}>X</span>
                </span>
              ))} */}

           </div>
           <button type="submit">Create Blog</button>
           
        </div>
        </form>
      

        </>
    )
}

export default CreateBlog;