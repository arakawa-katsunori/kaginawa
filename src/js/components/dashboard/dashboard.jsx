import React from 'react'
import ImageList from './ImageList'
import SearchFrom from './SearchForm'
import $ from 'jquery'

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      statuses: []
    };
  }

  getTwitterAPI(query) {
    var query = encodeURIComponent(query);
    $.ajax({
      type: 'GET',
      url: '/api/twitter/search?q=' + query,
      dataType: 'json',
      success: (data) => {
        this.setState(data);
      },
      error: (xhr, status, err) => {
        console.error(err);
      }
    });
  }

  componentDidMount() {
    this.getTwitterAPI('twitter');
  }

  render() {
    return(
      <div className='dashboard'>
        <SearchFrom onSearchSubmit={this.getTwitterAPI.bind(this)} />
        <ImageList data={this.state} />
      </div>
    );
  }
}
