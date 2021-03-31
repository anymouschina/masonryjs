<template>
    <masonry-editor style="height:100%;width:100%;"></masonry-editor>
</template>

<script>
import masonryEditor from './components/masonry.vue'

export default {
  name: 'App',
  components: {
    masonryEditor
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
html,body{
  height:100%;
  width:100%;
  padding:0;
  margin:0;
}
</style>
