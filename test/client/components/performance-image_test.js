import React from 'react'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import PerformanceImage from '../../../src/components/performance-image'

describe('<PerformanceImage>', () => {
  const props = {
    image: 'http://foo.png',
  }

  it('should pass this canary test', () => {
    expect(true).to.be.true
  })

  it('should render an image', function () {
    const wrapper = shallow(<PerformanceImage {...props}/>)
    const image = wrapper.find('img')

    expect(image.length).to.be.eql(1)
    expect(wrapper.html()).to.be.eql('<img style="margin:auto;display:block;width:250px;height:300px;padding-bottom:15px;" src="http://foo.png"/>')
  })
})
