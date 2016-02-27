// PerformanceTitle
import React from 'react';
import ReactDOM from 'react-dom'

class PerformanceTitle extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <p>
        performance title: {this.props.title}
      </p>
    )
  }
}

export default PerformanceTitle

