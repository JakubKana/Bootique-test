import React from "react";
import { TScore } from "../../types";
import { PlayerItem } from "./PlayerItem";
import "./PlayersList.css";

interface PlayersListProps {
  topPlayers: { allScores: TScore[] };
}

const PlayersList = (props: PlayersListProps) => {
  //console.log(props.topPlayers.allScores);
  const top10players = props.topPlayers.allScores
    .filter((p) => {
      if (p.score != null) return true;
      return false;
    })
    .slice(0, 10);

  return (
    <ul className="players-list">
      {top10players.map((score: TScore) => (
        <PlayerItem
          key={`${Math.floor(Math.random() * 999999)}`}
          score={score}
        />
      ))}
    </ul>
  );
};

export { PlayersList };
