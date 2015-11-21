import { onWindowResizeNav } from "./window-resize-nav";
import { onWindowResizeContact } from "./window-resize-contact";
import { navControls } from "./mobile-nav-controls";
import { telControls } from "./tel-controls";
import { scrollTo } from "./scrollTo";
import MessageUs from "./contact-form";
import "./picturefill.min";

let nav = navControls();
let tel = telControls(".header-background", ".icon-phone");
let form = new MessageUs();
let scroll = scrollTo();
document.querySelector(".back-to-the-top").addEventListener("click", scroll.bind(null, ".about-us"), false);
onWindowResizeNav(nav);
onWindowResizeContact(form);
