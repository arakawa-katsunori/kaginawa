import React from 'react'
import Image from './image'

export default class ImageList extends React.Component {
  render() {
    var tweetNodes = this.props.data.statuses.map((tweet)=> {
      return(
        <Image
          key={tweet.id + tweet.user.id}
          screenName={tweet.user.screen_name}
        >
          {tweet.text}
        </Image>
      );
    });
    return(
      <div className='imageList'>
        {tweetNodes}
      </div>
    );
  }
}
