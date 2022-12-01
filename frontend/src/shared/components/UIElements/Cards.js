import React from 'react';

import './Card.css';

const Cards = props => {
  return (
    <div className={`card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default Cards;
