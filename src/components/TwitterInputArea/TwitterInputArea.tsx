import React, { useState } from 'react';

import './twitterInputArea.css';

interface TwitterInputProps{
  onAddClick: any
}

export default function TwitterInputArea({onAddClick}:TwitterInputProps) {

  const [newTweet, setNewTweet] = useState('');
  const tweetCaractersLimit = 280;

  function handleClickNewTweet(){
    setNewTweet('');
    return onAddClick(newTweet);
  }

  function handleKeyPress(event:any) {
    if(event.key === 'Enter'){
      if(newTweet.trim().length > 5){
        handleClickNewTweet();
      }
    }
  }
  
  return (
    <div>
      <p>Escreva aqui:</p>
      <textarea onChange={(e) => setNewTweet(e.target.value)} className="txtArea" value={newTweet} onKeyPress={handleKeyPress} ></textarea>
      <div className="tweetInfo">

        <span className={
          newTweet.length < tweetCaractersLimit - 9
          ? 'green' 
          : newTweet.length < tweetCaractersLimit 
            ? 'orange' 
            : 'red'
          }
        >
          {newTweet.length === 0 
            ? `280 caractere(s) restante(s)` 
            : `${tweetCaractersLimit - newTweet.length} caractere(s) restante(s)`
          }
        </span>

        <button 
        disabled={newTweet.length === 0 || (tweetCaractersLimit - newTweet.length) < 0} 
        onClick={handleClickNewTweet}>
          Twittar
        </button>

      </div>
    </div>
  )
}
