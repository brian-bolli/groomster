import * as React from "react";
import { Card, CardBody, Table, Button } from "reactstrap";
import Octicon, { Check, Clock, X } from "@primer/octicons-react";

import { User } from "./PointingSession";

class VotingResultsProps {
	user: string;
	players: User[];
	onClearVote: Function;
	show: boolean;
	constructor() {
		this.players = [];
		this.show = false;
	}
}

class VotingResultsState {

}

export default class VotingResults extends React.Component<
	VotingResultsProps,
	VotingResultsState
> {
	constructor(props: VotingResultsProps) {
		super(props);
	}

	renderClearVote(name: string, vote: number | null): JSX.Element {
		if (name === this.props.user) {
			return (
				<Button
					outline
					className="user-action-button"
					color="primary"
					disable={vote}
					onClick={() => this.props.onClearVote(null)}
					size="sm"
				>
					<Octicon icon={X} />
				</Button>
			);
		}
	}

	render(): JSX.Element {
		return (
			<Card>
				<CardBody>
					<Table>
						<thead>
							<tr>
								<th>Status</th>
								<th>Name</th>
								<th>Points</th>
							</tr>
						</thead>
						<tbody>
							{this.props.players.map(
								(player: User, index: number) => (
									<tr
										key={index}
										className={
											player.vote ? "ready" : "not-ready"
										}
									>
										<td>
											<Octicon
												icon={
													player.vote ? Check : Clock
												}
											/>
										</td>
										<td>{player.name}</td>
										<td>
											<div className="voting-wrapper">
												<div
													className={`voting-card ${
														this.props.show
															? "show"
															: "hide"
													}`}
												>
													{player.vote}
												</div>
												{this.renderClearVote(
													player.name,
													player.vote
												)}
											</div>
										</td>
									</tr>
								)
							)}
						</tbody>
					</Table>
				</CardBody>
			</Card>
		);
	}
}
