import { GitLabConfig } from "./gitlab-config"

export class DashboardConfig {
    gitlab: GitLabConfig | null = null;
    refreshInterval: number = 15;

    constructor (gitlab: GitLabConfig) {
        this.gitlab = gitlab;
    }
}