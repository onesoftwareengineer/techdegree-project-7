import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import apiKey from '../config.js';

import SearchForm from './SearchForm';
import MainNav from './MainNav';
import PhotoContainer from './PhotoContainer';
import NotFound from './NotFound';

class App extends Component {

  state = {
    cats: [],
    dogs: [],
    computers: [],
    searchResults: []
  }

  // function that fetches photos from flickr API depending on searchQuery and then updates state at stateKey
  getPhotos = (stateKey, searchQuery) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${searchQuery}&per_page=24&format=json&nojsoncallback=1`)
      .then( response => {
        this.setState({[stateKey]: response.data.photos.photo}) ;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally( () => {
        // console.log('final state', this.state);        
        console.log(stateKey, ' state updated with ', searchQuery);
      })
      ;
  }

  componentDidMount () {
    this.getPhotos('cats', 'cats');
    this.getPhotos('dogs', 'dogs');
    this.getPhotos('computers', 'computers');
  }

  render () {
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm getPhotos={this.getPhotos} />
          <MainNav />
          <Switch>
            <Route exact path="/" render={ () => <PhotoContainer photos={this.state.cats} topic={'home'}/> } />
            <Route exact path="/cats" render={ () => <PhotoContainer photos={this.state.cats} topic={'cats'} /> } />
            <Route exact path="/dogs" render={ () => <PhotoContainer photos={this.state.dogs} topic={'dogs'} /> } />
            <Route exact path="/computers" render={ () => <PhotoContainer photos={this.state.computers} topic={'computers'} /> } />
            <Route path="/search/:searchQuery" render={ () => <PhotoContainer photos={this.state.searchResults}  topic={'search results'} /> } />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
