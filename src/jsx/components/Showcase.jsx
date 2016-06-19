'use strict';

import React from 'react'

export default class Showcase extends React.Component {
  handleClickCloseButton(e) {
    e.preventDefault();
    this.setState({id: null});
  }

  render() {
    let url;
    let tweet = this.props.tweets.filter((item) => {
      return (item.id == this.props.targetId);
    });
    if(tweet.length > 0){
      url = tweet[0].entities.media[0].media_url;
    }else{
      return false;
    }
    return(
      <div className='showcase'>
        <a onClick={this.handleClickCloseButton.bind(this)}>
          <img src={url} />
        </a>
      </div>
    );
  }
}
