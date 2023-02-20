import { ProjectSchema } from '@gitbeaker/core/dist/types/resources/Projects'
import { Pipeline } from './pipeline';

export class Project {

    id: number;
    name: string;
    pipeline: Pipeline | null;
    webUrl: string; 
    
    constructor(project: ProjectSchema, pipeline: Pipeline | null) {
        this.id = project.id;
        this.name = project.name;
        this.pipeline = pipeline;
        this.webUrl = project.web_url;
    }

}