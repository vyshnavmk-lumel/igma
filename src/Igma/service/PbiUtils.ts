import powerbiVisualsApi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbiVisualsApi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import ISelectionManager = powerbi.extensibility.ISelectionManager;
import IVisualHost = powerbiVisualsApi.extensibility.visual.IVisualHost;

export class PbiUtils {
  public static visualHost: IVisualHost;
  public static selectionManager: ISelectionManager;
  public static container: HTMLElement;
  public static isHighlightApplied: boolean;
  public static update(option: VisualConstructorOptions) {
    this.visualHost = option.host;
    this.container = option.element;
    this.selectionManager = this.visualHost.createSelectionManager();
  }
}
