import React, { useState} from 'react'

export default function DraggableDiv() {
    const [dragging, setDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [offset, setOffset] = useState({ x: 0, y: 0 });
  
    const handleMouseDown = (e) => {
      setDragging(true);
      setOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    };
  
    const handleMouseMove = (e) => {
      if (dragging) {
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
            backgroundColor: 'lightblue',
            width: '100px',
            height: '100px',
            cursor: 'move'
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        />
    );
}