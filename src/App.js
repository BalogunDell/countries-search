import React, { useState, useEffect } from 'react';

import './App.css';
import CountryCard from './reusables/Card'
import { search } from './api-requests';
import { titleCase } from './helper';
import Messages from './messages';

const App = () => {
  const [searchKey, setSearchKey] = useState('');
  const [disableButton, setDisableButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [stackList, modifyStackList] = useState([]);

useEffect(() => {
  if(!searchKey) {
    setDisableButton(true);
  }
}, [searchKey]);


// Handle add button
const handleAddButton = async () => {

  // Handle no network issue
  if (!navigator.onLine) {
    setMessage(Messages.networkError);
    return;
  }
    setLoading(true);
    setMessage('');

    // Perform search 
  if (searchKey) {
    const titleCaseKey = titleCase(searchKey);
    const result = await search(titleCaseKey);
     
     setLoading(false);

     if (!!result.errors) {
      setMessage(Messages.badSearchTerm);
      return;
    }

    if (!result.countries.length) {
      setMessage(Messages.resourceNotFound(searchKey));
      return;
    }
    
    setSearchKey('')
    modifyStackList([result.countries[0], ...stackList]);
  }
}

// Handle Input Change
const handleChange = ({ target: { value }}) => {
  setDisableButton(false);
  setSearchKey(value);

  if (message) {
    setMessage('');
  }
}

// Handle keyup for enter key 
const onKeyUp = ({ keyCode }) => {
  const enterKeyCode = 13;
    if (keyCode === enterKeyCode && searchKey) {
      handleAddButton();
    }
  }

// Remove item
const removeStackItem = event => {
  const result = stackList.filter((_, index) => {
    return index !== parseInt(event.target.value, 10)
  });
  modifyStackList(result);
  }

  return (
    <div className="App">
      <header className="App-header">
          <h1>{Messages.title}</h1>
          <p>{Messages.appDesp}</p>
      </header>
      <div className="app-wrapper">
          <div className="header">
            <input
              type="text"
              placeholder="search for countries...eg Nigeria"
              name="searchKey"
              className="input"
              value={searchKey}
              onChange={event => handleChange(event)}
              onKeyDown={onKeyUp}
            />
            <button 
              disabled={disableButton} 
              className="button" 
              onClick={handleAddButton}>
                Add
            </button>
          </div>
          { loading && <p>Loading...</p>}
          { message  && <p>{message}</p>}
          <div className="card-wrapper">
          { stackList.map((item, index) => {
            return (
            <CountryCard 
              key={index} 
              item={item} 
              index={index}
              removeStackItem={removeStackItem}
            />
            )
          })  }
            </div>
      </div>
    </div>
  );
}

export default App;
