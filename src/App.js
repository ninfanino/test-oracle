import React from 'react';
import MoviesContainer from './components/MoviesContainer';
import './App.css';

class App extends React.Component {
  state = {
    data: {},
    movie: '',
    desc: '',
    img: ''
  }
  componentDidMount(){
    this.getInfo()
  }
  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value,
    })

  }
  getInfo() {
    fetch('http://localhost:3000/')
    .then(response => response.json())
    .then(data=> {
      console.log(data)
      this.setState({
        data: data,
        movie: '',
        desc: '',
        img: ''
      });
      
    });
    
  };
  addMovie = (e) => {
    e.preventDefault();
    var data = {movie: this.state.movie, desc: this.state.desc, img: this.state.img};
    
    fetch('http://localhost:3000/addMovie',{
      method: 'POST',
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(response => console.log(response))
    .then(()=> {
      this.getInfo();
    });
  }
  handleBtnClick = index => {
    var data = {id: index};
    fetch('http://localhost:3000/deleteMovie',{
      method: 'DELETE',
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(data=> {
      this.getInfo();
    });
  }
  render() {
    return (
      <div className="container">
        <form id="formul" onSubmit={this.addMovie}>
          <h1>Add a movie</h1>
          <input type="text" name="movie" value={this.state.movie} placeholder="Movie Title" onChange={this.handleInputChange} />
          <input type="text" name="desc" value={this.state.desc} placeholder="Desc" onChange={this.handleInputChange} />
          <input type="text" name="img" value={this.state.img} placeholder="Image Url" onChange={this.handleInputChange} />
          <button type="submit">Add</button>
        </form>
        <hr/>

        <MoviesContainer movies={this.state.data} handleBtnClick={this.handleBtnClick}/>
      </div>
    );
  }
}

export default App;
