// PerformanceDate
import React from 'react';
import ReactDOM from 'react-dom'
import moment from 'moment'

class PerformanceDate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formattedDate: moment(this.props.date).format('MMM D YYYY')
    }
  }

  render() {
    return <p style={ticketDate}>{this.state.formattedDate}</p>
  }
}

PerformanceDate.propTypes = {
  date: React.PropTypes.string
}

let ticketDate = {
  textAlign: 'center',
  margin: '0 0 10px'
}

export default PerformanceDate
