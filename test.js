// console.log((typeof window == "undefined" ? false : window.requestAnimationFrame));


var requestAnimationFrame = (typeof window === 'undefined' ? false : window.requestAnimationFrame) || function (cb) {
  return setTimeout(console.log(1), 16.6);
};

console.log(requestAnimationFrame());
