export interface Page {
  id: number;
  url: string;
  title: string;
  updated: number;
  created: number;
  body?: string;
  published: boolean;
  isFrontPage: boolean;
  isLocked: boolean;
  lockExplanation?: string;
}
