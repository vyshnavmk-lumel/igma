import powerbiVisualsApi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbiVisualsApi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import {IDimensions} from './store/models/dimensions';

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { clearDOMNode } from "./utils/common";
import { Provider, connect } from "react-redux";
import { IRootState, IDispatch, store } from "./store/store";
import { DataParser } from "./service/DataParser";

export class Igma {
  static container;
  private isRendered = false;
  constructor(option: VisualConstructorOptions) {
    Igma.container = option.element;
    this.render();
  }

  render() {
    clearDOMNode(Igma.container);
    this.isRendered = true;
    const root = ReactDOM.createRoot(Igma.container);
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

  private updateState(options: VisualUpdateOptions){
    this.updateDimension(options.viewport);
    if(options.dataViews && options.dataViews[0]?.metadata?.columns.length){
      const metaData = options.dataViews[0]?.metadata;
      const newMeta = metaData.columns.map(col=>{
        console.log(col.queryName);
        return col.queryName;
      })
      store.dispatch.count.update({metaData: newMeta});
    }
  }

  private updateDimension(viewport: powerbiVisualsApi.IViewport){
    const dimension: IDimensions = {height: viewport.height, width: viewport.width};
    store.dispatch.dimensions.update(dimension);
  }
}
