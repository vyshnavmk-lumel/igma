import powerbiVisualsApi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbiVisualsApi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import ISelectionManager = powerbi.extensibility.ISelectionManager;
import IVisualHost = powerbiVisualsApi.extensibility.visual.IVisualHost;

import { IDimensions } from "./store/models/dimensions";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { clearDOMNode } from "./utils/common";
import { Provider, connect } from "react-redux";
import { IRootState, IDispatch, store } from "./store/store";
import { DataParser } from "./service/DataParser";
import { PbiUtils } from "./service/PbiUtils";

export class Igma {
  private container: HTMLElement;
  private isRendered = false;

  constructor(option: VisualConstructorOptions) {
    this.container = option.element;
    PbiUtils.update(option);
    this.render();
  }

  render() {
    clearDOMNode(this.container);
    this.isRendered = true;
    const root = ReactDOM.createRoot(this.container);
    root.render(
      <Provider store={store}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Provider>
    );
  }

  update(options: VisualUpdateOptions) {
    if (!this.isRendered) {
      this.render();
    }
    DataParser.update(options);
    this.updateState(options);
  }

  private updateState(options: VisualUpdateOptions) {
    console.log("options", options);

    this.updateDimension(options.viewport);
    if (options.dataViews && options.dataViews[0]?.metadata?.columns.length) {
      const metaData = options.dataViews[0]?.metadata;
      const newMeta = metaData.columns.map((col) => {
        return col.queryName;
      });
      store.dispatch.count.update({ metaData: newMeta });
      store.dispatch.chartData.update(DataParser.getChartData());
    }
  }

  private updateDimension(viewport: powerbiVisualsApi.IViewport) {
    const dimension: IDimensions = {
      height: viewport.height,
      width: viewport.width,
    };
    store.dispatch.dimensions.update(dimension);
  }
}
