import { debounce } from "./debounce";

export function onWindowResizeContact(form) {

    let resizeControl = debounce();
    let windowWidth = window.innerWidth;

    function onResize() {
        if(Math.abs(window.innerWidth - windowWidth)) {
            if(form.isHelperDisplayed) {
                form.hideOverlay();
            }
        }
        windowWidth = window.innerWidth;
    }

    window.addEventListener("resize", resizeControl(onResize, 250));

}