<template>
<div style="height:100%;width:100%;padding:10px;overflow:hidden;">
  <button @click="add">新增</button>
  <Container style="overflow-x:hidden;" ref="container">
    <ItemWrapper v-for="item in key"   :key="item" ></ItemWrapper>
  </Container>
</div>
  
</template>

<script>
import * as components from './masonry.style';
import ItemWrapper from './item_wrapper'
import Masonry from './masonry_editor'
export default {
  components:{...components,ItemWrapper},
  name: 'masonryEditor',
  data(){
    return {
      styles:[],
      key :10,
      Masonry:null
    }
  },
  props: {
    msg: String
  },
  mounted(){
    for(let key = 0;key<this.key;key++)this.randomSize(key)
    this.$nextTick(()=>{
      this.registerMasonry(
        this.$refs['container'].$el,
        {autoSort:true,columnGap:10,rowGap:10,draggable:true,
        scaleable:true})
    })
  },
  methods:{
    randomSize(){
      const width = parseInt(Math.random()*10000%500)+100 +'px',
           height = parseInt(Math.random()*10000%500)+100 +'px',
           visibility = 'hidden'
           this.styles.push({width,height,visibility})
    },
    add(){
      // const dom = document.createElement('div');
      // dom.style.width = '50px';
      // dom.style.height = '50px';
      // this.Masonry.add(++this.key,dom)
      ++this.key;
      this.$nextTick(()=>{
        this.Masonry.update();
      })
    },
    registerMasonry(el,params){
      this.Masonry = Masonry.create(el,params);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
