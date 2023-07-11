import { Models } from "@rematch/core";
import { count } from "./count";
import { dimensions } from "./dimensions";
import { chartData } from "./chartData";
import { colorPallet } from "./colorPallet";

export interface RootModel extends Models<RootModel> {
  chartData: typeof chartData;
  colorPallet: typeof colorPallet;
  count: typeof count;
  dimensions: typeof dimensions;
}

export const models: RootModel = { chartData, count, colorPallet, dimensions };
