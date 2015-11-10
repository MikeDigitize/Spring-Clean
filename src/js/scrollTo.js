export function scrollTo() {
    let top  = document.documentElement.scrollTop || window.pageYOffset,
        left = document.documentElement.scrollLeft || window.pageXOffset;
    return {
        top,
        left
    }
}
