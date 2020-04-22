import * as React from "react";
import {
	Navbar,
	NavbarBrand,
	Nav,
	NavItem,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu
} from "reactstrap";

class NavigationProps {}

class NavigationState {}

export default class Navigation extends React.Component<
	NavigationProps,
	NavigationState
> {
	constructor(props: NavigationProps) {
		super(props);
	}

	render(): JSX.Element {
		return (
			<Navbar dark color="dark" expand="md">
				<NavbarBrand href="/">Groomster</NavbarBrand>
				<Nav className="mr-auto" navbar>
					<NavItem>
						{/* <UncontrolledDropdown nav inNavbar>
							<DropdownToggle nav caret>
								Options
							</DropdownToggle>
							<DropdownMenu right></DropdownMenu>
						</UncontrolledDropdown> */}
					</NavItem>
				</Nav>
			</Navbar>
		);
	}
}
