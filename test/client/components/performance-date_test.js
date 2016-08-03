import React from 'react'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import PerformanceDate from '../../../src/components/performance-date'

describe('<PerformanceDate>', () => {
  const props = {
    date: '2016-01-24',
  }

  it('should pass this canary test', () => {
    expect(true).to.be.true
  })

  it('should render a styled date', function () {
    const wrapper = shallow(<PerformanceDate {...props}/>)
    const dateTag = wrapper.find('p')

    expect(dateTag.length).to.be.eql(1)
    expect(dateTag.text()).to.be.eql('Jan 24 2016')
  })

  it('should indicate no date if none given', function () {
    const wrapper = shallow(<PerformanceDate />)
    const dateTag = wrapper.find('p')

    expect(dateTag.text()).to.be.eql('No date')
  })
})
