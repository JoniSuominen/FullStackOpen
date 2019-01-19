import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {

  const newBlog = {
    title: 'mock testejä',
    author: 'Joni Suominen',
    likes: 5
  }
  it ('renders content', () => {
    const blogComponent = shallow(<SimpleBlog blog={newBlog}/>)
    const blogContent = blogComponent.find('.content')
    const blogLikes = blogComponent.find('.likes')

    expect(blogComponent.text()).toContain(newBlog.title)
    expect(blogComponent.text()).toContain(newBlog.author)
    expect(blogLikes.text()).toContain(newBlog.likes)
  })

  it('clicking the button twice calls the event handler twice', () => {


    const mockHandler = jest.fn()

    const blogComponent = shallow(
      <SimpleBlog
        blog={newBlog}
        onClick={mockHandler}
      />
    )
    
    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})