import React from 'react';
import { Trash2 } from 'react-feather';

import './tweet.css';

interface TwitterProps {
  message: string;
  uuid: string;
  onRemoveClick: any;
}

export default function Tweet({message, uuid, onRemoveClick}: TwitterProps) {

  function handleButtonDeleteClick(){
    return onRemoveClick(uuid);
  }
  
  return (
    <div className="tweet">
      <fieldset>
        <div>{message}</div>
        <button >
          <Trash2 color="white" size={30} onClick={handleButtonDeleteClick}/>
        </button>
      </fieldset>
    </div>
  )
}