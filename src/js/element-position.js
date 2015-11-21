export function getElementPosition(el, elPos = 0) {
    if (el.offsetParent) {
        do {
            elPos += el.offsetTop;
        } while (el = el.offsetParent);
    }
    return elPos;
}