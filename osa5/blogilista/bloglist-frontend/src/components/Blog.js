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

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5,
      marginTop: 5
    }

    return (
      <div onClick={this.toggleVisibility} style={blogStyle}>
        {
          this.state.visible ? 
        <div style={showWhenVisible}>
          <div> {this.props.blog.title}</div>
          <div> {this.props.blog.url}</div>
          <div>{this.props.blog.likes} <button> like </button></div>
          <div>added by {this.props.blog.author}</div>
        </div>
        :
        <div style={hideWhenVisible}> {this.props.blog.title} {this.props.blog.author} </div>
      }
      </div>
    )
  }

}


export default Blog