import React, { useState } from 'react';

interface TileProps {
    num: number;
    key: string;
};

const getColor = (num: number)=> {
    return `#${num % 255}${num % 255}AA`
}


const Tile = (props: TileProps) => { 
    const [color, setColor] = useState("#FAF8EF");
    
    setTimeout(() => {
        setColor(props.num == 0 ? "#FAF8EF" : getColor(props.num));
    }, 0);
    
    return (<div style={{ backgroundColor: color}} 
    className="gameplan-tile">{`${props.num}`}</div>);}

export {Tile}