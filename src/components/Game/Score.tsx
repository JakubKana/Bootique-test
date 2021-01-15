import React from 'react';
import "./Score.css"
interface ScoreProps {
    score: number;
    label: string;
};

const Score = (props: ScoreProps) => { return (<div className="scoreboard">
    <h2>{props.label}{" "}{props.score}</h2>
</div>);}

export { Score };