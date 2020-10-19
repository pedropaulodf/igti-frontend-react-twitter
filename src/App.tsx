import React, { useEffect, useState } from 'react';
import Tweet from './components/Tweet/Tweet';

import api from './service/api';
import { v4 as uuidv4 } from 'uuid';

import TwitterInputArea from './components/TwitterInputArea/TwitterInputArea';

interface TweetsData {
  id: string;
  value: string;
}

function App() {

  const [allTweets, setAllTweets] = useState<TweetsData[]>([]);

  const getTweets = async () => {
    await api.get('/tweets').then(response => {
      setAllTweets(response.data);
    })
  }

  useEffect(() => {
    getTweets();
  },[])

  async function handleRemoveTweet(uuid:string){
    await api.delete('/tweets/'+uuid).then(response => {
      getTweets();
    });
  }

  async function handleAddTweet(newTweet:string) {
    await api.post('/tweets/', {id: uuidv4(), value: newTweet}).then(response => {
      getTweets();
    });
  }

  return (
    <div className="container">
      <h2>React Twitter</h2>

      <TwitterInputArea onAddClick={handleAddTweet}/>

      {allTweets.length === 0 ? <p className="emptyMessage">Nenhum tweet encontrado</p> : allTweets.map(tweet => {
        return (
          <Tweet 
            key={tweet.id} 
            message={tweet.value} 
            uuid={tweet.id} 
            onRemoveClick={handleRemoveTweet}
          ></Tweet>
        )
      })}
    </div>
  );
}

export default App;
