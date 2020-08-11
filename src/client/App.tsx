import React from "react";
import Navigation from "./components/Navigation";
import CreateSession from "./components/CreateSession";
import PointingSession from "./components/PointingSession";

import * as SocketClient from "./SocketClient";

import "./style/App.less";
import "./style/bootstrap.scss";
import { Switch, Route, BrowserRouter as Router, useLocation } from "react-router-dom";

class AppProps { }

class AppState {
	rooms: string[];
	constructor() {
		this.rooms = [];
	}
}

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function RenderPointingSession(): JSX.Element {
	let query = useQuery();
	return (<PointingSession room={query.get("room")} name={query.get("name")} />)
}

export class App extends React.Component<AppProps, AppState> {

	constructor(props: AppProps) {
		super(props);
		this.state = new AppState();
		SocketClient.initiateSocket();
	}

	render(): JSX.Element {
		return (
			<Router>
				<div className="App">
					<Navigation />
					<Switch>
						<Route path="/session" children={<RenderPointingSession />} />
						<Route path="/">
							<CreateSession />
						</Route>
					</Switch>
				</div>
			</Router>
		);
	}
}
