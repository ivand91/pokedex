import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import Search from '../components/Search/Search';
import Info from '../components/Info/Info';
import Loader from '../components/Loader/Loader';
import Message from '../components/Message/Message';

class App extends Component {
	
	constructor(props) {
        
        super(props);
        
		this.state = {
			pokemon : null,
			name : null,
			number : null,
			spriteUrl : null,
			types : [],
			height : 0,
			weight : 0,
			about : null,
			isPokemonShowed : false,
			loaderClass : 'hide',
			message : 'No data.'
		}
		
		this.handleChange = this.handleChange.bind(this);
		this.showInfo = this.showInfo.bind(this);
		this.capitalize = this.capitalize.bind(this);
        
	}

	handleChange = (event) => {
		let value = event.target.value.toLowerCase();
		this.setState({pokemon: value});
	}

	capitalize(str){
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
	
	showInfo = () => {

		this.setState({
			loaderClass : 'show'
		});

		axios.get('https://pokeapi.co/api/v2/pokemon/' + this.state.pokemon + '/').then(response => {

			const info = response.data;
			let id;
			if(info.id.toString().length === 1) {
				id = "00" + info.id.toString();
			} else if(info.id.toString().length === 2) {
				id = "0" + info.id.toString();
			} else {
				id = info.id.toString();
			}

			let pokeHeight = info.height / 10;
			let pokeWeight = info.weight / 10;

			this.setState({
				name : this.capitalize(info.name),
				number : id,
				spriteUrl : "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + id + ".png",
				types : info.types,
				height : pokeHeight.toFixed(2),
				weight : pokeWeight.toFixed(2),
				isPokemonShowed : true
			});

		}).then(() => {

			axios.get('https://pokeapi.co/api/v2/pokemon-species/' + this.state.pokemon + '/').then(res => {

				let abouts = res.data.flavor_text_entries;

				const flavorText = abouts.map((about) => {
					if(about.language.name === "en" && about.version.name === "alpha-sapphire") {
						return about.flavor_text;
					} else {
						return null;
					}
				});

				this.setState({
					about : flavorText,
					loaderClass : 'hide'
				});

			}).catch(() => {
				this.setState({
					about : "No data about this Pokemon.",
					loaderClass : 'hide'
				});
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
			data = <Info 
				name={this.state.name}
				number={this.state.number}
				spriteUrl={this.state.spriteUrl}
				types={this.state.types}
				height={this.state.height}
				weight={this.state.weight}
				about={this.state.about} />
		} else {
			data = <Message msg={this.state.message}/>
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
