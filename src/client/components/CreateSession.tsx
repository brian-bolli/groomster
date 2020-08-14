import * as React from "react";
import { Form, FormGroup, Label, Col, Input, Button, Card, CardBody, FormFeedback, Alert } from "reactstrap";
import { Redirect } from "react-router-dom";

class CreateSessionProps {
}

class CreateSessionState {
	sessionName: string;
	userName: string;
	validSessionName: boolean;
	formValid: boolean;
	constructor() {
		this.sessionName = '';
		this.userName = '';
		this.validSessionName = false;
		this.formValid = false;
	}
}

export default class CreateSession extends React.Component<CreateSessionProps, CreateSessionState> {

	constructor(props: CreateSessionProps) {
		super(props);
		this.state = new CreateSessionState();
		console.log(document.cookie);
		this.createSession = this.createSession.bind(this);
		this.sessionInputChanged = this.sessionInputChanged.bind(this);
		this.nameInputChanged = this.nameInputChanged.bind(this);
	}

	createSession(e: React.FormEvent<HTMLButtonElement>) {
		if (
			this.state.userName.length >= 3 &&
			this.state.sessionName.length >= 3 &&
			this.state.validSessionName
			) {
				this.setState({
					['formValid']: true
				});
		}
	}

	sessionInputChanged(e: React.FormEvent<HTMLInputElement>): void {
		const newValue = e.currentTarget.value;
		this.setState({
			['sessionName']: newValue
		});
		if (newValue.length >= 3) {
			fetch(`/room-check/${newValue}`)
			.then(res => res.json())
			.then(result => {
				this.setState({
					['validSessionName']: result.isValid
				})
			});
		}
	}

	nameInputChanged(e: React.FormEvent<HTMLInputElement>): void {
		const newValue = e.currentTarget.value;
		this.setState({
			['userName']: newValue
		});
	}

	render(): JSX.Element {
		if (this.state.formValid) {
			return <Redirect to={`/session?room=${this.state.sessionName}&name=${this.state.userName}`} />
		}
		return (
			<div className="container p-2">
				<div className="row">
					<Col sm={12}>
						<Card>
							<CardBody>
								<Alert color="danger" isOpen={this.state.sessionName.length < 3 && this.state.sessionName.length !== 0}>Session name must be longer than 3 characters.</Alert>
								<Alert color="danger" isOpen={this.state.userName.length < 3 && this.state.userName.length !== 0}>User name must be longer than 3 characters.</Alert>
								<Alert color="danger" isOpen={this.state.sessionName.length >= 3 && !this.state.validSessionName}>Session name must be unique.</Alert>
								<Form>
									<FormGroup row>
										<Label for="sessionName" sm={2}>Room</Label>
										<Col sm={10}>
											<Input
												type="text"
												name="sessionName"
												id="sessionName"
												value={this.state.sessionName}
												onChange={this.sessionInputChanged}
												placeholder="Enter unique name for grooming session"
											/>
										</Col>
									</FormGroup>
									<FormGroup row>
										<Label for="name" sm={2}>Name</Label>
										<Col sm={10}>
											<Input
												type="text"
												name="name"
												id="name"
												value={this.state.userName}
												onChange={this.nameInputChanged}
												placeholder="Enter your name" />
										</Col>
									</FormGroup>
									<FormGroup check row>
										<Col sm={{ size: 10, offset: 2 }}>
											<Button onClick={this.createSession}>Submit</Button>
										</Col>
									</FormGroup>
								</Form>
							</CardBody>
						</Card>
					</Col>
				</div >
			</div >
		);
	}

}
