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
      image: props.performance.image
    }
  }

  render() {
    return (
      <div style={performanceUnit}>
        <div style={body}>
          <h4 style={header}>Virtual Playbill</h4>
          <PerformanceTitle title={this.state.title} />
          <PerformanceImage image={this.state.image} />
        </div>
      </div>
    )
  }
}

let performanceUnit = {
  position: 'relative',
  'max-width': '400px',
  margin: 'auto'
}

let header = {
  padding: '3px 0',
  border: '3px solid black' ,
  margin: '-2px',
  'text-align': 'center',
  'background-color': '#ffea00',
  'font-family': 'Georgia serif',
  'font-weight': 'bold',
  'letter-spacing': '1px',
  'font-size': '1.5em'
}

let body = {
  border: '2px solid black',
  cursor: 'pointer',
  'margin-bottom': '20px'
}

export default PerformanceFrame
