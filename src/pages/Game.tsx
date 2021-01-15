import React, { useState, useEffect, useCallback } from "react";
import { gql, useMutation } from "@apollo/client";
import {
  getArrowLabel,
} from "../controls/Gameplan";
import { apolloClient } from "../api/Client";
import { GamePlan } from "../components/Game/GamePlan";
import { Score } from "../components/Game/Score";

type State = {
  score: number;
  state: number[][];
  finished: Boolean;
};

const START_GAME = gql`
  {
    newGame {
      state
      score
      finished
    }
  }
`;

const UPDATE_GAMEPLAN = gql`
  mutation process($state: [[Int!]!]!, $score: Int!, $direction: Direction!) {
    processGame(game: { state: $state, score: $score, direction: $direction }) {
      state
      score
      finished
    }
  }
`;

const Game = () => {
  const [gameState, setGameState] = useState<State | null>({
    score: 0,
    state: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    finished: false,
  });

  const client = apolloClient;

  // UPDATE GAME STATE
  const [processGame] = useMutation(UPDATE_GAMEPLAN, {
    onCompleted: (data) => {
      console.log("UPDATE", data)
      setGameState({ state: data.processGame.state, finished: data.processGame.finished, score: data.processGame.score });
      console.log("NEW STATE", gameState)
    },
  });

  // INIT FIRST STATE
  useEffect(() => {
    client
      .query({
        query: START_GAME,
      })
      .then((res) => {
        console.log("START RESPONSE",res);
        setTimeout(() => setGameState({ state: res.data?.newGame.state, finished: res.data?.newGame.finished, score: res.data?.newGame.score }), 0);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleArrowKeys = useCallback(async (event) => {
    const { key, keyCode } = event;
    if (keyCode >= 37 && keyCode <= 40) {
      console.log(keyCode, key);
      const { data } = await processGame({
        variables: {
          state: gameState?.state,
          score: gameState?.score,
          direction: getArrowLabel(keyCode),
        },
      });
      console.log("NEW GAMEDATA", data.processGame);
      setTimeout(() =>{
        setGameState({ 
          state: data.processGame.state, 
          finished: data.processGame.finished,
          score: data.processGame.score
        })
      }, 10);
    }
  }, [gameState]);

  useEffect(() => {
    window.addEventListener("keydown", handleArrowKeys);
    return () => {
      window.removeEventListener("keydown", handleArrowKeys);
    };
  }, [handleArrowKeys]);

  return gameState?.finished ? (<>
  <h2>GAME OVER</h2>
  <Score score={gameState?.score!} label="Your final score:"></Score></>): (
    <>
      <h2 className="Game">Game</h2>
        <Score score={gameState?.score!} label="Score:"/>
      <div className="gameplan-container">
        <GamePlan tiles={gameState?.state} />
      </div>
    </>
  );
};

export { Game };
