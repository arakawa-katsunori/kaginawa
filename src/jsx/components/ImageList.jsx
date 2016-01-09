import React from 'react'
import Image from './image'

export default class ImageList extends React.Component {
  render() {
    var tweetNodes = this.props.data.statuses.map((tweet)=> {
      let imgUrl = null;
      let link = tweet.id_str;
      if(!(tweet.entities.media === undefined) && !tweet.retweeted_status){
        for(let i in tweet.entities.media){
          imgUrl = tweet.entities.media[i].media_url
          return(
            <Image
              key={tweet.id + tweet.user.id}
              screenName={tweet.user.screen_name}
              imageUrl = {imgUrl}
              tweetLink = {link}
            >
              {tweet.text}
            </Image>
          );
        }
      }
    });
    return(
      <div className='imageList'>
        {tweetNodes}
      </div>
    );
  }
}
