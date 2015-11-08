import { debounce } from "./debounce";
import { navControls } from "./mobile-nav-controls";

let resizeControl = debounce();
let nav = navControls();
function onResize() {
    if(window.innerWidth > 768 && nav.isMenuActive()) {
        nav.toggleMenu();
    }
}
window.addEventListener("resize", resizeControl(onResize, 150));