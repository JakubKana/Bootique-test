import React from "react";
import { TScore } from "../../types";

interface PlayerItemProps {
    score: TScore
}

const PlayerItem = (props: PlayerItemProps) => (
  <li className="player-item" >{`${props.score.player.name} : ${props.score.score}`}</li>
);

export { PlayerItem };
