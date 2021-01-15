import React from "react";
import "./GamePlan.css";
import { Tile } from "./Tile";

interface GamePlanProps {
  tiles: number[][] | undefined;
}

const renderTile = (num: number, key: any) => {
  return <Tile num={num} key={key}/>;
};

const GamePlan = (props: GamePlanProps) => {
  return props.tiles ? (
    <div className="gameplan">
      {props.tiles.map((row, i) => (
        <div key={i} className="gameplan-row">
          {row.map((col, j) => renderTile(col, j))}
        </div>
      ))}
      <pre></pre>
    </div>
  ) : (
    <div>
      <strong>NO GAME DATA FOUND</strong>
    </div>
  );
};

export { GamePlan };
