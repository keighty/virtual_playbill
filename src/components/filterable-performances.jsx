import React from 'react';
import ReactDOM from 'react-dom'
import PerformanceFrame from '../components/performance-frame.jsx'

class FilterablePerformances extends React.Component {
  render () {
    return (
      <div>
        {
          this.props.performances.map(function (item) {
            return <PerformanceFrame key={item.id} performance={item} />
          })
        }
      </div>
    )
  }
}

export default FilterablePerformances
