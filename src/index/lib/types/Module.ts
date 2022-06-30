import { ModuleItem } from "./ModuleItem";

export interface Module {
  id: number;
  position: number;
  name: string;
  unlockDate: number;
  sequential: boolean;
  prerequisites?: number[];
  itemCount: number;
  itemsURL: string;
  items?: ModuleItem[];
  state: "started" | "completed" | "locked" | "unlocked";
  published: boolean;
}
