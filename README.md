# masonryjs

流式拖拽排序

## 安装

```javascript
cnpm install @624144061/masonryjs
```

## 示例

```javascript
import Masonry from '@624144061/masonryjs';
Masonry.create(
this.$refs['container'].$el,//容器 docoment
        {
         columnGap:10,
         rowGap:10,
         draggable:true,//拖拽
         scaleable:true//放缩
        })
//更新
Masonry.update();//更新当前容器下的布局
```

## demo

![](image/README/1617247042015.png)

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
