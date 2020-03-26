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
				<div id="pagegradient"></div>
				<Navigation />
				<PointingSession />
			</div>
		);
	}
}
