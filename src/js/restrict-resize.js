import { debounce } from "./debounce";

export function onWindowResize(nav) {

    let resizeControl = debounce();
    let windowWidth = window.innerWidth;

    function onResize() {
        if(window.innerWidth > 990 && nav.isMenuActive()) {
            nav.toggleMenu();
        }
        windowWidth = window.innerWidth;
    }

    window.addEventListener("resize", resizeControl(onResize, 50));

    return function () {
        return { windowWidth };
    }

}