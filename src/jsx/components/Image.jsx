import React from 'react'

export default class Image extends React.Component {
  handleChange(e) {
    let value = e.target.value;
    let checked = e.target.checked;
    this.props.onCheckboxChanged(value, checked);
  }

  handleClickShowcase(e) {
    e.preventDefault();
    this.props.onShowButtonClicked(this.props.tweetId);
  }

  render() {
    return(
      <div className='image'>
        <input
          type='checkbox'
          name='selectImages'
          id={this.props.tweetId}
          value={this.props.imageUrl}
          onChange={this.handleChange.bind(this)}
        />
        <label htmlFor={this.props.tweetId} className='checkIcon'>
          <i className='fa fa-check' />
        </label>
        <label htmlFor={this.props.tweetId}>
          <img
            ref={'imageId_' + this.props.tweetId}
            src={this.props.imageUrl}
            width={this.props.width+'px'}
            height={this.props.height+'px'}
          />
        </label>
        <div className='imageMenu'>
          <a
            className='imageMenuLinks'
            onClick={this.handleClickShowcase.bind(this)}
          >
            <i className='fa fa-film' />
          </a>
          <a
            className='imageMenuLinks'
            href={this.props.tweetLink}
            target='_blank'
          >
            <i className='fa fa-twitter' />
          </a>
          <a
            className='imageMenuLinks'
            href={'https://twitter.com/intent/favorite?tweet_id=' + this.props.tweetIdStr}
            target='_blank'
          >
            <i className='fa fa-heart' />
          </a>
          <a
            className='imageMenuLinks'
            href={'https://twitter.com/intent/retweet?tweet_id=' + this.props.tweetIdStr}
            target='_blank'
          >
            <i className='fa fa-retweet' />
          </a>
        </div>
      </div>
    );
  }
}
