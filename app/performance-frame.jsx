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
      date: props.performance.ticketDate,
      image: props.performance.image
    }
  }

  render() {
    return (
      <div style={performanceUnit}>
        <div style={body}>
          <h4 style={header}>Virtual Playbill</h4>
          <PerformanceTitle title={this.state.title} />
          <PerformanceDate date={this.state.date} />
          <PerformanceImage image={this.state.image} />
        </div>
      </div>
    )
  }
}

let performanceUnit = {
  position: 'relative',
  maxWidth: '400px',
  margin: 'auto'
}

let header = {
  padding: '3px 0',
  border: '3px solid black' ,
  margin: '-2px',
  textAlign: 'center',
  backgroundColor: '#ffea00',
  fontFamily: 'Georgia serif',
  fontWeight: 'bold',
  letterSpacing: '1px',
  fontSize: '1.5em'
}

let body = {
  border: '2px solid black',
  cursor: 'pointer',
  marginBottom: '20px'
}

export default PerformanceFrame
