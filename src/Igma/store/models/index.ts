import { Models } from "@rematch/core";
import { count } from "./count";
import { dimensions } from "./dimensions";
import { chartData } from "./chartData";

export interface RootModel extends Models<RootModel> {
  count: typeof count;
  dimensions: typeof dimensions;
  chartData: typeof chartData;
}

export const models: RootModel = { chartData, count, dimensions };
