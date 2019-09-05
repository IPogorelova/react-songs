import * as React from "react";
import { render } from "react-dom";

import "./App.css";

const URL = "https://www.songsterr.com/a/ra/songs.json?pattern=";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            song: "",
            songsList: []
        };

        this.onChange = this.onChange.bind(this);
        this.fetchSongs = this.fetchSongs.bind(this);
    }


    fetchSongs = (url) => {
        fetch(url)
            .then(function(response) {
                return response.json();
            })
            .then((myJson) => {
                const data = JSON.stringify(myJson);
                let songsList = JSON.parse(data);
                let ul = document.getElementById('#list')

                songsList.forEach(song => {
                   let listItem = this.renderSong(song);
                   ul.innerHTML += listItem;
                });
            });
    };

    renderSong = song => {
        console.log(`name: ${song.title}, artist: ${song.artist.name}`)

        let li = `name: ${song.title}, artist: ${song.artist.name}`;

        return <li>{li}</li>
    };

    onChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
        if (this.state.song.length >= 3) {
            this.fetchSongs(`${URL} + ${this.state.song}`)
        }
    };

    render() {
        return (
            <div className="App">
                <h1>Songs</h1>
                <p>Name: {this.state.song}</p>
                <input type="text" name={"song"} value={this.state.song} onChange={this.onChange} />
                <ul id={'#list'}>
                    {/*<li>{this.state.songsList}</li>*/}
                </ul>
            </div>
        );
    }
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);