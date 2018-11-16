import React from 'react';

import './Info.css';

const info = ( props ) => {
    let spans = [];
    const types = props.types.map((type, ind) => {
        if(ind === 0) {
            spans.push(<span key={ind} className={["mr type", type.type.name].join(' ')}>{type.type.name}</span>);
        } else {
            spans.push(<span key={ind} className={["type", type.type.name].join(' ')}>{type.type.name}</span>);
        }

        return spans;
    });

    return (
        <div className="info-box">
            <img src={props.spriteUrl} alt="Sprite" />
            <ul>
                <li><span className="mr">#{props.number}</span><span>{props.name}</span></li>
                <li>Height: {props.height} m</li>
                <li>Weight: {props.weight} kg</li>
                <li>{spans}</li>
            </ul>
        </div>
    )
};

export default info;