// PerformanceImage
import React from 'react';
import ReactDOM from 'react-dom'

class PerformanceImage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <img style={imageStyle} src={this.props.image} />
    )
  }
}

let imageStyle = {
  margin: 'auto',
  display: 'block',
  width: '250px',
  height: '300px',
  paddingBottom: '15px'
}

export default PerformanceImage
