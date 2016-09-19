const searchResult = (json) => {
  json = JSON.parse(json)
  let result = { tweets: [], next_results: '' }
  result.next_results = json.search_metadata.next_results
  result.tweets = json.statuses.filter( tweet => {
    if(!(tweet.entities.media === undefined) && !tweet.retweeted_status) {
      return true
    }
  })
  return JSON.stringify(result)
}

const accountResult = (json) => {
  json = JSON.parse(json)
  return json
}

module.exports = {
  searchResult: searchResult,
  accountResult: accountResult
}
