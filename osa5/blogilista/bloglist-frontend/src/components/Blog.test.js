import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {
  const newBlog = {
    title: 'mock testejä',
    author: 'Joni Suominen',
    url: 'https://github.com/airbnb/enzyme',
    likes: 5

  }

  it('after clicking name rest of the info are displayed', () => {
    const mockHandler = jest.fn()
    const blogComponent = shallow(
      <Blog 
        blog={newBlog}
        onClick={mockHandler}
        likeBlog={mockHandler}
        delete={mockHandler}
      />
    )
    const nameDiv = blogComponent.find('.wrapper')
    
    nameDiv.simulate('click')

    expect(blogComponent.find('.title').text()).toContain(newBlog.title)
    expect(blogComponent.find('.author').text()).toContain(newBlog.author)
    expect(blogComponent.find('.url').text()).toContain(newBlog.url)
    expect(blogComponent.find('.likes').text()).toContain(newBlog.likes)
  })

})
