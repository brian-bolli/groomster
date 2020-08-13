import * as React from "react";
import { CustomInput, FormGroup, Label } from "reactstrap";

class JiraProjectFilterProps {
	filterUrl: string;
	filterName: string;
	filterLabel: string;
	filterKey: string;
}

class JiraProjectFilterState<T> {
	options: T[];
	constructor() {
		this.options = [];
	}
}

export default class JiraProjectFilter<T> extends React.Component<JiraProjectFilterProps, JiraProjectFilterState<T>> {

	constructor(props: JiraProjectFilterProps) {
		super(props);
		this.state = new JiraProjectFilterState();
		fetch(this.props.filterUrl)
			.then(res => res.json())
			.then((results: T[]) => {
				this.setState({
					['options']: results
				});
			});

	}

	renderFilter(): JSX.Element {
		if (this.state.options.length === 0) {
			return null;
		}
		return (
			<div>
				{this.state.options.map((option: T, index: number) => <CustomInput type="checkbox" key={index} id={`filterOptions${index}`} label={option[this.props.filterKey as keyof T]} />)}
			</div>
		);
	}

	render(): JSX.Element {
		return (
			<FormGroup>
				<Label for={this.props.filterName}>{this.props.filterLabel}</Label>
				{this.renderFilter()}
			</FormGroup>
		);
	}

}
