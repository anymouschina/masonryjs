export function getClientRects (el) {
  if(el.getClientRects().length>0){
    return el.getClientRects()[0]
  }
  else {
    return {
      width:parseFloat(el.style.width),
      height:parseFloat(el.style.height)
    }
  }
}
/**
 * 事件监听函数
 * @export
 * @param {object} target 监听对象
 * @param {string} eventType 事件名
 * @param {function} callback 事件监听函数
 */
export function addEvent (target, eventType, callback) {
  if (target.addEventListener) {
    target.addEventListener(eventType, callback, false);
    return {
      remove () {
        target.removeEventListener(eventType, callback, false);
      }
    };
  } else if (target.attachEvent) {
    target.attachEvent(`on${eventType}`, callback);
    return {
      remove () {
        target.detachEvent(`on${eventType}`, callback);
      }
    };
  }
  return null;
}
export function getPointDatasetElement (pathArr, attrStr) {
  for (let elem of pathArr) {
    if (elem instanceof HTMLElement && elem?.getAttribute(attrStr)) {
      return {
        dom:elem,
        value:elem.getAttribute(attrStr)
      }
    }
  }
  return {
    value:-1,
    dom:null
  };
}
export function getMousePosition(event) {
  var x =0, y = 0,
      doc = document.documentElement,
      body = document.body;
  if(!event) event=window.event;
  if (window.pageYoffset) {//pageYoffset是Netscape特有
      x = window.pageXOffset;
      y = window.pageYOffset;
  }else{
      x = (doc && doc.scrollLeft || body && body.scrollLeft || 0)
        - (doc && doc.clientLeft || body && body.clientLeft || 0);
      y = (doc && doc.scrollTop  || body && body.scrollTop  || 0)
        - (doc && doc.clientTop  || body && body.clientTop  || 0);
  }
  x += event.clientX;
  y += event.clientY;
  return {'x' : x, 'y' : y};
}