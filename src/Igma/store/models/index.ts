import { Models } from "@rematch/core";
import { count } from "./count";
import { dimensions } from "./dimensions";

export interface RootModel extends Models<RootModel> {
  count: typeof count;
  dimensions: typeof dimensions;
}

export const models: RootModel = { count, dimensions };