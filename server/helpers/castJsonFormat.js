'use strict'
const searchResult = (json) => {
  json = JSON.parse(json);
  let result = {tweets: [], next_results: ''};
  result.next_results = json.search_metadata.next_results;
  result.tweets = json.statuses.filter((tweet) => {
    if(!(tweet.entities.media === undefined) && !tweet.retweeted_status) {
      return true;
    }
  });
  result = JSON.stringify(result);
  return result;
}

module.exports = {
  searchResult: searchResult
}
