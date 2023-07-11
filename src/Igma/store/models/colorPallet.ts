import { createModel } from "@rematch/core";
import { RootModel } from ".";

export enum EThemes {
  UltraViolet = "ultraViolet",
}

export interface IColorPallet {
  theme: EThemes;
}

const initialState: IColorPallet = {
  theme: EThemes.UltraViolet,
};

export const colorPallet = createModel<RootModel>()({
  state: initialState,
  reducers: {
    update(state, payload: Partial<IColorPallet>): IColorPallet {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: (dispatch) => ({}),
});
