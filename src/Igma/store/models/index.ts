import {Models} from "@rematch/core";
import {annotation} from "./annotation";
import {count} from "./count";
import {dimensions} from "./dimensions";
import {chartData} from "./chartData";
import {colorPallet} from "./colorPallet";
import {visualMetaData} from "./visualMetaData";

export interface RootModel extends Models<RootModel> {
	annotation: typeof annotation;
	chartData: typeof chartData;
	colorPallet: typeof colorPallet;
	count: typeof count;
	dimensions: typeof dimensions;
	visualMetaData: typeof visualMetaData;
}

export const models: RootModel = {
	annotation,
	chartData,
	count,
	colorPallet,
	dimensions,
	visualMetaData,
};
