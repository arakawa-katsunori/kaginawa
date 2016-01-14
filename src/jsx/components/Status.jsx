import React from 'react'

export default class Status extends React.Component {
  render() {
    return(
      <div className='status'>
        <h2>
          {this.props.query}
        </h2>
      </div>
    );
  }
}
