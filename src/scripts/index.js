import "regenerator-runtime";
import "../styles/style.css";
import "../styles/responsive.css";
import App from "./views/app";
import swRegister from "./utils/sw-register";
import WebSocketInitiator from "./utils/websocket-initiator";
import CONFIG from "./globals/config";
import FooterToolsInitiator from "./utils/footer-tools-initiator";

// eslint-disable-next-line no-unused-vars
const app = new App({
  button: document.getElementById("hamburgerButton"),
  content: document.getElementById("mainContent"),
  drawer: document.getElementById("navigationDrawer"),
});

window.addEventListener("hashchange", () => {
  app.renderPage();
});

window.addEventListener("load", async () => {
  app.renderPage();
  await swRegister();
  WebSocketInitiator.init(CONFIG.WEB_SOCKET_SERVER);

  FooterToolsInitiator.init({
    subscribeButton: document.getElementById("subscribePushNotification"),
    unsubscribeButton: document.getElementById("unsubscribePushNotification"),
  });
});
