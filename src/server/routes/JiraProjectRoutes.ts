import { Router, Request, Response } from "express";
import { HttpMethods } from "Enums";
import { Project, ProjectType, ProjectCategory, TicketStatus } from "Models";
import { JiraRestRequest } from "./JiraRestRequest";

const jiraProjectRoutes = Router();

jiraProjectRoutes.get('/jira/statuses',  async (req: Request, res: Response) => {
	const restRequest = new JiraRestRequest<TicketStatus[]>(HttpMethods.GET, 'status');
	let statuses = await restRequest.makeRestRequest();
	res.json(statuses);
});

jiraProjectRoutes.get('/jira/projects',  async (req: Request, res: Response) => {
	const restRequest = new JiraRestRequest<Project[]>(HttpMethods.GET, 'project');
	let projectTypes = await restRequest.makeRestRequest();
	res.json(projectTypes);
});

jiraProjectRoutes.get('/jira/project/types', async (req: Request, res: Response) => {
	const restRequest = new JiraRestRequest<ProjectType[]>(HttpMethods.GET, 'project/type');
	let projectTypes = await restRequest.makeRestRequest();
	res.json(projectTypes);
});

jiraProjectRoutes.get('/jira/project/categories', async (req: Request, res: Response) => {
	const restRequest = new JiraRestRequest<ProjectCategory[]>(HttpMethods.GET, 'projectCategory');
	let projectTypes = await restRequest.makeRestRequest();
	res.json(projectTypes);
});

jiraProjectRoutes.get('/jira/project/:projectId/hierarchy',  async (req: Request, res: Response) => {
	const projectId: string = req.params.projectId;
	const restRequest = new JiraRestRequest<Project[]>(HttpMethods.GET, `project/${projectId}/hierarchy`);
	let projectTypes = await restRequest.makeRestRequest();
	res.json(projectTypes);
});

export default jiraProjectRoutes;
