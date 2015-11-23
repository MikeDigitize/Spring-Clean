import Animator from "./animator.min";

export default class MessageUs {
    constructor() {
        this.form = document.querySelector("#message-us-form");
        let inputs = Array.from(this.form.querySelectorAll("input, textarea"));
        this.helper = document.querySelector(".form-helper");
        this.helperText = this.helper.querySelector(".form-helper-msg");
        this.requiredInputs = inputs.filter(input => input.hasAttribute("required"));
        this.nonRequiredInputs = inputs.filter(input => !input.hasAttribute("required"));
        this.form.addEventListener("submit", this.onSubmit.bind(this));
        this.overlay = MessageUs.createOverlay();
        this.animationSupport = Animator.isSupported();
        this.hideOverlayHandler = this.hideOverlay.bind(this);
        this.isHTML5supported = typeof document.createElement("input").placeholder !== "undefined";
        if(!this.isHTML5supported) {
            this.startPlaceholderReplacemment();
        }
        this.isHelperDisplayed = false;
    }

    static createOverlay() {
        let div = document.createElement("div");
        div.classList.add("screen-overlay-absolute");
        return div;
    }

    startPlaceholderReplacemment() {
        this.requiredInputs.forEach(input => input.addEventListener("keyup", this.replacePlaceholder.bind(this)));
        this.nonRequiredInputs.forEach(input => input.addEventListener("keyup", this.replacePlaceholder.bind(this)));
        this.requiredInputs.forEach(input => input.addEventListener("blur", this.replacePlaceholder.bind(this)));
        this.nonRequiredInputs.forEach(input => input.addEventListener("blur", this.replacePlaceholder.bind(this)));
    }

    replacePlaceholder(evt) {
        let target = evt.target || evt.srcElement;
        console.log(evt, target);
    }

    getInputPosition(input) {
        let inputPos = input.getBoundingClientRect();
        let parentPosy = this.form.parentNode.getBoundingClientRect();
        let helperPos = this.helper.getBoundingClientRect();
        return {
            top : (inputPos.top - parentPosy.top) - (helperPos.height + 10),
            left : (inputPos.left - parentPosy.left) - 25
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
                        },
                        after : {
                            top : 0,
                            left : 0
                        }
                    }
                })
            ]);
            animate.then(() => {
                this.removeOverlay();
            });
        }
        else {
            this.removeOverlay();
            Animator.setStyles(this.helper, { opacity : 0, top : 0, left : 0 });
        }
    }

    showHelper(input) {
        let position = this.getInputPosition(input);
        Animator.setStyles(this.helper, {
            top : position.top + "px",
            left : position.left + "px"
        });
        this.isHelperDisplayed = true;
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
        this.isHelperDisplayed = false;
    }

    addBodyListener() {
        document.body.addEventListener("click", this.hideOverlayHandler, false);
    }

    removeBodyListener() {
        document.body.removeEventListener("click", this.hideOverlayHandler, false);
    }

    checkRequired() {
        let invalid = this.requiredInputs.filter(input => {
            let value = input.value;
            let rules = MessageUs.validation[input.id];
            let func = MessageUs.validation[input.id].func ? MessageUs.validation[input.id].func : () => false;
            return !func() && !rules.regex.test(value);
        });
        if(invalid.length) {
            this.showValidationMsg(invalid);
        }
        else {
            this.checkNonRequired();
        }
    }

    checkNonRequired() {
        let invalid = this.nonRequiredInputs.filter(input => {
            let value = input.value;
            let rules = MessageUs.validation[input.id];
            return value.length && !rules.regex.test(value);
        });
        if(invalid.length) {
            this.showValidationMsg(invalid);
        }
        else {
            this.onValid();
            this.showOverlay();
            this.showHelper(document.querySelector("#contact-form-submit"));
            this.requiredInputs.forEach(input => console.log(input.id, input.value));
            this.nonRequiredInputs.forEach(input => console.log(input.id, input.value));
        }
    }

    onValid() {
        this.setHelperText("Great thanks, we'll get back in touch with you as soon as we can in the next 24 hours!");
    }

    showValidationMsg(invalid) {
        let msg = MessageUs.validation[invalid[0].id].msg;
        this.showOverlay();
        this.setHelperText(msg);
        this.showHelper(invalid[0]);
    }

    setHelperText(msg) {
        let key = this.helperText.innerText ? "innerText" : "textContent";
        this.helperText[key] = msg;
    }

    onSubmit(e) {
        e.preventDefault();
        this.checkRequired();
    }
}

MessageUs.validation = {};
MessageUs.validation["contact-form-name"] = {
    regex : /[a-zA-Z\s+]{2,30}/,
    msg : "We'd like to know your name so we know who to address when we reply!"
};
MessageUs.validation["contact-form-location"] = {
    regex : /[a-zA-Z\s+]{2,30}/,
    msg : "You don't have to tell us your location, but if you do, make sure it's a real place!",
};
MessageUs.validation["contact-form-email"] = {
    regex : /[^ @]*@[^ @]*/,
    msg : "We'd like either an email address or telephone number so we can contact you back!",
    func() {
        return MessageUs.validation["contact-form-phone"].regex.test(document.querySelector("#contact-form-phone").value);
    }
};
MessageUs.validation["contact-form-phone"] = {
    regex : /[0-9]{10,20}/,
    msg : "You don't have to tell us your phone number, but if you do, make sure it's a real one!",
    func() {
        return MessageUs.validation["contact-form-email"].regex.test(document.querySelector("#contact-form-email").value);
    }
};
MessageUs.validation["contact-form-msg"] = {
    regex : /[a-zA-Z0-9\s+]{10,500}/,
    msg : "Leave us a little message here telling us how you think we can help!"
};