import * as React from "react";

import { User } from "./components/PointingSession";

class WorkspaceContextProps {
}

class WorkspaceContextState {
	users: User[]
	cosntructor() {
		this.users = [];
	}
}

export const WContext = React.createContext({});

export default class WorkspaceContext extends React.Component<WorkspaceContextProps, WorkspaceContextState> {

	constructor(props: WorkspaceContextProps) {
		super(props);
		this.state = new WorkspaceContextState();
	}

	render(): JSX.Element {
		return (
			<WContext.Provider value={
				{
					state: this.state,
					updateState: (users: User[]) => this.setState({ users })
				}}>
				{this.props.children}
			}></WContext.Provider>
		);
	}

}
