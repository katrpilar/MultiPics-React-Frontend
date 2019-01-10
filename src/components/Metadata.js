import { TextField, Button } from '@material-ui/core'
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
        {/* <a onClick={()=> window.open(photo.metadata.profile)}>{photo.metadata.photographer}</a> */}
        {/* <Router>
          <Link to='https://google.com' params={'https://www.google.com'} target="_blank" onClick={e => e.stopPropagation()}>click me</Link>
        </Router> */}
        {/* <a onClick={function(e){e.stopPropagation(); window.open(photo.metadata.profile);}}>{photo.metadata.photographer}</a> */}
        {/* <a rel="noopener noreferrer" href={photo.metadata.profile} target="_blank" onClick={e => e.stopPropagation()}>{photo.metadata.photographer}</a> */}
        {/* <Router>
          <Link to={photo.metadata.profile} target="_blank">{photo.metadata.photographer}</Link>
        </Router> */}
        {/* <Router>
          {/* <Link to={photo.metadata.profile} target="_blank" style={{fontSize: '10px', textDecoration: 'none', color: 'rgb(0, 0, 0, 0.5)', backgroundColor: 'rgb(255, 255, 255, 0.3)', float: 'left', paddingLeft: '8px'}} onClick={(event) => {event.preventDefault(); window.open(this.makeHref(photo.metadata.profile));}}>{photo.metadata.photographer}</Link> */}
        {/* </Router> */}
          <a style={{fontSize: '10px', textDecoration: 'none', color: 'rgb(0, 0, 0, 0.5)', backgroundColor: 'rgb(255, 255, 255, 0.3)', float: 'left', paddingLeft: '8px'}} href={this.props.photo.profile} target="_blank" rel="noopener noreferrer" onClick={this.handleProfileClick}>{this.params.photo.photographer}</a>
          {/* <a href={photo.metadata.link} target="_blank" rel="noopener noreferrer" style={{fontSize: '10px', textDecoration: 'none', color: 'rgb(0, 0, 0, 0.5)', backgroundColor: 'rgb(255, 255, 255, 0.3)', float: 'right', paddingRight: '8px'}}>{photo.metadata.brand}</a> */}
        </div>
        )
    }
} 

export default Metadata;
