import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
jest.mock('./services/blogs')
import blogService from './services/blogs'


describe('<App />', () => {
  let app


  describe('when user is not logged in', () => {

    beforeEach(() => {
      app = mount (<App />)
    })
    it('does not render blogs if not logged in', () => {
      app.update()
  
      const blogComponents = app.find(Blog)
  
      const nameDiv = app.find('.login')
      nameDiv.simulate('click')
  
      expect(app.exists('form')).toEqual(true)
      expect(blogComponents.length).toEqual(0)  
    })
  })

  describe('when user is logged in', () => {
    
    beforeEach(() => {
      const user = {
        username: 'tester',
        token: '1231231214',
        name: 'Teuvo Testaaja'
      }
        
      localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      app = mount (<App />)
    })

    it ('renders blogs if user is logged in', () => {
        app.update()
        const blogComponents = app.find(Blog)
        expect(blogComponents.length).toEqual(blogService.blogs.length)

    })
  })


})