import React from 'react';
import ReactDOM from 'react-dom'
import PerformanceTitle from './performance-title.jsx'
import PerformanceDate from './performance-date.jsx'
import PerformanceImage from './performance-image.jsx'

class PerformanceFrame extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.performance.title,
      date: props.performance.date,
      image: props.performance.image
    }
  }

  render() {
    return (
      <div>
        <PerformanceTitle title={this.state.title} />
        <PerformanceImage image={this.state.image} />
      </div>
    )
  }
}

export default PerformanceFrame
