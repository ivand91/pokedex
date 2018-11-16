import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import Search from '../components/Search/Search';
import Loader from '../components/Loader/Loader';

class App extends Component {
	
	constructor(props) {
        
        super(props);
        
		this.state = {
			pokemon : null,
			name : null,
			number : 0,
			spriteUrl : null,
			types : [],
			height : 0,
			weight : 0,
			isPokemonShowed : false,
			loaderClass : 'hide',
			message : null
		}
		
		this.handleChange = this.handleChange.bind(this);
        this.showInfo = this.showInfo.bind(this);
        
	}

	handleChange = (event) => {
		this.setState({pokemon: event.target.value});
	}
	
	showInfo = () => {

		this.setState({
			loaderClass : 'show'
		});

		axios.get('https://pokeapi.co/api/v2/pokemon/' + this.state.pokemon + '/').then(response => {

			const info = response.data;

			this.setState({
				name : info.name,
				number : info.id,
				spriteUrl : info.sprites.front_default,
				types : info.types,
				height : info.height / 10,
				weight : info.weight / 10,
				loaderClass : "hide",
				isPokemonShowed : true
			});
			

		}).catch(() => {
			this.setState({
				isPokemonShowed : false,
				loaderClass : "hide",
				message : "Pokemon not found."
			});
		});

	}

  	render() {
		
		let data = null;

		if(this.state.isPokemonShowed) {
			data = <Info />
		} else {
			data = <Message />
		}


		return (
			<div className="App">
				<Search changed={this.handleChange} clicked={this.showInfo}/>
				{ this.state.loaderClass === 'hide' ? data : null }
				<Loader class={this.state.loaderClass}/>
			</div>
		);
  	}
}

export default App;
