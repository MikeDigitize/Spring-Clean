export function scrollTo(scrollAmount = 20) {

    let findPos = (el, elPos = 0) => {
        if (el.offsetParent) {
            do {
                elPos += el.offsetTop;
            } while (el = el.offsetParent);
        }
        return elPos;
    };

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
        let elementPos = findPos(document.querySelector(selector));
        let scrollPos = window.pageYOffset;
        scrollAmount = elementPos > scrollPos ? -Math.abs(scrollAmount) : +Math.abs(scrollAmount);
        scrollWindow(scrollPos, elementPos);
    };

}
