import React, { Component } from 'react'

class Metadata extends Component{
    handleProfileClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        console.log("the profile link was clicked");
      }
    componentDidMount (){
        console.log(this.props);
    }
    render(){
        return(
        <div style={{position: 'relative', top: '-15px', margin: '0px'}}>
          <a style={{fontSize: '10px', textDecoration: 'none', color: 'rgb(0, 0, 0, 0.5)', backgroundColor: 'rgb(255, 255, 255, 0.3)', float: 'left', paddingLeft: '8px'}} href={this.props.photo.profile} target="_blank" rel="noopener noreferrer" onClick={this.handleProfileClick}>{this.params.photo.photographer}</a>
        </div>
        )
    }
} 

export default Metadata;
