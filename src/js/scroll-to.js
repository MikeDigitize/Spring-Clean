import { getElementPosition } from "./element-position";

export function scrollTo(scrollAmount = 20) {

    let scrollWindow = (yPos, yStop) => {
        let scroll = () => {
            yPos -=scrollAmount;
            window.scrollTo(0, yPos);
        };
        let timer = setInterval(() => {
            if(scrollAmount > 0 && yPos <= yStop || scrollAmount < 0 && yPos >= yStop) {
                clearInterval(timer);
            }
            else {
                scroll();
            }
        }, 5);
    };

    return (selector) => {
        let el = selector === typeof "string" ? document.querySelector(selector) : selector;
        let elementPos = getElementPosition(el);
        let scrollPos = window.pageYOffset;
        scrollAmount = elementPos > scrollPos ? -Math.abs(scrollAmount) : +Math.abs(scrollAmount);
        scrollWindow(scrollPos, elementPos);
    };

}
