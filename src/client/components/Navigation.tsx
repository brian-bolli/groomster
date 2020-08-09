import * as React from "react";
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

class NavigationProps {
	rooms: string[]
}

class NavigationState { }

export default class Navigation extends React.Component<
	NavigationProps,
	NavigationState
	> {
	constructor(props: NavigationProps) {
		super(props);
	}

	renderNoActiveSessions(): JSX.Element {
		return (
			<DropdownMenu>
				<DropdownItem disabled>No Active Sessions</DropdownItem>
			</DropdownMenu>
		)
	}

	renderActiveSessions(): JSX.Element {
		if (this.props.rooms.length === 0) {
			return this.renderNoActiveSessions();
		}
		return (
			<DropdownMenu>
				{ this.props.rooms.map(room => <DropdownItem to={ `/${room}` }>{ room }</DropdownItem>)}
			</DropdownMenu>
		)
	}

	render(): JSX.Element {
		return (
			<Navbar dark color="dark" expand="md">
				<NavbarBrand href="/">Groomster</NavbarBrand>
				<Nav className="mr-auto" navbar>
					<NavItem>
						<UncontrolledDropdown nav inNavbar>
							<DropdownToggle nav caret>
								Join Session
							</DropdownToggle>
							{ this.renderActiveSessions() }
						</UncontrolledDropdown>
					</NavItem>
				</Nav>
			</Navbar>
		);
	}
}
