import { debounce } from "./debounce";

export function onWindowResizeNav(nav) {

    let resizeControl = debounce();
    let windowWidth = window.innerWidth;

    function onResize() {
        if(window.innerWidth > 990) {
            if(nav.isMenuActive()) {
                nav.toggle();
                nav.onMenuInactive();
            }
            nav.nav.removeAttribute("style");
        }
        windowWidth = window.innerWidth;
    }

    window.addEventListener("resize", resizeControl(onResize, 50));//9yb3n

}