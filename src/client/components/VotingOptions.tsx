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
	user: string;
	options: string[];
	activeSelection: string;
}

class VotingOptionsState {

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
			<div className="row align-items-center mt-3">
				{this.props.options.map((option, index) => (
					<div className="col-4" key={index}>
						<Button
							className={`voting-option mb-3 ${(this.props.activeSelection === option) ? 'primary' : ''}`}
							active={(this.props.activeSelection === option)	? true : false}
							disabled={(this.props.user) ? false : true}
							onClick={() => this.props.onVoteSelected(isNaN(parseInt(option)) ? option : parseInt(option).toString())}
						>
							{option}
						</Button>
					</div>
				))}
			</div>
		);
	}
}
