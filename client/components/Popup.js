import React from 'react';

export const Popup = (props) => {
    const x = props.x;
    const y = props.y;
    const message = props.message;
    return (
        <div style={{position: 'absolute', 
                    top:`${y - 2}px`, 
                    left:`${x + 15}px`, 
                    backgroundColor: '#808080', 
                    color: 'white',
                    borderRadius: '5px',
                    padding: '1px 3px'}}>
            <span>{message}</span>
        </div>
    )
}