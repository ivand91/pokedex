import React from 'react';

import './Search.css';

const search = ( props ) => {

    return (

        <div className="search">
            <input type="text" id="term" placeholder="Pokemon name/number" onChange={props.changed} required />
            <button type="button" id="submit" onClick={props.clicked} >GO</button>
        </div>
    )
};

export default search;