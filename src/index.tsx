import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { LightTheme } from "./css/theme";
import MyRouter from "./routes/Router";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <RecoilRoot>
    <ThemeProvider theme={LightTheme}>
      <RouterProvider router={MyRouter} />
    </ThemeProvider>
  </RecoilRoot>
  // </React.StrictMode>
);
