import React from "react";
import { connect } from "react-redux";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { barChartData } from "../../sample/data";
import { DataParser } from "../../service/DataParser";
import { PbiUtils } from "../../service/PbiUtils";
import { IDispatch, IRootState } from "../../store/store";

type IChart = TMapState & TMapDispatch;
const Chart = (props: IChart) => {
  const { chartData } = props;
  console.log("chartData", chartData);

  const valueMeasures = DataParser.valueMeasures;
  const showSampleData = false;
  const data = chartData;
  const handleSelection =
    (selectionId: powerbi.visuals.ISelectionIdBuilder) => () => {
      PbiUtils.selectionManager.select(selectionId);
    };
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="xAxis" />
        <YAxis />
        <Tooltip />
        <Legend />
        {valueMeasures.map((measure, measureIndex) => (
          <Bar
            onClick={handleSelection(data[measureIndex].selectionId)}
            label={measure.displayName}
            dataKey={measure.queryName}
            fill="#8884d8"
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

const mapState = (state: IRootState) => ({
  chartData: state.chartData,
});
const mapDispatch = (dispatch: IDispatch) => ({});
type TMapState = ReturnType<typeof mapState>;
type TMapDispatch = ReturnType<typeof mapDispatch>;

export default connect(mapState, mapDispatch)(Chart);
