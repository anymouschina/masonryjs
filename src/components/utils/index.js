export function mergeMapObj (Map, key, value) {
  const result = Map.get(key);
  if (!result) Map.set(key, value);
  else if (Object.prototype.toString.call(result === '[object Object]')) {
    Map.set(key, { ...result, ...value })
  }
}
export function throttle(fn,time = 100){
  let flag = true;
  return function(){
    const args = arguments;
    if(!flag){
      return;
    }
    flag = false;
    setTimeout(()=>{
      debugger
      flag = true;
      fn.call(null,args)
    },time)
  }
}