import React from 'react'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import PerformanceFrame from '../../../src/components/performance-frame'

describe('<PerformanceFrame>', function () {
  const props = {
    performance : {
      title: 'Title of Show',
      ticketDate: '2016-01-24',
      image: 'http://foobar.png',
    },
  }

  it('should pass this canary test', () => {
    expect(true).to.be.true
  })

  it('should render the frame', function () {
    const wrapper = shallow(<PerformanceFrame {...props}/>)

    expect(wrapper.find('h4').text()).to.be.eql('Virtual Playbill')
    expect(wrapper.find('PerformanceTitle').length).to.be.eql(1)
    expect(wrapper.find('PerformanceDate').length).to.be.eql(1)
    expect(wrapper.find('PerformanceImage').length).to.be.eql(1)
  })
})
