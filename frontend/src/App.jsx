import './App.css'
import CreateBlog from './Blogs/CreateBlog/CreateBlog'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReadBlogs from './Blogs/ReadBlogs/ReadBlogs';
import NoPage from './Blogs/NoPage/NoPage';
import SingleBlog from './Blogs/SingleBlog/SingleBlog';
import UpdateBlog from './Blogs/ReadBlogs/Update Blog/UpdateBlog';
import Nav from './components/Nav';


function App() {

  return (
     <BrowserRouter>
     <Nav/>
      <Routes>
          <Route path="/" element={<ReadBlogs />} />
          <Route path="/add-blog" element={<CreateBlog />} />
          <Route path="/blog/:id" element={<SingleBlog />} />
          <Route path="/update-blog/:id" element={<UpdateBlog />} />
          <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
