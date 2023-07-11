import { IColorTheme, ultraViolet } from "../constants/colorTheme";
import { EThemes } from "../store/models/colorPallet";

export class ColorPalletService {
  private static theme: EThemes;
  private static colorPallet: IColorTheme;

  public static updateTheme(activeTheme: EThemes) {
    this.theme = activeTheme;
    this.colorPallet = this.generateColorPallet();
  }

  private static generateColorPallet(): IColorTheme {
    switch (this.theme) {
      case EThemes.UltraViolet:
        return ultraViolet;
    }
  }

  public static getColorPallet() {
    return this.colorPallet;
  }
}
