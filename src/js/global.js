import { onWindowResize } from "./restrict-resize";
import { navControls } from "./mobile-nav-controls";
import { telControls } from "./tel-controls";
import { scrollTo } from "./scrollTo";
import "./picturefill.min";
let nav = navControls();
let tel = telControls(".header-background", ".icon-phone");
let resize = onWindowResize(nav);
setTimeout(function () {
    console.log("wut", scrollTo().top);
}, 500);
