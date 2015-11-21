export function scrollTo(scrollAmount = 20) {

    let findPos = (el, elPos = 0) => {
        if (el.offsetParent) {
            do {
                elPos += el.offsetTop;
            } while (el = el.offsetParent);
        }
        return elPos;
    };

    let scrollUp = (start, stop) => {
        let scroll = () => {
            let y = start - scrollAmount;
            start -=scrollAmount;
            window.scrollTo(0, y);
        };
        let timer = setInterval(() => {
            if(scrollAmount > 0 && start <= stop || scrollAmount < 0 && start >= stop) {
                clearInterval(timer);
            }
            else {
                scroll();
            }
        }, 5);
    };

    return selector => {
        let elementPos = findPos(document.querySelector(selector));
        let scrollPos = window.pageYOffset;
        scrollAmount = elementPos > scrollPos ? -Math.abs(scrollAmount) : +Math.abs(scrollAmount);
        scrollUp(scrollPos, elementPos);
    };
}
