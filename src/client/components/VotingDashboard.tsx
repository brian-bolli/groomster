import * as React from "react";
import { Card, CardBody, CardTitle, Button, InputGroup, Input, InputGroupAddon } from "reactstrap";

class VotingDashboardProps {
	totalPlayers: number;
	totalVoted: number;
	onClearAction: Function;
	onShowAction: Function;
	constructor() {
		this.totalPlayers = 0;
		this.totalPlayers = 0;
	}
}

class VotingDashboardState {
}

export default class VotingDashboard extends React.Component<VotingDashboardProps, VotingDashboardState> {

	constructor(props: VotingDashboardProps) {
		super(props);

	}

	render(): JSX.Element {
		return (
			<Card>
			<CardBody>
				<CardTitle>Current Story</CardTitle>
				<div className="row align-items-center">
					<div className="col">
						<InputGroup>
							<Input />
							<InputGroupAddon addonType="append">
								<Button color="secondary" disabled={this.props.totalVoted === 0} onClick={() => this.props.onClearAction()}>Clear</Button>
							</InputGroupAddon>
							<InputGroupAddon addonType="append">
								<Button color="primary" disabled={this.props.totalVoted < this.props.totalPlayers || this.props.totalPlayers === 0} onClick={() => this.props.onShowAction()}>Show</Button>
							</InputGroupAddon>
						</InputGroup>
					</div>
				</div>
			</CardBody>
		</Card>
		);
	}

}
