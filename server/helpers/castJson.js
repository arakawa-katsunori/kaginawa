const searchResult = (json) => {
  json = JSON.parse(json)
  let result = { tweets: [], next_results: '' }
  result.next_results = json.search_metadata.next_results
  result.tweets = json.statuses.filter( tweet => {
    if(tweet.entities.media !== undefined && !tweet.retweeted_status) {
      return true
    }
  })
  result.tweets = result.tweets.map( tweet => {
    return {
      id: tweet.id_str,
      screen_name: tweet.user.screen_name,
      media: tweet.extended_entities.media
    }
  })
  return result
}

const accountResult = (json) => {
  json = JSON.parse(json)
  return json
}

module.exports = {
  searchResult: searchResult,
  accountResult: accountResult
}
