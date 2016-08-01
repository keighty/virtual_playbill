// PerformanceTitle
import React from 'react';
import ReactDOM from 'react-dom'

class PerformanceTitle extends React.Component {
  render() {
    return <h4 style={title}>{this.props.title}</h4>
  }
}

let title = {
  padding: '5px 20px',
  textAlign: 'center',
  margin: '0',
  fontSize: '1.75em'
}

export default PerformanceTitle
