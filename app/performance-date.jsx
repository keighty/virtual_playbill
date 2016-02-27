// PerformanceDate
import React from 'react';
import ReactDOM from 'react-dom'

class PerformanceDate extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <p>
        performance date {this.props.date}
      </p>
    )
  }
}

export default PerformanceDate

