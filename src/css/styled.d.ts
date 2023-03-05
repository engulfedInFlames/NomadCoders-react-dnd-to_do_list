import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    textColor: string;
    focusedColor: string;
    itemBgColor: string;
    btnColor: string;
    btnClickedColor: string;
  }
}
