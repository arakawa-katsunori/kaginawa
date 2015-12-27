import React from 'react'
import Image from './image'

export default class ImageList extends React.Component {
  render() {
    var tweetNodes = this.props.data.statuses.map((tweet)=> {
      return(
        <Tweet screenName={tweet.user.screen_name}>
          {tweet.text}
        </Tweet>
      );
    });
    return(
      <div className='imageList'>
        {tweetNodes}
      </div>
    );
  }
}
