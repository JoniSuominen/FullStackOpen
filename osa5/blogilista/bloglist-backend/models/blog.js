const mongoose = require('mongoose')
var Schema = mongoose.Schema

var blogSchema = new Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

blogSchema.statics.format = function(blog, cb) {
    return {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        _id: blog._id,
        user: blog.user
    }   
}

blogSchema.statics.formatWithoutId  = function(blog, cb) {
    return {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
    }   
}

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog;