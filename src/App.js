import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {
  state = {
    unsplash: []
  }


  componentDidMount() {
    // axios.get('/api/images')
    // .then(response => {
    //   const images = response.data
    //   this.setState(() => { return { images: images }})
    // })
    // .catch(function (error) {
    //   console.log(error)
    // });

    //get Unsplash Results
    axios.get(`https://api.unsplash.com/search/photos?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}&page=1&query=office`)
    .then(response => {
      const unsplash = response.data.results
      this.setState(() => { return { unsplash: unsplash }})
    })
    .catch(function (error) {
      console.log(error)
    });
   }

  render() {
    return (
      <div>
        <ul>
          {this.state.unsplash.map((obj, indx) => 
          <li key={indx}>
            Source: <a href="https://unsplash.com/">Unsplash</a>
            <a href={obj.links.download}>Download</a><br></br>
            By: <a href={obj.user.portfolio_url}>{obj.user.name}</a><br></br>
            </li>)}
        </ul>
      </div>
    );
  }
}

export default App;
