import powerbiVisualsApi from "powerbi-visuals-api";
import { createModel } from "@rematch/core";
import { RootModel } from ".";

export interface IChartData {
  xAxis: string;
  selectionId: powerbiVisualsApi.visuals.ISelectionIdBuilder;
  isHighlighted?: boolean;
  [key: string]: any;
}
const initialState: IChartData[] = [];

export const chartData = createModel<RootModel>()({
  state: initialState,
  reducers: {
    update(state, payload: Partial<IChartData[]>): IChartData[] {
      return payload;
    },
  },
  effects: (dispatch) => ({}),
});
