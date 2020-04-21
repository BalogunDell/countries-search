import React from 'react';

export default ({
  index, 
    item: { name, population, capital }, 
    removeStackItem }) => {
  return (
    <div className="card">
        <h1>{name}</h1>
        <p>Capital: {capital.name}</p>
        <p>Population: {population}</p>
      <button 
        
        onClick={removeStackItem}
        value={index}
        className="remove-button">
      X
    </button>
  </div>
  )
}