import * as React from "react";
import JiraProjectFilterForm from "./jira/JiraProjectFilterForm";

class CreateJiraSessionProps {
}

class CreateJiraSessionState {
}

export default class CreateJiraSession extends React.Component<CreateJiraSessionProps, CreateJiraSessionState> {

	constructor(props: CreateJiraSessionProps) {
		super(props);
	}

	render(): JSX.Element {
		return (
			<JiraProjectFilterForm />
		);
	}

}
