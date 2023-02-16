import { GitLabConfig } from "./gitlab-config"

export class DashboardConfig {
    gitlab: GitLabConfig | null = null;    

    constructor (gitlab: GitLabConfig) {
        this.gitlab = gitlab;
    }
}