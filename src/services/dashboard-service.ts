import { ConfigService } from './config-service';
import { Gitlab } from '@gitbeaker/browser';
import { Project } from '../model/project';
import { Pipeline } from '../model/pipeline';

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
     * Updates the dashboard data by reloading all data via API.
     */
    public async updateData() {
        const config = new ConfigService().loadConfig();
        const api = new Gitlab({
            host: config?.gitlab?.host,
            token: config?.gitlab?.token,
        });
        const maxPages = typeof config?.gitlab?.maxProjectCount == 'number' ? config.gitlab.maxProjectCount / 20 : undefined;

        const projectList: Project[] = [];
        const projects = await api.Projects.all({ maxPages: maxPages });
        for (let i = 0; i < projects.length; i++) {
            const pipelines = await api.Pipelines.all(projects[i].id, { maxPages: 2, order_by: "updated_at", perPage: 1, sort: "desc" });
            const pipeline = (pipelines.length > 0) ? Pipeline.fromPipelineSchema(pipelines[0]) : null;
            projectList.push(new Project(projects[i], pipeline));
        }
        localStorage.setItem("dashboard", JSON.stringify(projectList));
    }

}