import { GitLabConfig } from "./gitlab-config";

export class DashboardConfig {
  gitlab: GitLabConfig | null = null;
  lastUpdate: Date = new Date("2000-01-01");
  refreshInterval = 15;

  constructor(gitlab: GitLabConfig) {
    this.gitlab = gitlab;
  }
}
