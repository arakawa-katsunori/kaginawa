import React from 'react'
import Image from './image'

export default class ImageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boxWidth: 0
    };
  }
  render() {
    const defaultHeight = 180;
    const lineWidth = 1150;
    let imageWidthSum = 0;
    let currentLine = 1;
    let lineHeight = [];

    let prepare = this.props.data.tweets.map((tweet) => {
      let imageWidth = tweet.entities.media[0].sizes.large.w / (tweet.entities.media[0].sizes.large.h / defaultHeight);
      let result = {
        key: tweet.id + tweet.user.id,
        elemId: tweet.id,
        imageUrl: tweet.entities.media[0].media_url,
        tweetLink: tweet.id_str,
        line: currentLine
      };
      imageWidthSum += imageWidth;
      if (imageWidthSum >= lineWidth) {
        lineHeight[currentLine] = defaultHeight * (lineWidth / (imageWidthSum - imageWidth));
        result.line = currentLine + 1;
        imageWidthSum = imageWidth;
        currentLine++;
      }
      return result;
    });

    let tweetNodes = prepare.map((tweet) => {
      return(
        <Image
          key = {tweet.key}
          elemId = {tweet.elemId}
          imageUrl = {tweet.imageUrl}
          tweetLink = {tweet.tweetLink}
          height = {lineHeight[tweet.line] || defaultHeight}
          line={tweet.line}
        />
      );
    });
    return(
      <div className='imageList clearfix' ref='imageList'>
        {tweetNodes}
      </div>
    );
  }
}
