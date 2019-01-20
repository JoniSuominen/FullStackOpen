import React from 'react'
import { mount } from 'enzyme'
import Wrapper from './Wrapper'

it('renders content', () => {
  const onSubmit = jest.fn()

  const wrapper = mount(
    <Wrapper onSubmit={onSubmit}/>
  )

  const input = wrapper.find('input')
  const button = wrapper.find('button')

  input.simulate('change', {target: {value: 'lomakkeiden testaus on hankalaa'}})
  button.simulate('submit')
  
})