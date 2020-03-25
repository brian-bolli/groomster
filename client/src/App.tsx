import React from "react";
import Navigation from "./components/Navigation";
import PointingSession from "./components/PointingSession";

import "./style/App.less";
import "./style/bootstrap.scss";

class AppProps {}

class AppState {}

export class App extends React.Component<AppProps, AppState> {

	constructor(props: AppProps) {
		super(props);
	}

	render(): JSX.Element {
		return (
			<div className="App">
				<Navigation />
				<div className="container">
					<div className="pointing-container">
					<h1>Pointer Session: 123</h1>

					<PointingSession />
				</div>
				</div>
			</div>
		);
	}
}
