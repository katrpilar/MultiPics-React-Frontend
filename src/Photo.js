import React from "react";
import Fab from '@material-ui/core/Fab'
import CloudDownload from '@material-ui/icons/CloudDownload'
import { BrowserRouter as Router, Link} from 'react-router-dom'
import Metadata from "./components/Metadata";


let isFocused = false;

const Photo = ({ index, onClick, photo, margin, direction, top, left }) => {
  // console.log(photo)
  const imgWithClick = { cursor: "pointer", border: 'solid' };

  const imgStyle = { margin: margin};
  if (direction === "column") {
    imgStyle.position = "absolute";
    // imgStyle.border = "solid";
    imgStyle.left = left;
    imgStyle.top = top;
  }

  const handleClick = event => {
    onClick(event, { photo, index })
  };

  // const handleMouseOver = event => {
  // };

  var partial;
  const handleEnter = () => {
    // console.log("Mouse Over")
    partial = true;
  }

  const onFocusChange = (e) => {
    e.target.style = {border: 'solid'}
    // isFocused ? (isFocused = false) : (isFocused = true);
    // isFocused = true;
  }

  const onDrag = (e) => {
    e.stopPropagation();
    e.target.style.border = "solid";
  }

  const onDrop = (e) => {
    debugger;
    e.target.style.border = "none";
  }

  

  const handleExit = () => {
    partial = false;
  }

  return (    
    <div onMouseDown={onDrag} onMouseLeave={onDrop}>
      <img
        style={onClick ? { ...imgStyle, ...imgWithClick} : imgStyle}
        {...photo}
        alt="img"
        onClick={handleClick}
        
      />
      <Fab aria-label="Download" href={photo.metadata.download} rel="noopener noreferrer" target="_blank" size="small" style={{position: 'absolute', marginLeft: '-44px', backgroundColor: 'rgba(0,0,0,0.2)', marginTop: '4px'}} >
        <CloudDownload style={{color: '#ffffff'}}/>
      </Fab>
      <div style={{position: 'relative', top: '-15px', margin: '0px'}} onMouseDown={e => e.stopPropagation()}>
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
          <a style={{fontSize: '10px', textDecoration: 'none', color: 'rgb(0, 0, 0, 0.5)', backgroundColor: 'rgb(255, 255, 255, 0.3)', float: 'left', paddingLeft: '8px'}} href={photo.metadata.profile} target="_blank" rel="noopener noreferrer" >{photo.metadata.photographer}</a>
          <a href={photo.metadata.link} target="_blank" rel="noopener noreferrer" style={{fontSize: '10px', textDecoration: 'none', color: 'rgb(0, 0, 0, 0.5)', backgroundColor: 'rgb(255, 255, 255, 0.3)', float: 'right', paddingRight: '8px'}}>{photo.metadata.brand}</a>
        </div>
      {/* <div onClick={handleProfileClick}>Thing</div> */}
      {/* <Metadata photo={this.photo.metadata} /> */}
    </div>
  );
};
export default Photo;