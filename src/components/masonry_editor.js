import { getClientRects, addEvent, getPointDatasetElement } from './utils/dom';
const childrenElm = new Map();
const childrenScaleElm = new Map();//放缩element集合
const positionMap = new Map();//页面分割，如6列12块；
const ElmPositionMap = new Map();//存储节点占据的位置和高
const yMap = new Map();
const xMap = new Map();
let curElementIndex = null,//整型
  isScale = false,
  mousePosition = {};//被点击元素的相对位置
//将容器横向分割
const Masonry = {
  el: null,
  client: {},
  orderArr: [],//根据Yaisx 大小排序
  clone: null,
  minWidth: 100,
  minHeight: 90,
  events:[],//事件
  config: {
    multiColumn: 12,
    columnGap: 10,
    draggable: false,
    classList: []
  },
  yGap: 50,//竖向间隔50px 即50 为一个点，高度变化最小颗粒度50px
  left: 0,
  right: 0,
  create (el, params) {//入口
    if (!el instanceof HTMLElement) throw ('el 必须为HTMLElement')
    if(this.events.length>0){
      this.events.map(e=>e.remove);
      this.events.splice(0)
    }
    this.el = el;
    this.el.style.position = 'relactive';
    this.client = getClientRects(this.el);
    this.left = this.client.width * 0.25 + 'px';
    this.right = this.client.width * 0.75 + 'px';
    el.childNodes.forEach((item, index) => {
      childrenElm.set(index, item);
    })
    if (params.draggable) {
      this.events.push(...[addEvent(this.el, 'mousemove', (e) => {
       
        if(isScale){
          const item = childrenElm.get(curElementIndex), x = e.clientX + el.scrollLeft, y = e.clientY + el.scrollTop;
          console.info(x , mousePosition.x,item)
          const width =x - mousePosition.x,height = y - mousePosition.y
          if(width < 2*this.minWidth || height < this.minHeight)return 
          item?.style && (item.style.width = `${width}px`,item.style.height  = `${height}px`);
          if (Math.abs(x - mousePosition.beforeX) >= this.minWidth / 2 || Math.abs(y - mousePosition.beforeY) >= this.yGap / 2) {
            mousePosition.beforeX = x;
            mousePosition.beforeY = y;
            // const obj = this.parseStyle(item,false)
            this.drop(item, {
              x: mousePosition.x,
              y: mousePosition.y
            }, curElementIndex,false);
            this.Mounting();
            this.draw()
          }
        }else  if (curElementIndex > -1) {
          const item = childrenElm.get(curElementIndex), x = e.clientX + el.scrollLeft, y = e.clientY + el.scrollTop;
          item?.style && (item.style.transform = `translate(${x - mousePosition.x}px,${y - mousePosition.y}px)`);
          if (Math.abs(x - mousePosition.beforeX) >= this.minWidth / 2 || Math.abs(y - mousePosition.beforeY) >= this.yGap / 2) {
            mousePosition.beforeX = x;
            mousePosition.beforeY = y;
            this.drop(item, {
              x: x - mousePosition.x,
              y: y - mousePosition.y
            }, curElementIndex);
            this.Mounting();
            this.draw()
          }

        }
      }), addEvent(this.el, 'mouseup', (e) => {
        const item = childrenElm.get(curElementIndex), x = e.clientX + el.scrollLeft, y = e.clientY + el.scrollTop;
        if(isScale){
          this.drop(item, {
          x: mousePosition.x,
          y: mousePosition.y
        }, curElementIndex);
      }
        curElementIndex = null;
        isScale = false;
        this.draw();
      }),
      addEvent(this.el, 'mousedown', (e) => {
        let {value:key,dom} = getPointDatasetElement(e.path, 'data-key'),{value:scale} = getPointDatasetElement(e.path, 'data-scale')
        key = parseInt(key);
        if(scale !== -1){
          isScale = true;
          dom.style.transition = ""
          curElementIndex = parseInt(key);
          const {left,top} = getClientRects(dom)
          const x = e.clientX + el.scrollLeft, y = e.clientY + el.scrollTop;
          mousePosition = {
            beforeX: x,
            beforeY: y,
            x:left,
            y:top + el.scrollTop
          }
        }
        else if (key > -1) {
          const item = childrenElm.get(key), transform = item.style.transform?.match(/translate\((.*), (.*)\)/), { layerX, layerY } = e,x = e.clientX + el.scrollLeft, y = e.clientY + el.scrollTop;;//必定存在
          item.style.transition = ""
          curElementIndex = parseInt(key);
          mousePosition = {
            x: layerX - transform[1].match(/^[-+]?[0-9]*\.?[0-9]+/)[0],
            y: layerY - transform[2].match(/^[-+]?[0-9]*\.?[0-9]+/)[0],
            beforeX:x,
            beforeY: y,
          }
        }
        else curElementIndex = null;
      })]);

    }
    this.init(params)
    return this;
  },
  update () {
    this.create(this.el,this.config);
  },
  sortRect () {
    const arr = Array.from(ElmPositionMap)
    arr.sort((a, b) => {
      return a[1].yAxis - b[1].yAxis
    })
    this.orderArr = arr.map(item => {
      return item[0]
    })
  },
  Mounting () {
    //给除了处于拖拽之外的所有元素进行吸顶操作
    this.sortRect();
    this.orderArr.map(key => {
      const item = this.getRect(key);
      const realYaxis = this.getRealYAxis({ startIndex: item.startIndex, endIndex: item.endIndex, yAxisIndex: item.yAxis }, key)
      this.setElmPoint(key, { startIndex: item.startIndex, endIndex: item.endIndex, yAxis: realYaxis, len: item.len })
    })
  },
  parseStyle (el,needChange = true) {
    if (el && el.style) {
      let { width, height } = getClientRects(el);
      if(el.style.width === ""){
        width = this.config.multiColumn/2 * this.minWidth
      }
      else if (Math.floor(width / this.minWidth) < 2) {
        width = 2 * this.minWidth;//最小宽度
      }
      if(el.style.width === ""){
        height = this.yGap * 6
      }
      else if ( height < this.minHeight) height = 2*this.yGap;//最小高度
      width = (Math.round(width / this.minWidth) * this.minWidth - this.config.columnGap)
      height = (Math.round((height / this.yGap)) * this.yGap - this.config.columnGap)
      if(needChange){
        el.style.width = width + 'px';
        el.style.height = height + 'px';
      }
      return {
        width,
        height
      }
    }
  },
  init (params) {
    const { multiColumn = 12, draggable, classList } = params;
    this.config = {...this.config,...params};
    for (let i = 0;i < multiColumn;i++) {
      //先给需要填充的列初始化
      const arr = positionMap.get(i);
      if (!arr) {
        positionMap.set(i, [])
      }
    }

    this.multiColumn = multiColumn;
    console.info(this.el.style,this.el.offsetWidth,this.client.width)
    this.minWidth = this.client.width / multiColumn;//根据屏幕宽度获得最小宽度
    Array.from(childrenElm).forEach((obj) => {
      const index = obj[0], item = obj[1];
      const transform = item.style.transform?.match(/translate\((.*), (.*)\)/);
      if (draggable) {
        item.style['cursor'] = 'move';
        item.dataset.key = index;
      }
      if(this.config.scaleable&&!childrenScaleElm.get(index)){
        const scaleDom = document.createElement('div')
        scaleDom.dataset.scale = true;
        item.appendChild(scaleDom);
        scaleDom.style.cssText = `
          position: absolute;
          bottom: 3px;
          width:8px;
          height:8px;
          right: 3px;
          cursor: se-resize;
          border-right: 2px solid rgba(0,0,0,.4);
          border-bottom: 2px solid rgba(0,0,0,.4);
        ` 
      }
      if (classList) {
        classList.map(name => {
          item.classList.add(name)
        })
      }
      if (transform?.length === 3) {
        //自有tanslate,拖拽或者回显
        this.drop(item, { x: transform[1].match(/^[-+]?[0-9]*\.?[0-9]+/)[0], y: transform[2].match(/^[-+]?[0-9]*\.?[0-9]+/)[0] }, index)
      } else {
        //新增，dom序列号单数中心点最下方横向1/4,双数3/4
        const { width } = this.parseStyle(item);
        this.drop(item, {
          x: Math.random() * 100 % 12 * this.minWidth - width / 2, y:
          10000000000000000//todo 几乎无穷大,插入位置,原则上应该根据当前最高yAxis 运算
        }, index)
      }
    })
    this.draw();
  },
  add (key, el) {
    // childrenElm.set(key, el);
    // this.el.appendChild(el);
    // if (this.config.draggable) {
    //   el.style['cursor'] = 'move';
    //   el.dataset.key = key;
    // }
    // if (this.config.classList) {
    //   this.config.classList.map(name => {
    //     el.classList.add(name)
    //   })
    // }
    // this.drop(el, {
    //   x: parseInt(((childrenElm.size % 2 !== 0)) ? this.left : this.right), y:
    //     this.client.height +
    //     100
    // }, key)
    // this.draw();
  },
  remove (key) {
    const item = childrenElm.get(key);
    this.el.removeChild(item);
    childrenElm.remove(key);
    this.update()
  },
  draw () {
    // for(let obj of yMap)
    console.info(yMap, xMap)
    Array.from(childrenElm).forEach((obj) => {
      const index = obj[0], item = obj[1];
      const { startIndex, yAxis} = this.getRect(index)
      item.style.visibility = 'initial';
      item.style['user-select'] = 'none';
      if (!this.getRect(index) || index === curElementIndex) {
        return;
      }
      item.style.transition = "all .2s"
      item.style.transform = `translate(${startIndex * this.minWidth}px,${yAxis * this.yGap}px)`
      // item.textContent = `x:${startIndex},endIndex:${endIndex},y:${yAxis},index:${index},len:${len},width:${(endIndex - startIndex) * this.minWidth}`
    })
  },
  getRect (key) {
    return ElmPositionMap.get(key)
  },
  //两个矩形是否重叠
  doOverlap (l1, r1, l2, r2) {
    // If one rectangle is on left side of other  
    Array.prototype.forEach.call(arguments, (item) => {
      if (isNaN(item.x) || isNaN(item.y)) {
        throw `存在不是数字的类型${item.x} ${item.y}`
      }
    })
    if (l1.x === r1.x || l1.y === r1.y || l2.x === r2.x || l2.y === r2.y) throw `当前非矩形`
    return (l1.x < r2.x && l1.y < r2.y && l2.x < r1.x && l2.y < r1.y);
  },
  getRealYAxis ({ startIndex, endIndex, yAxisIndex }, index) {
    let realYaxis = 0, keyArr = [], allKey = [];
    for (let obj of ElmPositionMap) {
      const { startIndex: x1, endIndex: x2, yAxis, len } = obj[1], key = obj[0];
      if (key === index) continue;
      if (
        (startIndex > x1 && startIndex < x2)
        ||
        (endIndex > x1 && endIndex < x2)
        ||
        (x1 > startIndex && x1 < endIndex)
        ||
        (x2 > startIndex && x2 < endIndex)
        ||
        (x1 === startIndex && x2 === endIndex)
      ) {
        if (realYaxis < yAxis + len && yAxis + len <= yAxisIndex) realYaxis = yAxis + len;
      }
    }
    return yAxisIndex > realYaxis ? realYaxis : yAxisIndex;
  },
  fillRect ({ startIndex, endIndex, yAxis, key, len }) {
    console.info(key, 'fillRect')
    //todo 比较其它矩形是否相交
    const realYaxis = this.getRealYAxis({ startIndex, endIndex, yAxisIndex: yAxis }, key)
    this.setElmPoint(key, { startIndex, endIndex, yAxis: realYaxis, len })
    this.loopDrop({ startIndex, endIndex, yAxis: realYaxis, key, len })
  },
  setElmPoint (key, { startIndex, endIndex, yAxis, len }) {
    ElmPositionMap.set(key, { startIndex, endIndex, yAxis, len })
  },
  filterNode (arr) {
    return arr;
  },
  loopDrop ({ startIndex, endIndex, yAxis, key, len }) {
    // console.info(hasOrder, 'loop', key)
    let hasOver = []
    const arr = Array.from(ElmPositionMap)
    arr.map((value) => {
      let index = value[0], item = value[1];
      // if (index === 6 && key === 12) debugger
      if (index === key) {
        return;
      }

      const l1 = { x: startIndex, y: yAxis }, r1 = { x: endIndex, y: yAxis + len },
        l2 = { x: item.startIndex, y: item.yAxis }, r2 = { x: item.endIndex, y: item.yAxis + item.len };
      // console.info(l1, r1, '坐标', key);
      let isOver;
      try {
        isOver = this.doOverlap(l1, r1, l2, r2)
      } catch (error) {
        // debugger
        return
        throw `${error} `
      }
      if (isOver) {
        hasOver.push(index)
      }
    })
    hasOver = hasOver.filter(item => item !== key)
    //找到当前drop的元素对应的位置
    if (hasOver.some(i => {
      const item = this.getRect(i), diff = yAxis - item.yAxis
      return diff <= item.len / 2 && diff > 0;
    })) {
      //修正Yaxis
      const pointKey = hasOver.find(i => {
        const item = this.getRect(i), diff = yAxis - item.yAxis
        return diff <= item.len / 2 && diff > 0;
      })
      const point = this.getRect(pointKey)
      this.fillRect({ startIndex, endIndex, yAxis: point.yAxis, key, len });//交换位置
    } else {
      hasOver.filter(item => item !== key).map(i => {
        const item = this.getRect(i);
        this.fillRect({ startIndex: item.startIndex, endIndex: item.endIndex, yAxis: yAxis + len, key: i, len: item.len })
      })
    }
  },
  insertRect ({ el, startIndex, endIndex, yAxisIndex, hight, key }) {
    const yAxis = yAxisIndex;
    this.fillRect({ key, startIndex, endIndex, yAxis, len: hight })
  },
  drop (el,
     { x, y, start, yAxis }, 
     key,//childrenElm对应key
     needChange = true
    ) {
    if (!el) return;
    const { width, height } = this.parseStyle(el,needChange);
    let startIndex = start || Math.floor(x / (this.minWidth)), endIndex = startIndex + Math.round(width / this.minWidth), yAxisIndex = yAxis || Math.round(y / this.yGap), len = Math.round(height / this.yGap);//插入多少倍元高度;
    // console.info(startIndex, endIndex, '开始结束')
    if (startIndex < 0) {
      endIndex -= startIndex;
      startIndex = 0;
    }
    if (endIndex > this.multiColumn) {
      startIndex -= endIndex - this.multiColumn;
      endIndex = this.multiColumn;
    }
    if (yAxisIndex < 0) {
      yAxisIndex = 0;
    }
    this.insertRect({ el, startIndex, endIndex, yAxisIndex, hight: len, key })
    // if(hasChange) this.draw()
  }
}
export default Masonry;