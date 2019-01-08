import React from 'react'

const BlogForm = ({addBlog, newBlog, handleBlogChange}) => {
  return (
    <div>
      <form onSubmit={addBlog}>
        <input 
        value={newBlog}
        name="blog"
        onChange={handleBlogChange}
        />

        <button type="submit">tallenna</button>
      </form>
    </div>
  )
}

export default BlogForm