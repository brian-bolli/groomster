import * as React from "react";
import * as SocketClient from "../SocketClient";
import {
	Navbar,
	NavbarBrand,
	Nav,
	NavItem,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	NavLink,
	DropdownItem
} from "reactstrap";
import { Link } from "react-router-dom";

class NavigationProps { }

class NavigationState {
	rooms: string[]
	constructor() {
		this.rooms = [];
	}
}

export default class Navigation extends React.Component<
	NavigationProps,
	NavigationState
	> {
	constructor(props: NavigationProps) {
		super(props);
		this.state = new NavigationState();
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
			<DropdownMenu>
				<DropdownItem disabled>No Active Sessions</DropdownItem>
			</DropdownMenu>
		)
	}

	renderActiveSessions(): JSX.Element {
		if (this.state.rooms.length === 0) {
			return this.renderNoActiveSessions();
		}
		return (
			<DropdownMenu>
				{this.state.rooms.map((room: string, index: number) => <DropdownItem key={index}><Link to={`/session/?room=${room}`}>{room}</Link></DropdownItem>)}
			</DropdownMenu>
		)
	}

	render(): JSX.Element {
		return (
			<Navbar dark color="dark" expand="md">
				<NavbarBrand href="/">Groomster</NavbarBrand>
				<Nav className="mr-auto" navbar>
					<UncontrolledDropdown nav inNavbar>
						<DropdownToggle nav caret>
							Join Session
							</DropdownToggle>
						{this.renderActiveSessions()}
					</UncontrolledDropdown>
				</Nav>
			</Navbar>
		);
	}
}
