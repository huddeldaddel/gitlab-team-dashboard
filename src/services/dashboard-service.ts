import { ConfigService } from "./config-service";
import { Gitlab } from "@gitbeaker/browser";
import { Project } from "../model/project";
import { Pipeline } from "../model/pipeline";

export class DashboardService {
  /**
   * Loads the dashboard data.
   */
  public loadData(): Project[] | null {
    const json = localStorage.getItem("dashboard");
    if (json) {
      return JSON.parse(json);
    }
    return null;
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

    const lastUpdate = config.lastUpdate;
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - lastUpdate.getTime());
    return diffTime / 1_000 / 60 >= config.refreshInterval;
  }

  /**
   * Updates the dashboard data by reloading all data via API.
   */
  public async updateData() {
    console.debug("Starting update of dashboard data");
    const configService = new ConfigService();
    const config = configService.loadConfig();
    if (!config) {
      console.info("Can't update dasboard data: missing configuration");
      return;
    }

    const api = new Gitlab({
      host: config?.gitlab?.host,
      token: config?.gitlab?.token,
    });
    const maxPages =
      typeof config?.gitlab?.maxProjectCount == "number"
        ? config.gitlab.maxProjectCount / 20
        : undefined;

    try {
      console.debug("Updating list of projects");
      const projectList: Project[] = [];
      const projects = await api.Projects.all({ maxPages: maxPages });
      for (let i = 0; i < projects.length; i++) {
        console.debug(
          `Getting pipeline status for project ${projects[i].name}`
        );
        try {
          const pipelines = await api.Pipelines.all(projects[i].id, {
            maxPages: 2,
            order_by: "updated_at",
            perPage: 1,
            sort: "desc",
          });
          const pipeline =
            pipelines.length > 0
              ? Pipeline.fromPipelineSchema(pipelines[0])
              : null;
          projectList.push(new Project(projects[i], pipeline));
        } catch (innerException) {
          console.debug(
            `Failed to get pipeline status for project ${projects[i].name}`
          );
          projectList.push(new Project(projects[i], null));
        }
      }
      localStorage.setItem("dashboard", JSON.stringify(projectList));
      config.lastUpdate = new Date();
      configService.updateConfig(config);
    } catch (outerException) {
      console.debug("Failed to get list of projects");
    }
  }
}
