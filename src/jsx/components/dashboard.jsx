import React from 'react'
import ImageList from './ImageList'
import SearchFormKeyword from './SearchFormKeyword'
import SearchFormAccount from './SearchFormAccount'
import $ from 'jquery'

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      statuses: []
    };
  }

  searchKeyword(query) {
    var query = encodeURIComponent(query);
    $.ajax({
      type: 'GET',
      url: '/search/tweets.json?q=' + query,
      dataType: 'json',
      success: (data) => {
        this.setState(data);
      },
      error: (xhr, status, err) => {
        console.error(err);
      }
    });
  }

  searchAccount(query) {
    var query = encodeURIComponent(query);
    $.ajax({
      type: 'GET',
      url: '/search/account.json?q=' + query,
      dataType: 'json',
      success: (data) => {
        this.setState(data);
      },
      error: (xhr, status, err) => {
        console.error(err);
      }
    });
  }

  render() {
    return(
      <div className='dashboard'>
        <header>
          <SearchFormKeyword onSearchKeywordSubmit={this.searchKeyword.bind(this)} />
          <SearchFormAccount onSearchAccountSubmit={this.searchAccount.bind(this)} />
        </header>
        <ImageList data={this.state} />
      </div>
    );
  }
}
