import React, { Component } from 'react';
import axios from 'axios';
import apiKey from '../config.js';

import SearchForm from './SearchForm';
import MainNav from './MainNav';
import PhotoContainer from './PhotoContainer';

class App extends Component {

  state = {
    cats: [],
    dogs: [],
    computers: [],
    searchResults: []
  }

  getPhotos = (stateKey, searchQuery) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${searchQuery}&per_page=24&format=json&nojsoncallback=1`)
      .then( response => {
        this.setState({[stateKey]: response.data.photos.photo}) ;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      // .finally( () => {
      //   console.log('current state', this.state);        
      // })
      ;
  }

  componentDidMount () {
    this.getPhotos('cats');
    this.getPhotos('dogs');
    this.getPhotos('computers');
  }

  render () {
    return (
      <div class="container">
        <SearchForm />
        <MainNav />
        <PhotoContainer data={this.state.cats} />
      </div>
    );
  }
}

export default App;