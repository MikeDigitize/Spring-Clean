import { onWindowResize } from "./restrict-resize";
import { navControls } from "./mobile-nav-controls";
import { telControls } from "./tel-controls";
let nav = navControls();
let tel = telControls(".header-background", ".icon-phone");
let resize = onWindowResize(nav);