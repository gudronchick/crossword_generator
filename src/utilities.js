export const setFieldSize = (field) => {
  field.width = window.innerWidth;
  field.height = window.innerHeight;
};

export const getRandomNum = (max) => {
  max = Math.floor(max);
  return Math.floor(Math.random() * max);
};

export function throttle(func, ms) {
  let isThrottled = false;
  let savedArgs;
  let savedThis;

  function wrapper() {
    if (isThrottled) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments);

    isThrottled = true;

    setTimeout(function () {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}
