import Animator from "./animator.min";

export default class MessageUs {
    constructor(form, required) {
        this.form = document.querySelector(form);
        this.inputs = Array.from(this.form.querySelectorAll("input, textarea"));
        this.helper = document.querySelector(".form-helper");
        this.requiredInputs = required;
        this.form.addEventListener("submit", this.onSubmit.bind(this));
        this.overlay = MessageUs.createOverlay();
        Animator.setStyles(this.overlay, { top: 0, left : 0 });
        this.animationSupport = Animator.isSupported();
        this.hideOverlayHandler = this.hideOverlay.bind(this);
    }

    static createOverlay() {
        let div = document.createElement("div");
        div.classList.add("screen-overlay-absolute");
        return div;
    }

    getInputPosition(input) {
        let inputPos = input.getBoundingClientRect();
        let parentPosy = this.form.parentNode.getBoundingClientRect();
        let helperPos = this.helper.getBoundingClientRect();
        console.log("input", inputPos.top, inputPos.left);
        console.log("parent", parentPosy.top, parentPosy.left);
        console.log("helper", helperPos.height);
        return {
            top : (inputPos.top - parentPosy.top) - (helperPos.height + 10),
            left : (inputPos.left - parentPosy.left)
        };
    }

    showOverlay() {
        this.form.parentNode.insertBefore(this.overlay, this.form.parentNode.firstChild);
        if(this.animationSupport) {
            let animate = Animator.transition({
                element : this.overlay,
                properties : "opacity",
                setStyles : {
                    before : {
                        opacity : 1
                    }
                }
            });
            animate.then(() => {
                this.addBodyListener();
            })
        }
        else {
            Animator.setStyles(this.overlay, { opacity : 1 });
            this.addBodyListener();
        }
    }

    hideOverlay() {
        this.removeBodyListener();
        if(this.animationSupport) {
            let animate = Animator.combo([
                Animator.transition({
                    element : this.overlay,
                    properties : "opacity",
                    setStyles : {
                        before : {
                            opacity : 0
                        }
                    }
                }),
                Animator.transition({
                    element : this.helper,
                    properties : "opacity",
                    setStyles : {
                        before : {
                            opacity : 0
                        }
                    }
                })
            ]);
            animate.then(() => {
                console.log("hello!!");
                this.removeOverlay();
            });
        }
        else {
            this.removeOverlay();
            Animator.setStyles(this.helper, { opacity : 0 });
        }
    }

    showHelper(input) {
        let position = this.getInputPosition(input);
        Animator.setStyles(this.helper, {
            top : position.top + "px",
            left : position.left + "px"
        });
        if(this.animationSupport) {
            Animator.transition({
                element : this.helper,
                properties : "opacity",
                setStyles : {
                    before : {
                        opacity : 1
                    }
                }
            });
        }
        else {
            Animator.setStyles(this.helper, { opacity : 1 });
        }
    }

    removeOverlay() {
        this.overlay.parentNode.removeChild(this.overlay);
    }

    addBodyListener() {
        document.body.addEventListener("click", this.hideOverlayHandler, false);
    }

    removeBodyListener() {
        document.body.removeEventListener("click", this.hideOverlayHandler, false);
    }

    onSubmit(e) {
        e.preventDefault();
        this.showOverlay();
        this.showHelper(this.inputs[4]);
    }
}