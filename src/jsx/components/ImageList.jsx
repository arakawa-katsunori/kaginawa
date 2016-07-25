import React from 'react'
import Image from './Image'

export default class ImageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boxWidth: window.innerWidth - 1
    };
  }
  handleResize(e) {
    this.setState({boxWidth: window.innerWidth - 1});
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this));
  }
  render() {
    const defaultHeight = 180;
    const margin = 2;
    let boxWidth = this.state.boxWidth;
    let imageWidthSum = 0;
    let currentLine = 1;
    let lineHeight = [];

    let prepare = this.props.data.tweets.map((tweet) => {
      let imageWidth = tweet.entities.media[0].sizes.large.w / (tweet.entities.media[0].sizes.large.h / defaultHeight);
      let result = {
        key: tweet.id + tweet.user.id,
        id: tweet.id,
        screenName: tweet.user.screen_name,
        imageUrl: tweet.entities.media[0].media_url,
        id_str: tweet.id_str,
        width: imageWidth,
        line: currentLine
      };
      imageWidthSum += imageWidth;
      if (imageWidthSum >= boxWidth) {
        lineHeight[currentLine] = defaultHeight * (boxWidth / (imageWidthSum - imageWidth));
        result.line = currentLine + 1;
        imageWidthSum = imageWidth;
        currentLine++;
      }
      return result;
    });

    let tweetNodes = prepare.map((tweet) => {
      return(
        <Image
          key={tweet.key}
          tweetId={tweet.id}
          tweetIdStr={tweet.id_str}
          imageUrl={tweet.imageUrl}
          tweetLink={'https://twitter.com/' + tweet.screenName + '/status/' + tweet.id_str}
          width={tweet.width * (lineHeight[tweet.line] / defaultHeight) - (margin * 2)}
          height={lineHeight[tweet.line] || defaultHeight}
          onCheckboxChanged={this.props.onCheckboxChanged.bind(this)}
          onShowButtonClicked={this.props.onShowButtonClicked.bind(this)}
        />
      );
    });
    return(
      <div className='container clearfix' ref='imageList'>
        {tweetNodes}
      </div>
    );
  }
}
