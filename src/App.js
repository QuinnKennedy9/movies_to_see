import React, { Component } from 'react';
import './App.scss';
import Form from './components/Form/Form';
import Searchbar from './components/Searchbar/Searchbar';
import Movieresult from './components/Movieresult/Movieresult';
import Movielist from './components/Movielist/Movielist';
import Header from './components/Header/Header';


class App extends Component {
  constructor() {
    super();
    this.state = {
      route:'form',
      input:'',
      movieData:{},
      currentTitle:'',
      userId:0,
      toSeeList:[],
      seenList:[],
      seen:0
    }
  }
  
  componentDidMount(){
    
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () =>{
    const url = 'http://www.omdbapi.com/?t='+this.state.input+'&apikey=735074a3';
    fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      this.setState({movieData:data});
      this.setState({currentTitle:data.Title});
      this.setState({seen:1});
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  onRouteChange = (newRoute) =>{
    this.setState({route:newRoute});
  }

  addToList = () =>{
    const url='http://localhost:8888/movies_to_see/admin/updateMovie.php';
    const movie = {
      id: this.state.userId,
      title: this.state.currentTitle
    };
    console.log(movie);
    const request = new Request(url, {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: new Headers({
          'Content-Type': 'application/json'
      })
    });
    fetch(request)
    .then(() => {
      this.setState({toSeeList:[...this.state.toSeeList, this.state.movieData]});
    })
      .catch(function(error) {
      console.log(error);
  });
}

  updateStatus = (status) =>{
    this.setState({userId:status});
    this.pullList();
    this.pullOtherList();
  }

  pullList = () =>{
    const url = 'http://localhost:8888/movies_to_see/admin/movie.php?id='+this.state.userId;
    fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      for(var i = 0; i < data.length; i++){
        this.searchMovie(data[i].movie_title);
      }
    })
    .catch(function(error) {
      console.log(error);
    });

  }

  pullOtherList = () =>{
    const url = 'http://localhost:8888/movies_to_see/admin/movie.php?id2='+this.state.userId;
    fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      for(var i = 0; i < data.length; i++){
        this.searchMovie2(data[i].movie_title,data[i].seen_status);
      }
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  searchMovie = (title) =>{
    const url = 'http://www.omdbapi.com/?t='+title+'&apikey=735074a3';
    fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      this.setState({toSeeList:[...this.state.toSeeList,data]});
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  searchMovie2 = (title,status) =>{
    const url = 'http://www.omdbapi.com/?t='+title+'&apikey=735074a3';
    fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      data['Status'] = status;
      console.log(data);
      this.setState({seenList:[...this.state.seenList,data]});
    })
    .catch(function(error) {
      console.log(error);
    });
  }


  swapList = (title, status) =>{
    const url='http://localhost:8888/movies_to_see/admin/swapList.php';
    const movie = {
      id: this.state.userId,
      title: title,
      status: status
    };
    const request = new Request(url, {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: new Headers({
          'Content-Type': 'application/json'
      })
    });
    fetch(request)
    .then(() => {
      let currentMovies = [...this.state.toSeeList];
      for(var i = 0; i < currentMovies.length; i++){
        if(currentMovies[i].Title === title){
          currentMovies.splice(i,1);
          this.setState({toSeeList:[...currentMovies]});
          this.searchMovie2(title,status);
        }
      }
    })
      .catch(function(error) {
      console.log(error);
  });
  }

  logout = () =>{
    this.onRouteChange('form');
    this.setState({movieData:{}});
    this.setState({currentTitle:''});
    this.setState({userId:0});
    this.setState({toSeeList:[]});
    this.setState({seenList:[]});
    this.setState({seen:0});
  }



  
  render() {
    return (
      <div className="App" >
      {this.state.route === 'form' ?
        <Form route = {this.state.formType} onRouteChange={this.onRouteChange} updateStatus={this.updateStatus}/>
      :(
        <div className='ultimate-container'>
          <div className = 'upper-content'>
            <Header logout = {this.logout}/>
            <Searchbar onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <Movieresult data={this.state.movieData} addToList = {this.addToList} seen = {this.state.seen}/>
          </div>
          <div className='list-container'>
            <Movielist title={"Movies You Want To See"} data={this.state.toSeeList} type={"to watch"} swapList={this.swapList}/>
            <Movielist title={"Movies You've Watched"} data={this.state.seenList} type={"liked"} swapList={this.swapList}/>
          </div>
        </div>
      )
      }
      </div>
        
    );

  }
  
}

export default App;
