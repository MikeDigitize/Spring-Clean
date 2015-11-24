import Animator from "./animator.min";
import { scrollTo } from "./scroll-to";

export function telControls(con, trig) {

    let container = document.querySelector(con);
    let triggers = Array.from(document.querySelectorAll(trig));
    let numbers = container.querySelector(".header-telephone-numbers");
    let helper = container.querySelector(".phone-helper");
    let overlay = createOverlay();
    let scroll = scrollTo();
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

    function onTelControlsActive() {
        numbers.classList.toggle("tel-controls-open");
        removeTriggerHandlers();
        document.addEventListener("click", removeOverlay, false);
        scroll(".header-background");
    }

    function onTelControlsInactive() {
        numbers.classList.toggle("tel-controls-open");
        document.removeEventListener("click", removeOverlay, false);
        addTriggerHandlers();
    }

    function addOverlay(e) {
        e.preventDefault();
        setTimeout(() => {
            onTelControlsActive();
            container.insertBefore(overlay, container.firstChild);
            if(animationSupport) {
                Animator.combo([
                    Animator.transition({
                        element : overlay,
                        properties : "opacity",
                        setStyles : {
                            before : {
                                opacity : 1
                            }
                        }
                    }),
                    Animator.transition({
                        element : helper,
                        properties : "opacity",
                        setStyles : {
                            before : {
                                opacity : 1
                            }
                        }
                    })
                ]);
            }
            else {
                Animator.setStyles(overlay, { opacity : 1 });
                Animator.setStyles(helper, { opacity : 1 });
            }

        }, 0);
    }

    function removeOverlay(e) {

        let target = e.target || e.srcElement;
        let parent = target.parentNode.parentNode;
        if(!parent.classList.contains("header-telephone-numbers")) {
            e.preventDefault();
            onTelControlsInactive();
            if(animationSupport) {
                let add = Animator.combo([
                    Animator.transition({
                        element : overlay,
                        properties : "opacity",
                        setStyles : {
                            before : {
                                opacity : 0
                            }
                        }
                    }), Animator.transition({
                        element : helper,
                        properties : "opacity",
                        setStyles : {
                            before : {
                                opacity : 0
                            }
                        }
                    })
                ]);
                add.then(() => {
                    overlay.parentNode.removeChild(overlay);
                });
            }
            else {
                overlay.parentNode.removeChild(overlay);
                Animator.setStyles(helper, { opacity : 0 });
            }
        }

    }

    addTriggerHandlers();
}