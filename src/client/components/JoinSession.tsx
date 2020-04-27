import * as React from "react";
import {
	Card,
	CardBody,
	InputGroup,
	InputGroupAddon,
	Button,
	Input,
	InputProps,
	Alert
} from "reactstrap";
import e from "express";

class JoinSessionProps {
	onJoin: Function;
}

class JoinSessionState {
	userName: string;
	inSession: boolean;
	isValid: boolean;
	constructor() {
		this.userName = '';
		this.inSession = false;
		this.isValid = false;
	}
}

export default class JoinSession extends React.Component<
	JoinSessionProps,
	JoinSessionState
> {
	state: JoinSessionState;

	constructor(props: JoinSessionProps) {
		super(props);
		this.state = new JoinSessionState();
		this.inputChanged = this.inputChanged.bind(this);
	}

	inputChanged(e: React.FormEvent<HTMLInputElement>): void {
		const newValue = e.currentTarget.value;
		if (newValue.length >= 3) {
			fetch(`http://localhost:3000/name-check/${newValue}`)
				.then(res => res.json())
				.then((result: any) => {
					console.log(result);
					this.setState({
						['isValid']: result.isValid
					})
				});
		}
		this.setState({
			userName: newValue
		});
	}

	disableJoin(): boolean {
		let disabled: boolean = false;
		if (this.state.userName.length < 3) {
			disabled = true;
		}
		if (this.state.isValid === false) {
			disabled = true;
		}
		return disabled;
	}

	render(): JSX.Element {
		return (
			<div className={"pointer-wrapper " + (this.state.inSession ? 'hidden' : 'show')}>
				<Card>
					<CardBody>
						<Alert color="danger" isOpen={this.state.userName.length < 3}>Name must be at least 3 characters</Alert>
						<Alert color="danger" isOpen={!this.state.isValid && this.state.userName.length >= 3}>Name is not unique</Alert>
						<InputGroup>
							<Input type="text" value={this.state.userName} onChange={this.inputChanged} />
							<InputGroupAddon addonType="append">
								<Button onClick={() => this.props.onJoin(this.state.userName)} disabled={this.disableJoin()}>Join</Button>
							</InputGroupAddon>
						</InputGroup>
					</CardBody>
				</Card>
			</div>
		);
	}
}
