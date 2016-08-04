import React from 'react';
import ReactDOM from 'react-dom'
import SearchBar from './search-bar.jsx'
import FilterablePerformances from './filterable-performances.jsx'

// TODO: get the user id
class PerformanceGrid extends React.Component {
  render() {
    return (
      <div>
        <SearchBar />
        <FilterablePerformances source='/user/1/performances' />
      </div>
    )

  }
}

ReactDOM.render(<PerformanceGrid />,
  document.getElementById('playbillIndex'))
