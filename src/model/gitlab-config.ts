export class GitLabConfig {
    
    host: string;
    token: string;
    
    constructor (host: string, token: string) {
        this.host = host;
        this.token = token;
    }

}