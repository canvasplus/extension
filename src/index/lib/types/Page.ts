export interface Page {
  id: string;
  numberId: string;
  title: string;
  updated: number;
  created: number;
  body?: string;
  published: boolean;
  isFrontPage: boolean;
  isLocked: boolean;
  lockExplanation?: string;
}
