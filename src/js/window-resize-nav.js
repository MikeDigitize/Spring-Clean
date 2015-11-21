import { debounce } from "./debounce";

export function onWindowResizeNav(nav) {

    let findPos = (el, elPos = 0) => {
        if (el.offsetParent) {
            do {
                elPos += el.offsetTop;
            } while (el = el.offsetParent);
        }
        return elPos;
    };

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

    function onScroll() {
        if(windowWidth < 991 && !nav.isMenuActive()) {
            checkStickyNav();
        }
    }

    function checkStickyNav() {
        if(window.pageYOffset > navPos) {
            mobNav.classList.add("sticky-nav");
        }
        else {
            mobNav.classList.remove("sticky-nav");
        }
    }

    let limiter = debounce();
    let windowWidth = window.innerWidth;
    let mobNav = document.querySelector(".mobile-menu-button");
    let navPos = findPos(mobNav);
    onScroll();

    window.addEventListener("resize", limiter(onResize, 50));
    window.addEventListener("scroll", limiter(onScroll, 50));

}