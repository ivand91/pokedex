import React from 'react';
import pokeball from '../../pokeball.png';
import './Loader.css';

const loader = ( props ) => {

    let classes = ['loader', props.class];

    return (

        <img src={pokeball} className={classes.join(' ')} />
    )
};

export default loader;