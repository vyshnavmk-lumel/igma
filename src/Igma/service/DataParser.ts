import powerbiVisualsApi from "powerbi-visuals-api";
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import ISelectionManager = powerbi.extensibility.ISelectionManager;
import { IChartData } from "../store/models/chartData";
import { PbiUtils } from "./PbiUtils";

export class DataParser {
  public static valueMeasures: powerbiVisualsApi.DataViewMetadataColumn[];
  private static dimensions: powerbiVisualsApi.DataViewMetadataColumn[];
  private static chartData: IChartData[];
  private static rows: powerbiVisualsApi.DataViewMatrixNode[];
  private static levels: powerbiVisualsApi.DataViewHierarchyLevel[];

  public static update(options: VisualUpdateOptions) {
    this.valueMeasures = [];
    this.dimensions = [];
    this.chartData = [];
    // this.axisValues = [];
    // this.valueSource = [];
    // this.xAxisObj = {};

    const dataViews = options.dataViews;
    if (dataViews && dataViews[0]) {
      if (dataViews[0].matrix?.rows?.root?.children) {
        this.rows = dataViews[0].matrix.rows.root.children;
        this.levels = dataViews[0].matrix.rows.levels;
      }

      if (dataViews[0].metadata?.columns?.length) {
        const columns = options.dataViews[0].metadata.columns;
        columns.forEach((column) => {
          if (column.roles["value"]) {
            this.valueMeasures.push(column);
          } else if (column.roles["category"]) {
            this.dimensions.push(column);
          }
        });
      }
      this.generateChartData();
    }
  }

  private static generateChartData() {
    this.rows.forEach((row) => {
      const selectionId = this.createSelection(row);
      const xAxis = String(row.value);
      const yValues = row.values;
      const data: IChartData = { xAxis, selectionId };
      this.valueMeasures.forEach((measure, measureIndex) => {
        const yValue = yValues[measureIndex]?.value as number;
        data[measure.queryName] = yValue;
      });
      this.chartData.push(data);
    });
  }

  public static getChartData() {
    return this.chartData ?? [];
  }

  private static createSelection(node: powerbi.DataViewMatrixNode) {
    return PbiUtils.visualHost
      .createSelectionIdBuilder()
      .withMatrixNode(node, this.levels);
  }
}
