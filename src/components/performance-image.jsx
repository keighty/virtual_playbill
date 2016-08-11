import React from 'react';
import ReactDOM from 'react-dom'

export class PerformanceImage extends React.Component {
  render() {
    return (
      <img style={imageStyle} src={this.props.image} />
    )
  }
}

PerformanceImage.propTypes = {
  image: React.PropTypes.string.isRequired
}

let imageStyle = {
  margin: 'auto',
  display: 'block',
  width: '250px',
  height: '300px',
  paddingBottom: '15px'
}

export default PerformanceImage
