export class GitLabConfig {
    
    // credentials
    host: string;    
    token: string;

    // other
    maxProjectCount?: number;
    
    constructor (host: string, token: string, maxProjectCount: number | undefined) {
        this.host = host;
        this.token = token;
        this.maxProjectCount = maxProjectCount;
    }

}