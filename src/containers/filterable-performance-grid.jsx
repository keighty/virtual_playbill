import React from 'react';
import ReactDOM from 'react-dom'
import SearchBar from '../components/search-bar.jsx'
import FilterablePerformances from '../components/filterable-performances'

export class FilterablePerformanceGrid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      performances: []
    }
  }

  componentDidMount () {
    this.serverRequest = $.get('/user/1/performances', function (res) {
      this.setState({
        performances: res
      })
    }.bind(this))
  }

  componentWillUnmount () {
    this.serverRequest.abort()
  }

  render() {
    return (
      <div>
        <SearchBar />
        <FilterablePerformances performances={this.state.performances} />
      </div>
    )

  }
}

export default FilterablePerformanceGrid
