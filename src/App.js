import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {
  state = {
    images: []
  }


  componentDidMount() {
    axios.get('/api/images')
    .then(response => {
      const images = response.data
      this.setState({ images })
    })
    .catch(function (error) {
      console.log(error)
    });
   }

  render() {
    return (
      <div>
        <ul>
          {this.state.images.map((obj, indx) => <li key={indx}>{obj.link}</li>)}
        </ul>
      </div>
    );
  }
}

export default App;
