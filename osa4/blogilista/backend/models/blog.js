const mongoose = require('mongoose')
var Schema = mongoose.Schema

var blogSchema = new Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

blogSchema.statics.format = function(blog, cb) {
    return {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        id: blog.id
    }   
}

blogSchema.statics.formatWithoutId = function(blog, cb) {
    return {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
    }   
}

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog;