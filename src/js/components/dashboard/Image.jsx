import React from 'react'

export default class Image extends React.Component {
  render() {
    return(
      <div className='image'>
        <h3 className='screenName'>
          {this.props.screenName}
        </h3>
        <span>{this.props.children.toString()}</span>
      </div>
    );
  }
}
