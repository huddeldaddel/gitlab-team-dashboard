import { MergeRequestSchema } from "@gitbeaker/core/dist/types/resources/MergeRequests";
import { UserSchema } from "@gitbeaker/core/dist/types/resources/Users";

export class MergeRequest {
  authorName: string;
  authorAvatar: string | null;
  authorWebUrl: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  webUrl: string;

  constructor(
    authorName: string,
    authorAvatar: string | null,
    authorWebUrl: string,
    id: number,
    createdAt: string,
    updatedAt: string,
    title: string,
    webUrl: string
  ) {
    this.authorName = authorName;
    this.authorAvatar = authorAvatar;
    this.authorWebUrl = authorWebUrl;
    this.id = id;
    this.title = title;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.webUrl = webUrl;
  }

  static fromMergeRequestSchema(mr: MergeRequestSchema): MergeRequest {
    const author = mr.author as UserSchema;
    return new MergeRequest(
      author.name,
      author.avatar_url,
      author.web_url,
      mr.id,
      mr.created_at,
      mr.updated_at,
      mr.title,
      mr.web_url
    );
  }
}
