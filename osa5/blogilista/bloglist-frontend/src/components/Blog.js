import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({visible: !this.state.visible})
  }

  render () {
    const hideWhenVisible = {display: this.state.visible ? 'none' : ''}
    const showWhenVisible = {display: this.state.visible ? '' : 'none' }

    const showWhenOwn = {display: !this.props.blog.user || this.props.blog.user._id === this.props.id   ? '' : 'none'}
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5,
      marginTop: 5
    }
    return (
      <div onClick={this.toggleVisibility} style={blogStyle} className="wrapper">
        {
          this.state.visible ? 
        <div style={showWhenVisible}>
          <div className="title"> {this.props.blog.title}</div>
          <div className="url"> {this.props.blog.url}</div>
          <div className="likes">{this.props.blog.likes} <button onClick={this.props.likeBlog(this.props.blog)}> like </button></div>
          <div className="author">added by {this.props.blog.author}</div>
          <div> <button onClick={this.props.delete(this.props.blog) }style={showWhenOwn}>Delete</button></div>
        </div>
        :
        <div style={hideWhenVisible} className="basicInfo"> {this.props.blog.title} {this.props.blog.author} </div>
      }
      </div>
    )
  }

}


export default Blog