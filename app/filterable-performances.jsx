import React from 'react';
import ReactDOM from 'react-dom'
import PerformanceFrame from './performance-frame.jsx'
// this is the class where we retrieve the data

class FilterablePerformances extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      performances: []
    }
  }

  componentDidMount () {
    this.serverRequest = $.get(this.props.source, function (res) {
      this.setState({
        performances: res
      })
    }.bind(this))
  }

  componentWillUnmount () {
    this.serverRequest.abort()
  }

  render () {
    return (
      <div>
        {
          this.state.performances.map(function (item) {
            return <PerformanceFrame key={item.id} performance={item} />
          })
        }
      </div>
    )
  }
}

export default FilterablePerformances
