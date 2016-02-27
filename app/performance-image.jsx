// PerformanceImage
import React from 'react';
import ReactDOM from 'react-dom'

class PerformanceImage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <p>
        performance image {this.props.image}
      </p>
    )
  }
}

export default PerformanceImage
