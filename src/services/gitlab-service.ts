import { ConfigService } from "./config-service";
import { Gitlab } from "@gitbeaker/browser";
import { Project } from "../model/project";
import { Pipeline } from "../model/pipeline";
import { MergeRequest } from "../model/merge-request";

export class GitLabService {
  private static storageKey = "GitLab";
  private api;

  public constructor() {
    const config = new ConfigService().loadConfig();
    this.api = new Gitlab({
      host: config?.gitlab?.host,
      token: config?.gitlab?.token,
    });
  }

  /**
   * Loads the dashboard data.
   */
  public loadData(): Project[] {
    const json = localStorage.getItem(GitLabService.storageKey);
    if (json) {
      return JSON.parse(json);
    }
    return [];
  }

  /**
   * Returns whether or not the dashboard data should be updated.
   * This is based on the date / time of last update and the configured update interval.
   */
  public shouldUpdate(): boolean {
    const config = new ConfigService().loadConfig();
    if (!config) {
      return false;
    }

    const lastUpdate = config.gitlab?.lastUpdate || new Date("2000-01-01");
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - lastUpdate.getTime());
    return diffTime / 1_000 / 60 >= (config.gitlab?.refreshInterval || 15);
  }

  /**
   * Updates the dashboard data by reloading all data via API.
   */
  public async updateData(): Promise<Project[]> {
    console.debug("Starting update of dashboard data");
    const configService = new ConfigService();
    const config = configService.loadConfig();
    if (!config || !config.gitlab) {
      console.info("Can't update dasboard data: missing configuration");
      return [];
    }

    const maxPages =
      typeof config.gitlab.maxProjectCount == "number"
        ? config.gitlab.maxProjectCount / 20
        : undefined;

    try {
      console.debug("Updating list of projects");
      const projectList: Project[] = [];
      const projects = await this.api.Projects.all({ maxPages: maxPages });
      for (let i = 0; i < projects.length; i++) {
        const mergeRequests = await this.getMergeRequestsForProject(
          projects[i].id,
          projects[i].name
        );
        const pipeline = await this.getPipelineForProject(
          projects[i].id,
          projects[i].name
        );
        projectList.push(new Project(projects[i], mergeRequests, pipeline));
      }
      localStorage.setItem(
        GitLabService.storageKey,
        JSON.stringify(projectList)
      );
      config.gitlab.lastUpdate = new Date();
      configService.updateConfig(config);
      return projectList;
    } catch (outerException) {
      console.debug("Failed to get list of projects");
      return [];
    }
  }

  private async getMergeRequestsForProject(
    projectId: number,
    projectName: string
  ): Promise<MergeRequest[]> {
    console.debug(`Getting merge requests for project ${projectName}`);
    try {
      const mergeRequests = await this.api.MergeRequests.all({
        projectId: projectId,
        maxPages: 1,        
        perPage: 10,
        scope: "all",
        sort: "desc",
        state: "opened"
      });
      return mergeRequests.map((mr) => MergeRequest.fromMergeRequestSchema(mr));      
    } catch (innerException) {
      console.debug(`Failed to get merge requests for project ${projectName}`);
      return [];
    }
  }

  private async getPipelineForProject(
    projectId: number,
    projectName: string
  ): Promise<Pipeline | null> {
    console.debug(`Getting pipeline status for project ${projectName}`);
    try {
      const pipelines = await this.api.Pipelines.all(projectId, {
        maxPages: 1,
        order_by: "updated_at",
        perPage: 1,
        sort: "desc",
      });
      const pipeline =
        pipelines.length > 0 ? Pipeline.fromPipelineSchema(pipelines[0]) : null;
      return pipeline;
    } catch (innerException) {
      console.debug(`Failed to get pipeline status for project ${projectName}`);
      return null;
    }
  }
}
