import React from 'react'
import Image from './image'

export default class ImageList extends React.Component {
  render() {
    var tweetNodes = this.props.data.tweets.map((tweet) => {
      let imgUrl = null;
      let link = tweet.id_str;
      for(let i in tweet.entities.media){
        imgUrl = tweet.entities.media[i].media_url
        return(
          <Image
            key = {tweet.id + tweet.user.id}
            elemId = {tweet.id}
            imageUrl = {imgUrl}
            tweetLink = {link}
            width = {tweet.entities.media[i].sizes.large.w}
            height = {tweet.entities.media[i].sizes.large.h}
          >
            {tweet.text}
          </Image>
        );
      }
    });
    return(
      <div className='imageList clearfix'>
        {tweetNodes}
      </div>
    );
  }
}
