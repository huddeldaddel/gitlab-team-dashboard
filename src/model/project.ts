import { ProjectSchema } from '@gitbeaker/core/dist/types/resources/Projects'
import { MergeRequest } from './merge-request';
import { Pipeline } from './pipeline';

export class Project {

    id: number;
    name: string;
    mergeRequests: MergeRequest[];
    pipeline: Pipeline | null;
    webUrl: string; 
    
    constructor(project: ProjectSchema, mergeRequests: MergeRequest[], pipeline: Pipeline | null) {
        this.id = project.id;
        this.name = project.name;
        this.mergeRequests = mergeRequests;
        this.pipeline = pipeline;
        this.webUrl = project.web_url;
    }

}