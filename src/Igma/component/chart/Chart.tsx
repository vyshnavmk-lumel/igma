import React from "react";
import { connect } from "react-redux";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { barChartData } from "../../sample/data";
import { IDispatch, IRootState } from "../../store/store";

type IChart = TMapState & TMapDispatch;
const Chart = (props: IChart) => {
  const { dimensions } = props;
  const data = barChartData;
  console.log("data", data);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const mapState = (state: IRootState) => ({
  dimensions: state.dimensions,
});
const mapDispatch = (dispatch: IDispatch) => ({});
type TMapState = ReturnType<typeof mapState>;
type TMapDispatch = ReturnType<typeof mapDispatch>;

export default connect(mapState, mapDispatch)(Chart);
