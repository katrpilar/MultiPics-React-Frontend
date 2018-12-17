import React from "react";
// import ReactDOM from 'react-dom'
import PropTypes from "prop-types";

const imgWithClick = { cursor: "pointer" };

const Photo = ({ index, onClick, photo, margin, direction, top, left }) => {
  // debugger;
  const imgStyle = { margin: margin };
  if (direction === "column") {
    imgStyle.position = "absolute";
    imgStyle.left = left;
    imgStyle.top = top;
  }

  const handleClick = event => {
    // onClick(event, { photo, index })
    onClick(event, { photo, index })
  };

  const handleMouseOver = event => {
    let elm = React.createElement('h6', null, 'hello');
    debugger;
    event.currentTarget.append(elm);
    // debugger;
    // event.currentTarget to return the element moused over
    // console.log(event);
    // onMouseOver(event, {  })
  };

  return (
    // onMouseOver={(event) => handleMouseOver(event)}
    <div>
      <img
        style={onClick ? { ...imgStyle, ...imgWithClick } : imgStyle}
        {...photo}
        onClick={onClick ? handleClick : null}
        alt="img"
      />
      {/* <h6 style={{display: 'none'}}>Hello</h6> */}
    </div>
    
  );
};
export default Photo;