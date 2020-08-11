import * as React from "react";
import io from "socket.io-client";
import * as SocketClient from "../SocketClient";

import JoinSession from "./JoinSession";
import VotingDashboard from "./VotingDashboard";
import VotingResults from "./VotingResults";
import VotingOptions from "./VotingOptions";

export class User {
	name: string;
	vote: number;
}

class PointingSessionProps {
	room: string;
	name?: string;
}

class PointingSessionState {
	inSession: boolean;
	userName: string;
	userVote: string;
	players: User[];
	show: boolean;
	alerts: string[];
	voted: number;
	constructor() {
		this.inSession = true;
		this.players = [];
		this.voted = 0;
		this.show = false;
		this.alerts = [];
	}
}

export default class PointingSession extends React.Component<
	PointingSessionProps,
	PointingSessionState
	> {
	constructor(props: PointingSessionProps) {
		super(props);
		this.state = new PointingSessionState();
		console.log('pointing session -> ', this.props.room);
		SocketClient.joinRoom(this.props.room);
		this.joinActiveSession = this.joinActiveSession.bind(this);
		this.estimateSelected = this.estimateSelected.bind(this);
		this.showResults = this.showResults.bind(this);
		this.clearCurrentVotes = this.clearCurrentVotes.bind(this);
	}

	componentDidMount() {
		if (this.props.name) {
			this.joinActiveSession(this.props.name);
		}
	}

	joinActiveSession(userName: string): void {
		this.setState({
			['userName']: userName
		});
		SocketClient.sendName(userName);
		SocketClient.subscribeToUsersEvent((users: User[]) => {
			let userVote;
			users.forEach((u: User) => {
				if (u.name === this.state.userName) {
					userVote = u.vote;
				}
			});
			this.setState({
				["userVote"]: userVote,
				["players"]: users,
				["voted"]: users.filter(e => e.vote).length
			});
		});
		SocketClient.subscribeToShowEvent(this.showResults);
	}

	showResults(): void {
		this.setState({
			["show"]: true
		});
		SocketClient.showVote();
	}

	clearCurrentVotes(): void {
		this.setState({
			["show"]: false
		});
		SocketClient.clearVote(this.state.userName);
	}

	estimateSelected(vote: number | null) {
		SocketClient.sendVote({ name: this.state.userName, vote });
	}

	renderJoinSession(): JSX.Element {
		if (!this.state.userName) {
			return (
				<div className="col-md-12 my-2">
					<JoinSession onJoin={this.joinActiveSession} />
				</div>
			);
		}
	}

	render(): JSX.Element {
		return (
			<div className="container p-2">
				<div className="row">
					{this.renderJoinSession()}
					<div className="col-md-12 my-2">
						<VotingDashboard
							totalPlayers={this.state.players.length}
							totalVoted={this.state.voted}
							onClearAction={this.clearCurrentVotes}
							onShowAction={this.showResults}
						/>
					</div>
					<div className="col-md-6 col-sm-12 my-2">
						<VotingOptions
							user={this.state.userName}
							activeSelection={this.state.userVote}
							onVoteSelected={this.estimateSelected}
							options={[
								"1",
								"3",
								"5",
								"8",
								"13",
								"20",
								"40",
								"100",
								"?"
							]}
						/>
					</div>
					<div className="col-md-6 col-sm-12 my-2">
						<VotingResults
							user={this.state.userName}
							players={this.state.players}
							show={this.state.show}
							onClearVote={this.estimateSelected}
						/>
					</div>
				</div>
			</div>
		);
	}
}
