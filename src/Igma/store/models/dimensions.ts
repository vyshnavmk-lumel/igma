import { createModel } from "@rematch/core";
import { RootModel } from ".";

export interface IDimensions {
  height: number;
  width: number;
}

const initialState: IDimensions = {
  height: 0,
  width: 0,
};

export const dimensions = createModel<RootModel>()({
  state: initialState,
  reducers: {
    update(state, payload: Partial<IDimensions>): IDimensions {
      console.log('dime', payload);
      
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: (dispatch) => ({}),
});
