import React from "react";
import { connect } from "react-redux";
import { IDispatch, IRootState } from "./store/store";

type IApp = TMapState & TMapDispatch;
const App = (props: IApp) => {
  const { count } = props;
  return (
    <div>
      Hello World
      {count.name}
      {count.metaData.map((meta) => (
        <p> {meta} </p>
      ))}
    </div>
  );
};
const mapState = (state: IRootState) => ({
  count: state.count,
});
const mapDispatch = (dispatch: IDispatch) => ({
  incrementAsync: () => dispatch.count.update,
});
type TMapState = ReturnType<typeof mapState>;
type TMapDispatch = ReturnType<typeof mapDispatch>;

export default connect(mapState, mapDispatch)(App);
