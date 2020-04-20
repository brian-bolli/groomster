import * as React from "react";
import {
	Card,
	CardBody,
	InputGroup,
	InputGroupAddon,
	Button,
	Input
} from "reactstrap";

class JoinSessionProps {
	onJoin: Function;
}

class JoinSessionState {
	userName: string;
	inSession: boolean;
	constructor() {
		this.userName = '';
		this.inSession = false;
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
		this.setState({
			userName: newValue
		});
	}

	render(): JSX.Element {
		return (
			<div className={"pointer-wrapper " + (this.state.inSession ? 'hidden' : 'show')}>
				<Card>
					<CardBody>
						<InputGroup>
							<Input type="text" value={this.state.userName} onChange={this.inputChanged} />
							<InputGroupAddon addonType="append">
								<Button onClick={() => this.props.onJoin(this.state.userName)}>Join</Button>
							</InputGroupAddon>
						</InputGroup>
					</CardBody>
				</Card>
			</div>
		);
	}
}
