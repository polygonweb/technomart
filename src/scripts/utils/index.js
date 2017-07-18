export const getScrollBarValue = (function(){
  let elem = document.createElement('div');
  elem.style.cssText = `
    width: 99px !important;
    height: 99px !important;
    border: 0 !important;
    padding: 0 !important;
    overflow: scroll !important;
  `;

  document.body.appendChild(elem);
  let scrollValue = elem.offsetWidth - elem.clientWidth;
  document.body.removeChild(elem);

  return function() { return scrollValue; }
})()



export function isOverflow(elem) {
  return elem.scrollHeight > elem.offsetHeight;
}
