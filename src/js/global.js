import { onWindowResizeNav } from "./window-resize-nav";
import { onWindowResizeContact } from "./window-resize-contact";
import { navControls } from "./mobile-nav-controls";
import { telControls } from "./tel-controls";
import MessageUs from "./contact-form";
import "./picturefill.min";
import "./classList.min";
import "./ga";

let nav = navControls();
let tel = telControls(".header-background", ".icon-phone");
let form = new MessageUs();
onWindowResizeNav(nav);
onWindowResizeContact(form);