// PerformanceDate
import React from 'react';
import ReactDOM from 'react-dom'

class PerformanceDate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formattedDate: new Date(Date.parse(this.props.date)).toDateString()
    }
  }

  render() {
    return <p style={ticketDate}>{this.state.formattedDate}</p>
  }
}

let ticketDate = {
  textAlign: 'center',
  margin: '0 0 10px'
}

export default PerformanceDate

