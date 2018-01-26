import React from 'react';

export const Popup = (props) => {
    const x = props.x;
    const y = props.y;
    const message = props.message;
    return (
        <div style={{position: 'absolute', top:`${y}px`, left:`${x}px`}}>
            <span>{message}</span>
        </div>
    )
}