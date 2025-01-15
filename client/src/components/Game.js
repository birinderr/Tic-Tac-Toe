import React, { useState, useEffect } from 'react';
import Board from './Board';

function Game({ channel }) {
  const [playersJoined, setPlayersJoined] = useState(false);

  useEffect(() => {
    // Guard against undefined channel or state
    if (channel?.state?.watcher_count !== undefined) {
      setPlayersJoined(channel.state.watcher_count === 2);
    }

    // Add a listener for user watching start event
    const handleUserWatchingStart = (event) => {
      if (event.watcher_count !== undefined) {
        setPlayersJoined(event.watcher_count === 2);
      }
    };

    channel?.on("user.watching.start", handleUserWatchingStart);

    return () => {
      channel?.off("user.watching.start", handleUserWatchingStart);
    };
  }, [channel]);

  if (!playersJoined) {
    return <div>Waiting for other players...</div>;
  }

  return <div className='gameContainer'>
    <Board/>
  </div>;
  
}

export default Game;
