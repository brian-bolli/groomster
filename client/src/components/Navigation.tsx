import * as React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";

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
				<NavbarBrand href="/">Pointer</NavbarBrand>
				<Nav className="mr-auto" navbar>
					<NavItem>
						<NavLink href="/components/">Components</NavLink>
					</NavItem>
				</Nav>
			</Navbar>
		);
	}
}
