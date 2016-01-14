import React from 'react'
import ImageList from './ImageList'
import SearchFormKeyword from './SearchFormKeyword'
import SearchFormAccount from './SearchFormAccount'
import Status from './Status'
import $ from 'jquery'

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      query: '',
      selectedImageUrl: []
    };
  }

  searchKeyword(query) {
    this.setState({query: query});
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
    this.setState({query: query});
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

  selectImages(value, checked) {
    let array = this.state.selectedImageUrl;
    if (checked) {
      array.push(value);
      this.setState({selectedImageUrl: array});
    } else {
      array.splice([array.indexOf(value)], 1);
      this.setState({selectedImageUrl: array});
    }
    console.log(this.state.selectedImageUrl);
  }

  componentWillMount() {
    this.searchKeyword('着てみた');
  }

  render() {
    return(
      <div className='dashboard'>
        <header>
          <Status query={this.state.query} />
          <div className='header__forms clearfix'>
            <SearchFormKeyword onSearchKeywordSubmit={this.searchKeyword.bind(this)} />
            <SearchFormAccount onSearchAccountSubmit={this.searchAccount.bind(this)} />
          </div>
        </header>
        <ImageList data={this.state} onImageCheckboxChanged={this.selectImages.bind(this)} />
      </div>
    );
  }
}
