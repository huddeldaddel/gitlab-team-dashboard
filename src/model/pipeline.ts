import { PipelineSchema } from '@gitbeaker/core/dist/types/resources/Pipelines'

export class Pipeline {

    id: number;    
    status: string;
    createdAt: string;
    updatedAt: string;
    webUrl: string;

    constructor(id: number, status: string, createdAt: string, updatedAt: string, webUrl: string) {
        this.id = id;        
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.webUrl = webUrl;
    }

    static fromPipelineSchema(pip: PipelineSchema): Pipeline {
        return new Pipeline(pip.id, pip.status, pip.created_at, pip.updated_at, pip.web_url);
    }
    
}