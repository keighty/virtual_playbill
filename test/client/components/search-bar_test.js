import React from 'react'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import SearchBar from '../../../src/components/search-bar'

describe('<SearchBar>', () => {
  it('should pass this canary test', () => {
    expect(true).to.be.true
  })

  it('should render an input', function () {
    const wrapper = shallow(<SearchBar />)
    const input = wrapper.find('input')

    expect(input.length).to.be.eql(1)
    expect(wrapper.html()).to.be.eql('<input type="text" placeholder="Search shows, actors, company, etc"/>')
  })
})
