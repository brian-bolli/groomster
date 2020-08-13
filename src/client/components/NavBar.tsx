import * as React from "react";
import * as SocketClient from "../SocketClient";
import { Navbar, Nav, Dropdown, Icon } from 'rsuite';
import { Link } from "react-router-dom";

class NavBarProps {
}

class NavBarState {
	rooms: string[];
	constructor() {
		this.rooms = [];
	}
}

export default class NavBar extends React.Component<NavBarProps, NavBarState> {

	constructor(props: NavBarProps) {
		super(props);
		this.state = new NavBarState();
	}

	componentDidMount() {
		SocketClient.subscribeToRoomsMenu((rooms: string[]) => {
			this.setState({
				['rooms']: rooms
			});
		});
	}

	renderNoActiveSessions(): JSX.Element {
		return (
			<Dropdown title="Join Session">
				<Dropdown.Item><i>No Active Sessions</i></Dropdown.Item>
			</Dropdown>
		)
	}

	renderActiveSessions(): JSX.Element {
		return (
			<Dropdown title="Join Session">
				{ this.state.rooms.map((room: string, index: number) => <Dropdown.Item key={index}><Link to={`/session/?room=${room}`}>{room}</Link></Dropdown.Item>) }
			</Dropdown>
		);
	}

	renderJoinSessionMenu(): JSX.Element {
		if (this.state.rooms.length === 0) {
			return this.renderNoActiveSessions();
		}
		return this.renderActiveSessions();
	}

	render(): JSX.Element {
		return (
			<Navbar>
				<Navbar.Header>
					<a href="/" className="navbar-brand logo">
						GROOMSTER
					</a>
				</Navbar.Header>
				<Navbar.Body>
					<Nav>
						{ this.renderJoinSessionMenu() }
					</Nav>
					<Nav pullRight>
						<Nav.Item icon={<Icon icon="cog" />}>Settings</Nav.Item>
					</Nav>
				</Navbar.Body>
			</Navbar>
		);
	}

}
