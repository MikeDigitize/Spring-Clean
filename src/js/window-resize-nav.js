import { debounce } from "./debounce";
import { getElementPosition } from "./element-position";

export function onWindowResizeNav(nav) {

    function onResize() {
        if(window.innerWidth > 990) {
            if(nav.isMenuActive()) {
                nav.toggle();
                nav.onMenuInactive();
            }
            nav.nav.removeAttribute("style");
            mobNav.classList.remove("sticky-nav");
        }
        else {
            checkStickyNav();
        }
    }

    function onScroll() {
        if(window.innerWidth < 991) {
            checkStickyNav();
        }
    }

    function checkStickyNav() {
        if(!navPos) {
            navPos = getElementPosition(mobNav);
        }

        if(window.pageYOffset > navPos) {
            mobNav.classList.add("sticky-nav");
        }
        else {
            mobNav.classList.remove("sticky-nav");
        }
    }

    let limiter = debounce();
    let mobNav = document.querySelector(".mobile-menu-button");
    let navPos;
    onScroll();

    window.addEventListener("resize", limiter(onResize, 50));
    window.addEventListener("scroll", limiter(onScroll, 0));

}