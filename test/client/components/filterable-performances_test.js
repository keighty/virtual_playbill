import React from 'react'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import FilterablePerformances from '../../../src/components/filterable-performances'
import PerformanceFrame from '../../../src/components/performance-frame'

describe('<FilterablePerformances />', () => {
  it('should pass this canary test', () => {
    expect(true).to.be.true
  })

  it('should return a performance frame for every performance', () => {
    const props = {
      performances: [
        {title: 'foo', id: '1'},
        {title: 'bar', id: '2'},
      ],
    }

    const wrapper = shallow(<FilterablePerformances {...props} />)
    expect(wrapper.containsAllMatchingElements([
      <PerformanceFrame />,
      <PerformanceFrame />,
    ])).to.be.true
  })
})
