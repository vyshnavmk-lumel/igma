import { init, RematchDispatch, RematchRootState } from "@rematch/core";
import { models, RootModel } from "./models";

export const store = init({
  models,
});

export type IStore = typeof store;
export type IDispatch = RematchDispatch<RootModel>;
export type IRootState = RematchRootState<RootModel>;