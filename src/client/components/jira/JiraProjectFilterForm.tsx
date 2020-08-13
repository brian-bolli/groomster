import * as React from "react";
import { Form, Card, CardBody } from "reactstrap";
import JiraProjectFilter from "./JiraProjectFilter";
import { Project, TicketStatus } from "../../../shared/models/jira";


class JiraProjectFilterFormProps {
}

class JiraProjectFilterFormState {

}

export default class JiraProjectFilterForm extends React.Component<JiraProjectFilterFormProps, JiraProjectFilterFormState> {

	constructor(props: JiraProjectFilterFormProps) {
		super(props);
	}

	render(): JSX.Element {
		return (
			<Card>
				<CardBody>
					<Form>
						<JiraProjectFilter<Project> filterUrl="/jira/projects" filterName="project" filterLabel="Project" filterKey="name" />
						<JiraProjectFilter<TicketStatus> filterUrl="/jira/statuses" filterName="status" filterLabel="Ticket Status" filterKey="name" />
					</Form>
				</CardBody>
			</Card>
		);
	}

}
