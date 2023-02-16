import { DashboardConfig } from "../model/dashboard-config";

export class ConfigService {

    /**
     * Loads the configuration. Returns null if the configuration hasn't been stored, yet.
     */
    public LoadConfig() : DashboardConfig | null {
        var json = localStorage.getItem("config");
        if (json) {
            return JSON.parse(json);
        }
        return null;
    }

    /**
     * Updates the configuration.
     */
    public UpdateConfig(config: DashboardConfig) {
        var json = JSON.stringify(config);
        localStorage.setItem("config", json);     
        window.location.reload();
    }

}