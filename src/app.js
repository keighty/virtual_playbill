import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router'
import { FilterablePerformanceGrid } from './containers/filterable-performance-grid'

class App extends Component {
  render () {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={Container} >
          <IndexRoute component={FilterablePerformanceGrid} />
          <Route path='*' component={NotFound} />
        </Route>
      </Router>
    )
  }
}
const NotFound = () => <h1>404.. This page is not found!</h1>

const Nav = () => (
  <div>
    <Link to='/'>Home</Link>
  </div>
)

const Container = (props) => {
  return (
    <div>
    <Nav />
    {props.children}
    </div>
  )

}

export default App
