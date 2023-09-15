import "regenerator-runtime";
import "../styles/style.css";
import "../styles/responsive.css";
import App from "./views/app";
import swRegister from "./utils/sw-register";

// eslint-disable-next-line no-unused-vars
const app = new App({
  button: document.getElementById("hamburgerButton"),
  content: document.getElementById("mainContent"),
  drawer: document.getElementById("navigationDrawer"),
});

window.addEventListener("hashchange", () => {
  app.renderPage();
});

window.addEventListener("load", () => {
  app.renderPage();
  swRegister();
});
