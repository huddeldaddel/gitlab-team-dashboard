export class GitLabConfig {
    
    // credentials
    host: string;    
    token: string;

    // other
    lastUpdate: Date = new Date("2000-01-01");
    maxProjectCount?: number;
    refreshInterval: number;
    
    constructor (host: string, token: string, maxProjectCount: number | undefined, refreshInterval: number) {
        this.host = host;
        this.token = token;        
        this.maxProjectCount = maxProjectCount;
        this.refreshInterval = refreshInterval;
    }

}