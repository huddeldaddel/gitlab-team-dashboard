import { DashboardConfig } from "../model/dashboard-config";

export class ConfigService {
  /**
   * Loads the configuration. Returns null if the configuration hasn't been stored, yet.
   */
  public loadConfig(): DashboardConfig | null {
    const json = localStorage.getItem("config");
    if (json) {
      return JSON.parse(json);
    }
    return null;
  }

  /**
   * Updates the configuration.
   */
  public updateConfig(config: DashboardConfig) {
    localStorage.setItem("config", JSON.stringify(config));
  }
}
