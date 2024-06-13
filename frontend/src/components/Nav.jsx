import React from 'react'
import {Link} from "react-router-dom"

const Nav = () => {
  return (
    <div className="nav" style={{display:"flex", justifyContent:"space-between", padding:"20px 70px", borderBottom:"1.3px solid rgb(207, 206, 206)"}}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>InterviewBit</Link>
        <ul style={{ display: 'flex', listStyle: 'none' }}>
        <li style={{ margin: '0 10px' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>All Blogs</Link>
        </li>
        <li style={{ margin: '0 10px' }}>
          <Link to="/add-blog" style={{ textDecoration: 'none', color: 'inherit' }}>Add Blog</Link>
        </li>
      </ul>
    </div>
  )
}

export default Nav