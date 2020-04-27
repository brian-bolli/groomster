import * as React from "react";
import io from "socket.io-client";

import JoinSession from "./JoinSession";
import VotingDashboard from "./VotingDashboard";
import VotingResults from "./VotingResults";
import VotingOptions from "./VotingOptions";
import { SocketMessage } from "../../shared/enums";

let socket: SocketIOClient.Socket;

export class User {
	name: string;
	vote: number;
}

class PointingSessionProps {}

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
		socket = io("http://localhost:3000");
		this.joinActiveSession = this.joinActiveSession.bind(this);
		this.estimateSelected = this.estimateSelected.bind(this);
		this.showResults = this.showResults.bind(this);
		this.clearCurrentVotes = this.clearCurrentVotes.bind(this);
	}

	joinActiveSession(userName: string): void {
		this.setState({
			['userName']: userName
		});
		// socket.on(SocketMessage.ISVALID, (errors: string[]) => {
		// 	console.log('is valid -> ', errors);
		// 	if (errors.length === 0) {
		// 		this.setState({
		// 			['userName']: userName
		// 		});

		// 	} else {
		// 		this.setState({
		// 			['alerts']: errors
		// 		})
		// 	}
		// });
		socket.emit(SocketMessage.JOINED, userName);
		socket.on(SocketMessage.USERS, (users: User[]) => {
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
		socket.emit('validate', userName);
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
		socket.emit(SocketMessage.CLEAR, this.state.userName);
	}

	estimateSelected(vote: number | null) {
		if (socket) {
			socket.emit("voted", { name: this.state.userName, vote });
		}
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
					{/* <div className="col-md-12 my-2">
						<JoinSession onJoin={this.joinActiveSession} />
					</div> */}
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
