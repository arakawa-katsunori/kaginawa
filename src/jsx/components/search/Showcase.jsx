import React from 'react'

export default class Showcase extends React.Component {
  handleClickCloseButton(e) {
    e.preventDefault();
    this.setState({id: null});
  }

  render() {
    return(
      <div className='showcase'>
        <a onClick={this.handleClickCloseButton.bind(this)}>
          <img src={''+ this.props.params.imageId} />
        </a>
      </div>
    );
  }
}
