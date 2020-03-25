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
import io  from "socket.io-client";
import JoinSession from "./JoinSession";

let socket: any;
const options = ["½", "1", "3", "5", "8", "13", "20", "40", "100", "?"];

export class User {
	id: string;
	name: string;
	vote: number;
}

class PointingSessionProps {}

class PointingSessionState {
	inSession: boolean;
	activeSelection: number;
	userName: string;
	players: Array<User>;
	constructor() {
		this.inSession = true;
		this.players = [];
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
	}

	joinActiveSession(userName: string): void {
		this.setState({
			userName
		});
		socket.emit("joined", userName);
		socket.on('users voted', (users: User[]) => {
			console.log('users or voted event: ' + users);
			this.setState({
				players: users
			});
		});
	}

	estimateSelected(estimate: number) {
		this.setState({
			activeSelection: estimate
		});
		if (socket) {
			socket.emit("voted", estimate);
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
										<Button color="primary">Clear</Button>
									</InputGroupAddon>
									<InputGroupAddon addonType="append">
										<Button color="primary">Show</Button>
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
						<CardTitle>Players:</CardTitle>
						<Table>
							<thead>
								<tr>
									<th>#</th>
									<th>Name</th>
									<th>Points</th>
								</tr>
							</thead>
							<tbody>
								{
									this.state.players.map((player, index) =>
										<tr>
											<td>{index}</td>
											<td>{player.name}</td>
											<td>{player.vote}</td>
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
