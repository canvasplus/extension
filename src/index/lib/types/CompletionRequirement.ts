export interface CompletionRequirement {
  type:
    | "must_view"
    | "must_submit"
    | "must_contribute"
    | "min_score"
    | "must_mark_done";
  min_score: number;
  completed: boolean;
}
