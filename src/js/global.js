import { onWindowResize } from "./restrict-resize";
import { navControls } from "./mobile-nav-controls";
let nav = navControls();
let resize = onWindowResize(nav);