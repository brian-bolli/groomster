import * as React from "react";
import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";

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
					</NavItem>
				</Nav>
			</Navbar>
		);
	}
}
