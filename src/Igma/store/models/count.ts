import { createModel } from "@rematch/core";
import { RootModel } from "./";

type TQuestionType = "true-false" | "other-value";
type TQuestion = {
  title: string;
};

export interface ICountState {
  questions: Array<TQuestion>;
  questionType: TQuestionType;
  name: string;
  metaData: string[];
}

export const count = createModel<RootModel>()({
  state: {
    questions: [],
    questionType: "true-false",
    name: 'Vyshnav',
    metaData: [],
  } as ICountState, // typed complex state
  reducers: {
    // handle state changes with pure functions
    update(state, payload: Partial<ICountState>): ICountState {
        return {
            ...state,
            ...payload,
        };
    },
  },
  effects: (dispatch) => ({
  }),
});