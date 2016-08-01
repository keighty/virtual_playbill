import React from 'react'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import PerformanceTitle from '../../../src/components/performance-title'

describe.only('<PerformanceTitle>', () => {
  const props = {
    title: 'foo',
  }

  it('should pass this canary test', () => {
    expect(true).to.be.true
  })

  it('should render an h4', function () {
    const wrapper = shallow(<PerformanceTitle {...props}/>)
    const title = wrapper.find('h4').text()

    expect(title).to.be.eql('foo')
  })
})
