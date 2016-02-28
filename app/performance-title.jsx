// PerformanceTitle
import React from 'react';
import ReactDOM from 'react-dom'

class PerformanceTitle extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <h4 style={title}>{this.props.title}</h4>
  }
}

let title = {
  padding: '5px',
  'text-align': 'center',
  'margin-bottom': '0px'
}

export default PerformanceTitle

