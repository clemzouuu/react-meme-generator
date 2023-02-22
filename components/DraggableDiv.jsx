import React, { useState} from 'react'

export default function DraggableDiv(props) {

  const [dragging, setDragging] = useState(false);

  // Set the position at the coordinates {x: 0, y: 0}.
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    // "dragging" is set to true when clicked on
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (dragging) {
    // If the div is being displaced, its position is set to the mouse's on
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };  

  return (
    <div
      style={{
      position: 'absolute',
      top: position.y,
      left: position.x, 
      width: '80%',
      height: '100px',
      cursor: 'move',
      textAlign: 'center',  
      margin: '15px 0',
      padding: '0 5px',
      textTransform: 'uppercase',
      color: props.isItBlack ? 'black' : 'white' 
    }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >

      <h2 style={props.style}>
        {props.text}
      </h2>    
    </div>
  );
}