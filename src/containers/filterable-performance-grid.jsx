import React from 'react';
import ReactDOM from 'react-dom'
import SearchBar from '../components/search-bar.jsx'
import FilterablePerformances from '../containers/filterable-performances.jsx'

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

if (typeof window !== 'undefined') {
  ReactDOM.render(<PerformanceGrid />,
    document.getElementById('playbillIndex'))
}
