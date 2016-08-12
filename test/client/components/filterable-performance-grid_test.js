import React from 'react'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import FilterablePerformanceGrid from '../../../src/containers/filterable-performance-grid'
import SearchBar from '../../../src/components/search-bar'
import FilterablePerformances from '../../../src/components/filterable-performances'

describe('<FilterablePerformanceGrid />', () => {
  it('should pass this canary test', () => {
    expect(true).to.be.true
  })

  it('should render a searchbar and filterablePerformances', () => {
    const wrapper = shallow(<FilterablePerformanceGrid />)
    expect(wrapper.containsAllMatchingElements([
      <SearchBar />,
      <FilterablePerformances />,
    ])).to.be.true
  })
})
