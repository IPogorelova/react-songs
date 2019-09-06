import * as React from "react";
import {render} from "react-dom";
import debounce from 'lodash/debounce'

import "./App.css";

const URL = "https://www.songsterr.com/a/ra/songs.json?pattern=";

class App extends React.Component {
    state = {
        search: "",
        songsList: []
    };

    renderSong = ({ id, title, artist }) => {
        if (id && title && artist) {
            return <li key={id}>{`title: ${title}`}<br />{`artist: ${artist}`}</li>
        }
    };

    onChange = async (text) => {
        const stream = await fetch(`${URL}${text}`);
        const data = await stream.json();
        this.setState({ songsList: data.map(({ id, title, artist: { name: artist } }) => ({ id, title, artist }))})
    };

    handleChange = debounce(this.onChange, 500);

    render() {
        console.count();

        return (
            <div className="App">
                <h1>Songs</h1>
                <p>Name: {this.state.search}</p>
                <input type="text" name={"search"} onChange={e => this.handleChange(e.target.value)} />
                <ol id={'#list'}>
                    {this.state.songsList.map(this.renderSong)}
                </ol>
            </div>
        );
    }
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);