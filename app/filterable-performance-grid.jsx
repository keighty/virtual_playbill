import React from 'react';
import ReactDOM from 'react-dom'
import SearchBar from './search-bar.jsx'

class FilterablePerformanceGrid extends React.Component {
  render() {
    return (
      <div>
        <SearchBar />
      </div>
    )

  }
}

ReactDOM.render(<FilterablePerformanceGrid />, document.getElementById('playbillIndex'))
