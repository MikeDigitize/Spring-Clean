import Animator from "./animator.min";

export function telControls(con, trig) {

    let container = document.querySelector(con);
    let triggers = Array.from(document.querySelectorAll(trig));
    let numbers = container.querySelector(".header-telephone-numbers");
    let overlay = createOverlay();
    let animationSupport = Animator.isSupported();

    function addTriggerHandlers() {
        triggers.forEach(trigger => {
            trigger.addEventListener("click", addOverlay, false);
        });
    }

    function removeTriggerHandlers() {
        triggers.forEach(trigger => {
            trigger.removeEventListener("click", addOverlay, false);
        });
    }

    function createOverlay() {
        let div = document.createElement("div");
        div.classList.add("screen-overlay-absolute");
        return div;
    }

    function addOverlay(e) {
        e.preventDefault();
        numbers.classList.toggle("tel-controls-open");
        setTimeout(() => {
            removeTriggerHandlers();
            document.addEventListener("click", removeOverlay, false);
            container.insertBefore(overlay, container.firstChild);
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
                Animator.setStyles(overlay, { opacity : 1 });
            }

        }, 0);
    }

    function removeOverlay(e) {
        let target = e.target || e.srcElement;
        let parent = target.parentNode.parentNode;
        if(!parent.classList.contains("header-telephone-numbers")) {
            numbers.classList.toggle("tel-controls-open");
            document.removeEventListener("click", removeOverlay, false);
            addTriggerHandlers();
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
    }

    addTriggerHandlers();
}