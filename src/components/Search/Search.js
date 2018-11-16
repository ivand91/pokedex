import React from 'react';

import './Search.css';

const search = ( props ) => {

    return (

        <div className="search">
            <input type="text" id="term" placeholder="Pokemon name" required />
            <input type="submit" value="go" id="submit" />
        </div>
    )
};

export default search;