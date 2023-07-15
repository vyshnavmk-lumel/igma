import React from "react";
import { connect } from "react-redux";
import { IDispatch, IRootState } from "../../store/store";
import ChartWrapper from "./ChartWrapper";
import LandingPage from "./LandingPage";
import WarningPage from "./WarningPage";

type IVisual = TMapState & TMapDispatch;
const Visual = (props: IVisual) => {
  const { visualMetaData } = props;
  const { showLandingPage, showWarningMessage } = visualMetaData;
  console.log('visualMetaData', visualMetaData);
  
  if (showLandingPage) return <LandingPage />;
  if (showWarningMessage) return <WarningPage />;
  return <ChartWrapper />;
};

const mapState = (state: IRootState) => ({
  visualMetaData: state.visualMetaData,
});
const mapDispatch = (dispatch: IDispatch) => ({
  incrementAsync: () => dispatch.count.update,
});
type TMapState = ReturnType<typeof mapState>;
type TMapDispatch = ReturnType<typeof mapDispatch>;

export default connect(mapState, mapDispatch)(Visual);
