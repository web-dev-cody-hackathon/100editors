/*
 * Debounce a function call. When a function is debounced, it will only be called after a certain amount of time has passed since the last time * * it was called. Repeat calls to the function reset the timer.
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The number of milliseconds to wait.
 * @return {Function} The debounced function.
 */

export default function createDebouce(
  func: (...args: any) => void,
  wait: number
) {
  // func();

  let timeout: any;

  return (...args: any) => {
    // console.log("debounce function", func, wait);
    // func(...args);
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}
