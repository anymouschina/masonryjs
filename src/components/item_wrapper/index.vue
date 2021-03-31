<template>
  <Wrapper :style="{...styles}">
    <div>test</div>
  </Wrapper>
</template>

<script>
import * as components from './style'
export default {
  components:{...components},
  props:{
    styles:{
      type:Object,
      defaule:()=>{
        return {}
      }
    }
  },
}
</script>

<style>

</style>