import { CompletionRequirement } from "./CompletionRequirement";

export interface ModuleItem {
  id: number;
  moduleId: number;
  position: number;
  title: string;
  indent: number;
  type:
    | "File"
    | "Page"
    | "Discussion"
    | "Assignment"
    | "Quiz"
    | "SubHeader"
    | "ExternalUrl"
    | "ExternalTool";
  contentId?: number;
  htmlUrl?: string;
  pageUrl?: string;
  externalUrl?: string;
  newTab?: boolean;
  completionRequirement?: CompletionRequirement;
  published: boolean;
}
