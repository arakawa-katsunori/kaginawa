import React from 'react'
import ImageList from './ImageList'
import $ from 'jquery'

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        statuses: []
      }
    };
  }

  getTwitterAPI(query) {
    var query = encodeURIComponent(query);
    $.ajax({
      type: 'GET',
      url: 'https://api.twitter.com/1.1/search/tweets.json?q=' + query,
      dataType: 'jsonp',
      contentType: 'application/javascript',
      cache: false,
      success: (data) => {
        this.setState({ data: data });
        console.log(this.state);
      },
      error: (xhr, status, err) => {
        console.log('an error has occured');
      }
    });
  }

  componentDidMount() {
    this.getTwitterAPI('gutchom');
  }

  render() {
    return(
      <div className='dashboard'>
        <h2>Hello dashboard</h2>
        <ImageList data={this.state.data} />
      </div>
    );
  }
}


