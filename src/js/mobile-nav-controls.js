import Animator from "./animator.min";
import { scrollTo } from "./scrollTo";

export function navControls() {

    let nav = document.querySelector(".nav-menu");
    let menuBtn = document.querySelector(".mobile-menu-button");
    let scroll = scrollTo();
    document.querySelector(".back-to-the-top").addEventListener("click", scroll.bind(null, ".header-background"), false);
    let isMenuActive = () => nav.classList.contains("show-menu");
    let animationSupport = Animator.isSupported();
    let overlay = createOverlay();

    let toggleMenu = () => {
        setTimeout(() => {
            if(isMenuActive()) {
                onMenuInactive();
                animateOut();
            }
            else {
                onMenuActive();
                animateIn();
            }
        }, 0);
    };

    function addMobileMenuListener() {
        menuBtn.addEventListener("click", toggleMenu, false);
    }

    function removeMobileMenuListener() {
        menuBtn.removeEventListener("click", toggleMenu, false);
    }

    function removeBodyListener() {
        document.removeEventListener("click", toggleMenu, false);
    }

    function addBodyListener() {
        document.addEventListener("click", toggleMenu, false);
    }

    function onMenuInactive() {
        removeBodyListener();
        addMobileMenuListener();
        removeOverlay();
    }

    function onMenuActive() {
        addBodyListener();
        removeMobileMenuListener();
        addOverlay();
    }

    function animateIn() {
        if(animationSupport) {
            let prefix = Animator.getPrefix("transform");
            let styles = {};
            Animator.setStyles(nav, { right: "0" });
            styles[prefix] = "translate3d(29%, 0, 0)";
            let animation = Animator.transition({
                element : nav,
                properties : "right",
                setStyles : {
                    before : styles
                }
            });
            animation.then(()=> {
                toggle();
            });
        }
        else {
            Animator.setStyles(nav, { right : "-7%"});
            toggle();
        }

    }

    function animateOut() {
        if(animationSupport) {
            let prefix = Animator.getPrefix("transform");
            let styles = {};
            styles[prefix] = "translate3d(100%, 0, 0)";
            let animation = Animator.transition({
                element : nav,
                properties : "right",
                setStyles : {
                    before : styles
                }
            });

            animation.then(()=> {
                Animator.setStyles(nav, { right: "-75%" });
                toggle();
            });
        }
        else {
            Animator.setStyles(nav, { right : "-75%" });
            toggle();
        }

    }

    function toggle(){
        nav.classList.toggle("show-menu");
    }

    function createOverlay() {
        let div = document.createElement("div");
        div.classList.add("screen-overlay-fixed");
        return div;
    }

    function addOverlay() {
        nav.parentNode.classList.toggle("mobile-nav-open");
        document.body.insertBefore(overlay, document.body.firstChild);
        if(animationSupport) {
            Animator.transition({
                element : overlay,
                properties : "opacity",
                setStyles : {
                    before : {
                        opacity : 1
                    }
                }
            });
        }
        else {
            Animator.setStyles(overlay, { opacity : 1} );
        }
    }

    function removeOverlay() {
        nav.parentNode.classList.toggle("mobile-nav-open");
        if(animationSupport) {
            let add = Animator.transition({
                element : overlay,
                properties : "opacity",
                setStyles : {
                    before : {
                        opacity : 0
                    }
                }
            });
            add.then(() => {
                overlay.parentNode.removeChild(overlay);
            });
        }
        else {
            overlay.parentNode.removeChild(overlay);
        }
    }

    addMobileMenuListener();

    return {
        nav,
        isMenuActive,
        onMenuInactive,
        toggle
    };

}
