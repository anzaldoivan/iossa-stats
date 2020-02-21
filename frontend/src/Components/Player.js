import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import PlayerCard from './PlayerCard';
import { api } from '../api';
import SteamID from 'steamid'

export default class Player extends Component {
    state = {
        data: [],
        data2: [],
        steaminfo: []
	};

	constructor(){
		super();
		this.state = {isLoading: true, isTableLoading: true, challonge: null};
    }

    componentDidMount() {
        axios.get(api + 'player/' + this.props.match.params.id + '/all').then(res => {
            this.setState({data: res.data});
            let sid = new SteamID(this.props.match.params.id);
            let sid64 = sid.getSteamID64();
            axios.get(api + 'playerlast15/' + this.props.match.params.id + '/all').then(res => {
                axios.get(api + 'getsteaminfo/' + sid64).then(res => {
                    this.setState({steaminfo: res, isLoading: false})
                })
                this.setState({data2: res.data});
            });
        });
    }
    
    render() {
        return this.state.isLoading ? <div className='content' id='loader'><center><FontAwesomeIcon icon={faSpinner} spin size='5x' style={{color: '#ff9800'}}></FontAwesomeIcon></center></div> :
        <div className='matchContainer'>
            <PlayerCard data={this.state.data} data2={this.state.data2} steaminfo={this.state.steaminfo}></PlayerCard>
        </div>
    }

}