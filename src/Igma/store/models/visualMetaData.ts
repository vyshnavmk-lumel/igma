import { createModel } from "@rematch/core";
import { RootModel } from ".";

export interface IVisualMetaData {
  showLandingPage: boolean;
  showWarningMessage: boolean;
}
const initialState: IVisualMetaData = {
  showLandingPage: true,
  showWarningMessage: false,
};

export const visualMetaData = createModel<RootModel>()({
  state: initialState,
  reducers: {
    update(state, payload: Partial<IVisualMetaData>): IVisualMetaData {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: (dispatch) => ({}),
});
