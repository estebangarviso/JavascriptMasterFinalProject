/**
 * Fade out effect with setTimeout and clearTimeout
 * @param {HTMLElement} element Target element to apply effect
 * @param {Number} duration It is the duration in milliseconds where 1000 equals 1 second
 * @param {Function} callback (optional) returns a function once the execution is finished
 */
export function fadeOut(
  element: HTMLElement,
  duration: number,
  callback: Function
) {
  element.style.opacity = '1'
  let last = +new Date().getTime()
  let id: NodeJS.Timeout

  let tick = function () {
    element.style.opacity = String(
      +element.style.opacity - (+new Date().getTime() - last) / duration
    )

    last = +new Date()
    if (+element.style.opacity <= 1) {
      id = setTimeout(tick, 16)
    }

    if (id && +element.style.opacity <= 0) {
      if (typeof callback === 'function') callback()
      clearTimeout(id)
    }
  }
  tick()
}
