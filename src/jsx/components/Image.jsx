import React from 'react'

export default class Image extends React.Component {
  render() {
    return(
      <div className='image'>
        <input type='checkbox' id={this.props.elemId} />
        <label htmlFor={this.props.elemId}><i className="fa fa-check"></i></label>
        <a href={'https://twitter.com/' + this.props.screenName + '/status/' + this.props.tweetLink} >
          <img src={this.props.imageUrl}/>
        </a>
      </div>
    );
  }
}
