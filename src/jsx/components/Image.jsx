import React from 'react'

export default class Image extends React.Component {
  handleChange(e) {
    let value = e.target.value;
    let checked = e.target.checked;
    if (checked) {
      this.props.onImageCheckboxChanged(value, checked);
    } else {
      this.props.onImageCheckboxChanged(value, checked);
    }
  }

  render() {
    return(
      <div className='image'>
        <input
          type='checkbox'
          name='selectImages'
          id={this.props.elemId}
          value={this.props.imageUrl}
          onChange={this.handleChange.bind(this)}
        />
        <label htmlFor={this.props.elemId} className='checkIcon'>
          <i className="fa fa-check"></i>
        </label>
        <label htmlFor={this.props.elemId}>
          <a href={'https://twitter.com/' + this.props.screenName + '/status/' + this.props.tweetLink} >
            <i className="fa fa-info"></i>
          </a>
          <img
            src={this.props.imageUrl}
            width={this.props.width+'px'}
            height={this.props.height+'px'}
          />
        </label>
      </div>
    );
  }
}
