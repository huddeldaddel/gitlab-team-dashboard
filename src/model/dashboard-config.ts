import { DisplayConfig } from "./display-config";
import { GitLabConfig } from "./gitlab-config";

export class DashboardConfig {
  display: DisplayConfig | null = null;
  gitlab: GitLabConfig | null = null;    

  constructor(display: DisplayConfig, gitlab: GitLabConfig) {
    this.display = display;
    this.gitlab = gitlab;
  }
}
