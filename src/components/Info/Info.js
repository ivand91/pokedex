import React from 'react';

import './Info.css';

const info = ( props ) => {

    const spans = props.types.map((type, ind) => {
        if(ind === 0) {
            return <span key={ind} className={["type", type.type.name].join(' ')}>{type.type.name}</span>;
        } else {
            return <span key={ind} className={["type float-right", type.type.name].join(' ')}>{type.type.name}</span>;
        }
    });

    return (
        <div className="info-box">
            <article>
                <img src={props.spriteUrl} alt="Sprite" />
                <ul>
                    <li><span className="mr">#{props.number}</span><span>{props.name}</span></li>
                    <li>Height: {props.height} m</li>
                    <li>Weight: {props.weight} kg</li>
                    <li>{spans}</li>
                </ul>
            </article>
            <p className="about">{props.about}</p>
        </div>
    )
};

export default info;