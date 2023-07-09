import React, { useState } from "react";
import { connect } from "react-redux";
import { IDispatch, IRootState } from "../../store/store";
import SideMenu from "../sidemenu/SideMenu";
import Chart from "./Chart";

type IChartWrapper = TMapState & TMapDispatch;
const ChartWrapper = (props: IChartWrapper) => {
  const { dimensions } = props;
  const [showSideMenu, setSideMenu] = useState(false);
  const toggleSideMenu = () => {
    setSideMenu(!showSideMenu);
  };
  const wrapperStyle: React.CSSProperties = {
    height: dimensions.height,
    width: "100%",
  };
  const chartContainerStyle: React.CSSProperties = {
    width: showSideMenu ? "calc(100% - 220px)" : "100%",
  };
 
  return (
    <div className="chartWrapper" style={wrapperStyle}>
        <SideMenu showSideMenu={showSideMenu} toggleSideMenu={toggleSideMenu} />
      <main className="chartContainer" style={chartContainerStyle}>
        <Chart />
      </main>
    </div>
  );
};

const mapState = (state: IRootState) => ({
  dimensions: state.dimensions,
});
const mapDispatch = (dispatch: IDispatch) => ({});
type TMapState = ReturnType<typeof mapState>;
type TMapDispatch = ReturnType<typeof mapDispatch>;

export default connect(mapState, mapDispatch)(ChartWrapper);
