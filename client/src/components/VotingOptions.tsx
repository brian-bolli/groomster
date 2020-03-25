import * as React from "react";
import { Card, CardBody, Button } from "reactstrap";

export class VotingOption {
	name: string;
	value: number;
	constructor(name: string, value: number) {
		this.name = name;
		this.value = value;
	}
}

class VotingOptionsProps {
	onVoteSelected: Function;
	options: string[];
}

class VotingOptionsState {
	activeSelection: string;
}

export default class VotingOptions extends React.Component<
	VotingOptionsProps,
	VotingOptionsState
> {
	constructor(props: VotingOptionsProps) {
		super(props);
		this.state = new VotingOptionsState();
	}

	render(): JSX.Element {
		return (
			<Card>
				<CardBody>
					<div className="row align-items-center">
						{this.props.options.map((option, index) => (
							<div className="col-4" key={index}>
								<Button
									className="estimate-buttons align-self-center"
									onClick={() => this.props.onVoteSelected((isNaN(parseInt(option))) ? option : parseInt(option))}
									active={
										this.state.activeSelection === option
									}
								>
									{option}
								</Button>
							</div>
						))}
					</div>
				</CardBody>
			</Card>
		);
	}
}
