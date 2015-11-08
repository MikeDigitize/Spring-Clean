export function navControls() {

    let nav = document.querySelector(".nav-menu");
    let menuBtn = document.querySelector(".mobile-menu-button");
    let isMenuActive = () => nav.classList.contains("show-menu");

    let toggleMenu = () => {
        setTimeout(() => {
            if(isMenuActive()) {
                removeBodyListener();
                addMobileMenuListener();
            }
            else {
                addBodyListener();
                removeMobileMenuListener()
            }
            nav.classList.toggle("show-menu");
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

    addMobileMenuListener();

    return {
        isMenuActive,
        toggleMenu
    };

}
