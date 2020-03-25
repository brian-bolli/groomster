import * as React from "react";
import io from "socket.io-client";

import JoinSession from "./JoinSession";
import VotingDashboard from "./VotingDashboard";
import VotingResults from "./VotingResults";
import VotingOptions from "./VotingOptions";

let socket: any;

export class User {
	name: string;
	vote: number;
}

class PointingSessionProps {}

class PointingSessionState {
	inSession: boolean;
	userName: string;
	players: User[];
	show: boolean;
	voted: number;
	constructor() {
		this.inSession = true;
		this.players = [];
		this.voted = 0;
		this.show = false;
	}
}

export default class PointingSession extends React.Component<
	PointingSessionProps,
	PointingSessionState
> {
	constructor(props: PointingSessionProps) {
		super(props);
		this.state = new PointingSessionState();
		socket = io("http://localhost:3030");
		this.joinActiveSession = this.joinActiveSession.bind(this);
		this.estimateSelected = this.estimateSelected.bind(this);
		this.showResults = this.showResults.bind(this);
		this.clearCurrentVotes = this.clearCurrentVotes.bind(this);
	}

	joinActiveSession(userName: string): void {
		this.setState({
			userName
		});
		socket.emit("joined", userName);
		socket.on("users", (users: User[]) => {
			this.setState({
				["players"]: users,
				["voted"]: users.filter(e => e.vote).length
			});
		});
	}

	showResults(): void {
		this.setState({
			["show"]: true
		});
	}

	clearCurrentVotes(): void {
		this.setState({
			["show"]: false
		});
		socket.emit("clear", this.state.userName);
	}

	estimateSelected(vote: number | null) {
		if (socket) {
			socket.emit("voted", { name: this.state.userName, vote });
		}
	}

	render(): JSX.Element {
		return (
			<div className="component">
				<JoinSession onJoin={this.joinActiveSession} />
				<div
					className={
						"disabled-overlay " + this.state.inSession
							? "enabled"
							: "disabled"
					}
				>
					<VotingDashboard
						totalPlayers={this.state.players.length}
						totalVoted={this.state.voted}
						onClearAction={this.clearCurrentVotes}
						onShowAction={this.showResults}
					/>
					<VotingOptions
						onVoteSelected={this.estimateSelected}
						options={["1", "3", "5", "8", "13", "20", "40", "100", "?"]}
					/>
					<VotingResults
						user={this.state.userName}
						players={this.state.players}
						show={this.state.show}
						onClearVote={this.estimateSelected}
					/>
				</div>
			</div>
		);
	}
}
