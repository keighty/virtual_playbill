import React from 'react';
import ReactDOM from 'react-dom'

class SearchBar extends React.Component {
  render() {
    return <form>
        <input type="text" placeholder='Search shows, actors, company, etc' />
      </form>
  }
}

export default SearchBar
