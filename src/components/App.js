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
    searchResults: [],
    searchQuery: "",
    loadingFinished : false
  }

  // function that fetches photos from flickr API depending on searchQuery and then updates state at stateKey
  getPhotos = (stateKey, searchQuery) => {
    this.setState( {loadingFinished: false} );
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${searchQuery}&per_page=24&format=json&nojsoncallback=1`)
      .then( response => {
        this.setState( () => 
          ['cats','dogs','computers'].indexOf(searchQuery) > -1 ? 
          {[stateKey]: response.data.photos.photo, loadingFinished: true} :
          {[stateKey]: response.data.photos.photo, searchQuery, loadingFinished: true}
        );
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      // .finally( () => {
      //   // console.log('final state', this.state);        
      //   console.log(stateKey, ' state updated with ', searchQuery);
      // })
      ;
  }

  //fetches initial state for cats dogs and computer photos
  componentDidMount () {
    this.getPhotos('cats', 'cats');
    this.getPhotos('dogs', 'dogs');
    this.getPhotos('computers', 'computers');
  }

  render () {
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm getPhotos={this.getPhotos}/>
          <MainNav />
          <Switch>
            <Route exact path="/" render={ () => 
              <PhotoContainer 
              photos={this.state.cats} 
              topic={'cats'} 
              loadingFinished={this.state.loadingFinished} /> } />
            <Route exact path="/cats" render={ () => 
              <PhotoContainer 
              photos={this.state.cats} 
              topic={'cats'} 
              loadingFinished={this.state.loadingFinished} /> } />
            <Route exact path="/dogs" render={ () => 
              <PhotoContainer 
              photos={this.state.dogs} 
              topic={'dogs'} 
              loadingFinished={this.state.loadingFinished} /> } />
            <Route exact path="/computers" render={ () => 
              <PhotoContainer photos={this.state.computers} 
              topic={'computers'} 
              loadingFinished={this.state.loadingFinished} /> } />
            <Route path="/search/:searchQuery" 
              render={ () => <PhotoContainer 
              photos={this.state.searchResults} 
              topic={this.state.searchQuery} 
              loadingFinished={this.state.loadingFinished} /> } />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
