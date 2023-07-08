import powerbiVisualsApi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbiVisualsApi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { clearDOMNode } from "./utils/common";
import { Provider, connect } from "react-redux";
import { IRootState, IDispatch, store } from "./store/store";

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
    this.updateState(options);
  }

  private updateState(options: VisualUpdateOptions){
    if(options.dataViews && options.dataViews[0]?.metadata?.columns.length){
      const metaData = options.dataViews[0]?.metadata;
      const newMeta = metaData.columns.map(col=>{
        console.log(col.queryName);
        return col.queryName;
      })
      store.dispatch.count.update({metaData: newMeta});
      
    }
  }
}
