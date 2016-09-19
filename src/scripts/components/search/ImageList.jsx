import React from 'react'
import { connect } from 'react-redux'

import Image from './Image'
import { search } from '../../actions/search'

const mapStateToProps = state => {
  return {
    isFetching: state.fetchedItems.isFetching,
    tweets: state.fetchedItems.tweets,
    nextResults: state.fetchedItems.nextResults
  }
}

const mapDispatchToProps = dispatch => {
  return {
    search: (query, endpoint) => dispatch(search(query, endpoint))
  }
}

class ImageList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      boxWidth: window.innerWidth - 1
    }
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this))
    window.addEventListener('scroll', this.handleScroll.bind(this))
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this))
    window.removeEventListener('scroll', this.handleScroll.bind(this))
  }
  handleResize() {
    this.setState({boxWidth: window.innerWidth - 1})
  }
  handleScroll() {
    let scrollTop = document.body.scrollTop
    let windowHeight = window.innerHeight
    let scrollHeight = document.body.scrollHeight

    let remain = scrollHeight - windowHeight - scrollTop

    if (remain <= 0) this.props.search(this.props.nextResults, 'tweets')
  }
  handleContinue() {
    this.props.search(this.props.nextResults, 'tweets')
  }
  render() {
    const defaultHeight = 180
    const margin = 2
    let boxWidth = this.state.boxWidth
    let imageWidthSum = 0
    let currentLine = 1
    let lineHeight = []

    let tweets = this.props.tweets.map(tweet => {
      let medium = tweet.media.map(media => {
        let imageWidth = media.sizes.large.w / (media.sizes.large.h / defaultHeight)
        imageWidthSum += imageWidth

        if (imageWidthSum >= boxWidth) {
          lineHeight[currentLine] = defaultHeight * (boxWidth / (imageWidthSum - imageWidth))
          media.line = currentLine + 1
          imageWidthSum = imageWidth
          currentLine++
        }

        return {
          key: media.media_url,
          id: tweet.id,
          screenName: tweet.screen_name,
          imageUrl: media.media_url,
          width: imageWidth,
          line: currentLine
        }
      })
      return medium
    })

    if (tweets.length > 0) {
      tweets = tweets.reduce((prev, next) => prev.concat(next))
    }

    console.log(tweets)
    let tweetNodes = tweets.map( tweet => {
      return(
        <Image
          key={tweet.key}
          tweetId={tweet.id}
          imageUrl={tweet.imageUrl}
          tweetLink={`https://twitter.com/${tweet.screenName}/status/${tweet.id}`}
          width={tweet.width * (lineHeight[tweet.line] / defaultHeight) - (margin * 2)}
          height={lineHeight[tweet.line] || defaultHeight}
        />
      )
    })
    return(
      <div className='container' ref='imageList'>
        <div className='images clearfix'>
          {tweetNodes}
        </div>
        <div className='images__continue_bar' onClick={ event => this.handleContinue(event) }>
          {
            this.props.isFetching ?
              <i className='fa fa-spinner fa-pulse' /> :
              this.props.nextResults ?
                <a>続きを表示</a> :
                <span/>
          }
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageList)
