const e = sel => document.querySelector(sel)

const es = sel => document.querySelectorAll(sel)

const bindEvent = (ele, event, func, isCapture = false) => {
    ele.addEventListener(event, func, isCapture)
}

const log = console.log.bind(console)
const dir = console.dir.bind(console)

const appendHtml = (ele, html) => {
    ele.insertAdjacentHTML('beforeend', html)
}

const removeClass = function(element, className) {
    element.classList.remove(className)
}
const addClass = function(element, className) {
    element.classList.add(className)
}
