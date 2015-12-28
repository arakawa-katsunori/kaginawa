import React from 'react'

export default class Image extends React.Component {
  render() {
    return(
      <div className='image'>
        <h3 className='screenName'>
          {this.props.screenName}
        </h3>
        <a href={'https://twitter.com/' + this.props.screenName + '/status/' + this.props.tweetLink} >
          <img src={this.props.imageUrl}/>
        </a>
      </div>
    );
  }
}
