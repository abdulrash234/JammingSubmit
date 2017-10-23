import React, { Component } from 'react';
//import logo from './logo.svg';
//made a change
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify/Spotify';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {searchResults:[],
                 playlistTracks:[],
                 playlistName: 'New Playlist'
                 };
    this.addTrack= this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track){
    if(this.state.playlistTracks.includes(track)){

    }

    else{
      let tracks = this.state.playlistTracks;
      tracks.push(track);
      this.setState({playlistTracks:tracks})
    }
  }

  removeTrack(track){
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({playlistTracks:tracks});
  }

  updatePlaylistName(name){
    this.setState({playlistName:name});
  }

  savePlaylist(){
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      });
    });
  }

  search(term){
    Spotify.search(term).then(searchResults =>{this.setState({searchResults:searchResults})})

  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults ={this.state.searchResults}
                           onAdd ={this.addTrack}/>
            <Playlist name={this.state.playlistName}
                      playlistTracks={this.state.playlistTracks}
                      onRemove = {this.removeTrack}
                      onNameChange = {this.updatePlaylistName}
                      onSave = {this.savePlaylist}/>
          </div>
        </div>
     </div>
    );
  }
}

export default App;
