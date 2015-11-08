import Animator from "./animator.min";
import "./classList.min";

export function navControls() {

    let nav = document.querySelector(".nav-menu");
    let menuBtn = document.querySelector(".mobile-menu-button");
    let isMenuActive = () => nav.classList.contains("show-menu");
    let animationSupport = Animator.isSupported();

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
    }

    function onMenuActive() {
        addBodyListener();
        removeMobileMenuListener();
    }

    function animateIn() {
        if(animationSupport) {
            let animation = Animator.transition({
                element : nav,
                properties : "right",
                setStyles : {
                    before : {
                        right : "-7%"
                    }
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

    function animateOut(){

        if(animationSupport) {
            let animation = Animator.transition({
                element : nav,
                properties : "right",
                setStyles : {
                    before : {
                        right : "-75%"
                    }
                }
            });

            animation.then(()=> {
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

    addMobileMenuListener();

    return {
        nav,
        isMenuActive,
        onMenuInactive,
        toggle
    };

}
