import React from "react";
// import ReactDOM from 'react-dom'
import PropTypes from "prop-types";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select';
import {Input, MenuItem} from '@material-ui/core'



const imgWithClick = { cursor: "pointer" };

const Photo = ({ index, onClick, photo, margin, direction, top, left, metadata }) => {
  console.log(photo)
  const imgStyle = { margin: margin};
  if (direction === "column") {
    imgStyle.position = "absolute";
    imgStyle.left = left;
    imgStyle.top = top;
  }

  const handleClick = event => {
    // onClick(event, { photo, index })
    // console.log(photo)
    onClick(event, { photo, index })
  };

  const handleMouseOver = event => {
    // let elm = React.createElement('h6', null, 'hello');
    // event.currentTarget.append(elm);
    // debugger;
    // event.currentTarget to return the element moused over
    // console.log(event);
    // onMouseOver(event, {  })
    console.log(event.target);
  };

  var partial;
  const handleEnter = () => {
    console.log("Mouse Over")
    partial = true;
  }

  const handleExit = () => {
    partial = false;
  }

  return (
    // onMouseOver={(event) => handleMouseOver(event)}
    <div metadata={photo.metadata}>
      <img
        style={onClick ? { ...imgStyle, ...imgWithClick } : imgStyle}
        {...photo}
        onClick={onClick ? handleClick : null}
        alt="img"
      />
      <p style={{position: 'relative', top: '-15px', margin: '0px'}}>
          <a href={photo.metadata.profile} target="_blank" style={{fontSize: '10px', textDecoration: 'none', color: 'rgb(0, 0, 0, 0.5)', backgroundColor: 'rgb(255, 255, 255, 0.3)', float: 'left', paddingLeft: '8px'}}>{photo.metadata.photographer}</a>
          <a href={photo.metadata.link} target="_blank" style={{fontSize: '10px', textDecoration: 'none', color: 'rgb(0, 0, 0, 0.5)', backgroundColor: 'rgb(255, 255, 255, 0.3)', float: 'right', paddingRight: '8px'}}>{photo.metadata.brand}</a>
        </p>
      {/* <div style={{position: 'relative'}}> */}
        
        {/* <Select >
          <MenuItem key={photo.key}>Download</MenuItem>
          <MenuItem key={photo.key}>{photo.metadata.photographer}</MenuItem>
          <MenuItem key={photo.key}>{photo.metadata.brand}</MenuItem>
        </Select>         */}
        {/* <Button href={photo.metadata.download} size="small" variant="flat" style={{width: 'fit-conent'}}>Download</Button> */}
      {/* </div> */}
      {/* {partial ? <div>Hovering right meow! 🐱</div> : null} */}
    </div>
  );
};
export default Photo;