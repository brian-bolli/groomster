import * as React from "react";
import {
	Button,
	Card,
	CardBody,
	CardTitle,
	InputGroup,
	InputGroupAddon,
	Input,
	Table
} from "reactstrap";
import Octicon, { Clock, Check, X } from "@primer/octicons-react";
import io  from "socket.io-client";
import JoinSession from "./JoinSession";

let socket: any;
const options = ["1", "3", "5", "8", "13", "20", "40", "100", "?"];
const values = [1, 3, 5, 8, 13, 20, 40, 100]

export class User {
	id: string;
	name: string;
	vote: number;
}

class PointingSessionProps {}

class PointingSessionState {
	inSession: boolean;
	activeSelection: number | null;
	userName: string;
	players: User[];
	ready: boolean;
	show: boolean;
	voted: number;
	constructor() {
		this.inSession = true;
		this.players = [];
		this.voted = 0;
		this.ready = false;
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
		socket.on('users', (users: User[]) => {
			console.log('users or voted event: ' + users);
			this.setState({
				['players']: users,
				['ready']: (users.filter(e => e.vote).length === users.length),
				['voted']: users.filter(e => e.vote).length
			});
		});
	}

	showResults(): void {
		this.setState({
			['show']: true
		});
	}

	clearCurrentVotes(): void {
		this.setState({
			['show']: false
		});
		socket.emit("clear", this.state.userName);
	}

	estimateSelected(estimate: number | null) {
		this.setState({
			['activeSelection']: estimate
		});
		if (socket) {
			socket.emit("voted", { name: this.state.userName, vote: values[estimate] });
		}
	}

	renderUserActions(name: string, vote: number): JSX.Element {
		if (name === this.state.userName) {
			return <Button outline className="user-action-button" color="primary" disabled={!vote} onClick={() => this.estimateSelected(null)} size="sm"><Octicon icon={X}/></Button>
		}
	}

	render(): JSX.Element {
		return (
			<div className="component">
				<JoinSession onJoin={this.joinActiveSession} />
				<div className={"disabled-overlay " + (this.state.inSession) ? 'enabled' : 'disabled'}>
				<Card>
					<CardBody>
						<CardTitle>Current Story</CardTitle>
						<div className="row align-items-center">
							<div className="col">
								<InputGroup>
									<Input />
									<InputGroupAddon addonType="append">
										<Button color="secondary" disabled={this.state.voted === 0} onClick={() => this.clearCurrentVotes()}>Clear</Button>
									</InputGroupAddon>
									<InputGroupAddon addonType="append">
										<Button color="primary" disabled={this.state.voted < this.state.players.length || !this.state.userName} onClick={() => this.showResults()}>Show</Button>
									</InputGroupAddon>
								</InputGroup>
							</div>
						</div>
					</CardBody>
				</Card>
				<Card>
					<CardBody>
						<div className="row align-items-center">
							{options.map((option, index) => (
								<div className="col-4" key={index}>
									<Button
										className="estimate-buttons align-self-center"
										onClick={() =>
											this.estimateSelected(index)
										}
										active={this.state.activeSelection === index}
									>
										{option}
									</Button>
								</div>
							))}
						</div>
					</CardBody>
				</Card>
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
								{
									this.state.players.map((player, index) =>
										<tr key={index} className={player.vote ? 'ready' : 'not-ready'}>
											<td><Octicon icon={player.vote ? Check : Clock} /></td>
											<td>{player.name}</td>
											<td>
												<div className="voting-wrapper">
													<div className={`voting-card ${(this.state.show) ? 'show' : 'hide'}`}>{player.vote}</div>
													{this.renderUserActions(player.name, player.vote)}
												</div>
											</td>
										</tr>
									)
								}
							</tbody>
						</Table>
					</CardBody>
				</Card>
				</div>
			</div>
		);
	}
}
