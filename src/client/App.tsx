import React from "react";
import Navigation from "./components/Navigation";
import CreateSession from "./components/CreateSession";
import PointingSession from "./components/PointingSession";

import "./style/App.less";
import "./style/bootstrap.scss";
import { Switch, Route, BrowserRouter as Router, useParams } from "react-router-dom";


class AppProps { }

class AppState {
	rooms: string[];
	constructor() {
		this.rooms = [];
	}
}

function RenderPointingSession(): JSX.Element {
	let { room, name } = useParams();
	console.log(`RenderPointingSession -> ${room}`);
	return (<PointingSession room={ room } name={ name } />)
}

export class App extends React.Component<AppProps, AppState> {

	constructor(props: AppProps) {
		super(props);
		this.state = new AppState();
	}

	render(): JSX.Element {
		return (
			<Router>
				<div className="App">

					<Navigation rooms={ this.state.rooms } />
					<Switch>
						<Route path="/:room/:name" children={ <RenderPointingSession /> } />
						<Route path="/">
							<CreateSession />
						</Route>
					</Switch>
				</div>
			</Router>
		);
	}
}
