import React from "react";
import Fab from '@material-ui/core/Fab'
import CloudDownload from '@material-ui/icons/CloudDownload'
import { BrowserRouter as Router, Link} from 'react-router-dom'
import Metadata from "./components/Metadata";
import { theme } from "./styles/theme";


let isFocused = false;

const Photo = ({ index, onClick, photo, margin, direction, top, left }) => {
  // console.log(photo)
  const imgWithClick = { cursor: "pointer" };

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

  const handleDrag = (e) => {
    e.stopPropagation();
    e.target.style.boxShadow = "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)";
    e.target.style.border = `solid ${theme.palette.secondary.main}`;
  }

  const handleDrop = (e) => {
    // debugger;
    e.stopPropagation();
    e.target.style.border = "none";
    // debugger;
    // e.target.style.boxShadow = "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)";

  }

  const handleUp = (e) => {
    // debugger;
    e.stopPropagation();
    e.target.style.boxShadow = "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)";
  }

  const handleHover = (e) => {
    e.stopPropagation();
    e.target.style.boxShadow = "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)";
  }
  

  const handleExit = () => {
    partial = false;
  }

  return (    
    <div onMouseDown={handleDrag} onMouseLeave={handleDrop} style={{transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'}}>
      <img
        style={onClick ? { ...imgStyle, ...imgWithClick} : {...imgStyle, boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'}}
        {...photo}
        alt="img"
        onMouseOver={handleHover}
        onMouseOut={handleUp}
      />
      <Fab aria-label="Download" href={photo.metadata.download} rel="noopener noreferrer" target="_blank" size="small" style={{position: 'relative', marginLeft: '-44px', backgroundColor: 'rgba(0,0,0,0.2)', marginTop: '-420px'}} onMouseDown={e => e.stopPropagation()}>
        <CloudDownload style={{color: '#ffffff'}}/>
      </Fab>
      <div style={{position: 'relative', top: '-15px', margin: '0px'}} onMouseDown={e => e.stopPropagation()}>
          <a style={{fontSize: '10px', textDecoration: 'none', color: 'rgb(0, 0, 0, 0.5)', backgroundColor: 'rgb(255, 255, 255, 0.3)', float: 'left', paddingLeft: '8px'}} href={photo.metadata.profile} target="_blank" rel="noopener noreferrer" >{photo.metadata.photographer}</a>
          <a href={photo.metadata.link} target="_blank" rel="noopener noreferrer" style={{fontSize: '10px', textDecoration: 'none', color: 'rgb(0, 0, 0, 0.5)', backgroundColor: 'rgb(255, 255, 255, 0.3)', float: 'right', paddingRight: '8px'}}>{photo.metadata.brand}</a>
        </div>
    </div>
  );
};
export default Photo;