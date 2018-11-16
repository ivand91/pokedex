import React, { Component } from 'react';
import './App.css';

import Search from '../components/Search/Search';
import Loader from '../components/Loader/Loader';

class App extends Component {
  	render() {
		return (
			<div className="App">
				<Search />
				<Loader class="hide"/>
			</div>
		);
  	}
}

export default App;
