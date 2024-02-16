import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import Blog from './Blog'

const UserBlogs = () => {
  const [user, setUser] =useState();


  const userId = localStorage.getItem("userId");
  const sendRequest = async () => {
    
    const res = await axios
      .get(`http://localhost:5000/api/blog/user/${userId}`)
      .catch((error) => console.log(error));
    const data = await res.data;
    console.log(data);
   
    return data;
  }
useEffect(() => {
  sendRequest().then((data)=>setUser(data.user))
},[userId]);
console.log(user);

  return (
    <div>
      {""}
      {user && user.blogs &&
        user.blogs.map((blog, index) => (
          <Blog
          key={index}
          id={blog._id}
          isUser={true}
            title={blog.title}
            description={blog.description}
            imageUrl={blog.image}
            userName={user.name}
          />
        ))}
    </div>
  )
}

export default UserBlogs
