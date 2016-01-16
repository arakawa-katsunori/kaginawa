import React from 'react'
import Image from './Image'

export default class ImageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boxWidth: window.innerWidth - 50
    };
  }
  handleResize(e) {
    this.setState({boxWidth: window.innerWidth - 50});
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this));
  }
  render() {
    const defaultHeight = 180;
    const padding = 2;
    const boxWidth = this.state.boxWidth;
    let imageWidthSum = 0;
    let currentLine = 1;
    let lineHeight = [];

    let prepare = this.props.data.tweets.map((tweet) => {
      let imageWidth = padding * 2 + tweet.entities.media[0].sizes.large.w / (tweet.entities.media[0].sizes.large.h / defaultHeight);
      let result = {
        key: tweet.id + tweet.user.id,
        elemId: tweet.id,
        imageUrl: tweet.entities.media[0].media_url,
        tweetLink: tweet.id_str,
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
          elemId={tweet.elemId}
          imageUrl={tweet.imageUrl}
          tweetLink={tweet.tweetLink}
          width={tweet.width}
          height={lineHeight[tweet.line] || defaultHeight}
          onImageCheckboxChanged={this.props.onImageCheckboxChanged.bind(this)}
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
