import React from 'react';
import ReactDOM from 'react-dom'
import moment from 'moment'

export class PerformanceDate extends React.Component {
  render() {
    const formattedDate = () => {
      if (this.props.date) return moment(this.props.date).format('MMM D YYYY')
      else return 'No date'
    }
    return <p style={ticketDate}>{formattedDate()}</p>
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
